import React, { useEffect, useState, useRef } from 'react';
import { Environment } from '@react-three/drei';
import { Environment as EnvironmentType } from '../../config';
import { getColorSpaceConfig } from '../../config/colorSpace';
import VideoEnvironment from '../VideoEnvironment';
import { ImagePreloader, ImageLoadResult } from '../../utils/imagePreloader';
import { Mesh, MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import KeypointSpheres from '../KeypointSpheres';

// Component to handle image environment ready state
const ImageEnvironmentReady: React.FC<{ onReady: () => void }> = ({ onReady }) => {
  useEffect(() => {
    // For image environments, we'll use a timeout since there's no direct loading callback
    const timer = setTimeout(() => {
      onReady();
    }, 500); // 500ms delay for image loading

    return () => clearTimeout(timer);
  }, [onReady]);

  return null;
};

interface PanoramaSceneProps {
  environment: EnvironmentType;
  isPreloading?: boolean;
  onPreloadComplete?: (results: ImageLoadResult[]) => void;
  onPreloadProgress?: (progress: { loaded: number; total: number; percentage: number; currentImage?: string }) => void;
  onEnvironmentReady?: () => void;
  keypoints?: any[];
  environmentId?: string;
  onStepChange?: (stepId: string) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
}

const PanoramaScene: React.FC<PanoramaSceneProps> = ({
  environment,
  isPreloading = false,
  onPreloadComplete,
  onPreloadProgress,
  onEnvironmentReady,
  keypoints = [],
  environmentId = '',
  onStepChange,
  onTooltipChange
}) => {
  const environmentImage = environment?.environmentImage;
  const [isPreloadComplete, setIsPreloadComplete] = useState(false);
  const colorSpaceConfig = getColorSpaceConfig();

  // Fade animation state
  const [currentEnvironment, setCurrentEnvironment] = useState(environmentImage);
  const [isEnvironmentLoading, setIsEnvironmentLoading] = useState(false);
  const [isEnvironmentReady, setIsEnvironmentReady] = useState(true);
  const fadeMeshRef = useRef<Mesh>(null);
  const fadeOpacity = useRef(0);

  // Start preloading when component mounts and isPreloading is true
  useEffect(() => {
    if (isPreloading && !isPreloadComplete) {
      console.log('🚀 PanoramaScene: Starting image preloading...');

      const preloader = new ImagePreloader(
        (progress) => {
          console.log('📊 PanoramaScene: Progress update', progress);
          if (onPreloadProgress) {
            onPreloadProgress({
              loaded: progress.loaded,
              total: progress.total,
              percentage: progress.percentage,
              currentImage: progress.currentImage
            });
          }
        },
        (results) => {
          console.log('🎉 PanoramaScene: Preload completed', results);
          setIsPreloadComplete(true);

          if (onPreloadComplete) {
            onPreloadComplete(results);
          }
        },
        (error) => {
          console.error('💥 PanoramaScene: Preload error', error);
          setIsPreloadComplete(true);
        }
      );

      preloader.preloadAllImages().catch(error => {
        console.error('💥 PanoramaScene: Preload failed', error);
        setIsPreloadComplete(true);
      });
    }
  }, [isPreloading, isPreloadComplete]);


  // Animation frame to update mesh opacity
  useFrame(() => {
    if (fadeMeshRef.current && fadeMeshRef.current.material) {
      if (environmentImage !== currentEnvironment) {
        console.log('🔄 PanoramaScene: Environment changing, starting fade animation');

        // Set loading state
        setIsEnvironmentLoading(true);
        setIsEnvironmentReady(false);
        // Start fade in sequence
        fadeOpacity.current += 0.05; // Adjust speed as needed
        if (fadeOpacity.current >= 1) {
          fadeOpacity.current = 1;

          // Change environment after fade in completes
          setCurrentEnvironment(environmentImage);

          // The fade out will be triggered by onEnvironmentReady callback
          // when the environment content is actually loaded
        }
      }
      if (isEnvironmentReady && isEnvironmentLoading) {
        console.log('✅ PanoramaScene: Environment ready, starting fade out');
        fadeOpacity.current -= 0.05; // Adjust speed as needed
        if (fadeOpacity.current <= 0) {
          fadeOpacity.current = 0;
          setIsEnvironmentLoading(false);
        }
      }
      (fadeMeshRef.current.material as MeshBasicMaterial).opacity = fadeOpacity.current;
    }
  });

  // Helper function to determine if the environment is a video
  const isVideoEnvironment = (path: string | undefined): boolean => {
    if (!path) return false;
    return path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.mov');
  };

  // Function to trigger environment ready
  const handleEnvironmentReady = () => {
    console.log('🎬 PanoramaScene: Environment content loaded and ready');
    setIsEnvironmentReady(true);
    if (onEnvironmentReady) {
      onEnvironmentReady();
    }
  };

  const getEnvironmentProps = () => {
    if (!currentEnvironment) {
      console.log('🌅 PanoramaScene: Using default sunset preset');
      return { preset: 'sunset' as const };
    }

    // const files = [
    //   `${currentEnvironment}/panorama.jpg`,
    // ];
    const files = [
      `${currentEnvironment}/cube_posx.png`, // +X
      `${currentEnvironment}/cube_negx.png`, // -X
      `${currentEnvironment}/cube_posy.png`, // +Y
      `${currentEnvironment}/cube_negy.png`, // -Y
      `${currentEnvironment}/cube_posz.png`, // +Z
      `${currentEnvironment}/cube_negz.png`, // -Z
    ];
    


    return {
      // Add VR-specific environment settings with memory optimization
      files,
      background: true,
      resolution: Math.min(colorSpaceConfig.environment.resolution, 2048), // Limit resolution to prevent memory issues
      environmentIntensity: colorSpaceConfig.environment.environmentIntensity,
      environmentRotation: colorSpaceConfig.environment.environmentRotation,
      // Memory optimization: limit resolution to prevent context loss
      // Note: Environment component handles encoding internally
    };
  };

  return (
    <group>
      {/* Check if environment is video or image */}
      {(() => {
        const isVideo = isVideoEnvironment(currentEnvironment);
        console.log('🎬 PanoramaScene: Environment check:', {
          currentEnvironment,
          isVideo,
          environmentType: isVideo ? 'VIDEO' : 'IMAGE'
        });
        return isVideo;
      })() ? (
        <VideoEnvironment
          src={currentEnvironment}
          quality="medium"
          onReady={handleEnvironmentReady}
        />
      ) : (
        <>
          {/* Image environment (default) */}
          <Environment
            {...getEnvironmentProps()}
            ground={{
              height: 1.7,
              radius: 60,
              scale: 100,
            }}
          />
          {/* For image environments, trigger ready after a short delay */}
          {isEnvironmentLoading && !isEnvironmentReady && (
            <ImageEnvironmentReady onReady={handleEnvironmentReady} />
          )}
        </>
      )}

      {/* KeypointSpheres - only show when environment is fully visible (fade opacity = 0) */}
      {fadeOpacity.current === 0 && keypoints && keypoints.length > 0 && onStepChange && onTooltipChange && (
        <KeypointSpheres
          keypoints={keypoints}
          environmentId={environmentId}
          onStepChange={onStepChange}
          onTooltipChange={onTooltipChange}
        />
      )}

      {/* Fade overlay mesh */}
      
      <mesh ref={fadeMeshRef} position={[0, 1.6, 0]} scale={10}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0} side={THREE.DoubleSide}/>
      </mesh>

      {/* Enhanced lighting for VR */}
      {/* Sunlight simulation - directional light from above */}
      <directionalLight
        position={[0, 50, 0]}
        intensity={3}
        castShadow={false}
      />

      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={0.5} />

      {/* Hemisphere light for realistic sky lighting */}
      <hemisphereLight
        args={["#87CEEB", "#8B4513", 0.6 ]}
      />

      {/* Additional VR-specific lighting */}

      <>
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          color="#ffffff"
        />
        <pointLight
          position={[0, 2, 0]}
          intensity={0.5}
          color="#ffffff"
        />
      </>
    </group>
  );
};

export default PanoramaScene;
