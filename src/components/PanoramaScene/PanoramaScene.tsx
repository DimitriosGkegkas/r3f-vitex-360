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

  // Handle environment changes with fade animation
  useEffect(() => {
    if (environmentImage !== currentEnvironment) {
      console.log('🔄 PanoramaScene: Environment changing, starting fade animation');
      
      // Set loading state
      setIsEnvironmentLoading(true);
      setIsEnvironmentReady(false);
      
      // Start fade in sequence
      const fadeIn = () => {
        fadeOpacity.current = 0;
        const fadeInInterval = setInterval(() => {
          fadeOpacity.current += 0.05; // Adjust speed as needed
          if (fadeOpacity.current >= 1) {
            fadeOpacity.current = 1;
            clearInterval(fadeInInterval);
            
            // Change environment after fade in completes
            setCurrentEnvironment(environmentImage);
            
            // The fade out will be triggered by onEnvironmentReady callback
            // when the environment content is actually loaded
          }
        }, 16); // ~60fps
      };
      
      fadeIn();
    }
  }, [environmentImage, currentEnvironment]);

  // Handle environment ready callback
  useEffect(() => {
    if (isEnvironmentReady && isEnvironmentLoading) {
      console.log('✅ PanoramaScene: Environment ready, starting fade out');
      
      // Start fade out after environment is ready
      const fadeOutInterval = setInterval(() => {
        fadeOpacity.current -= 0.05; // Adjust speed as needed
        if (fadeOpacity.current <= 0) {
          fadeOpacity.current = 0;
          clearInterval(fadeOutInterval);
          setIsEnvironmentLoading(false);
        }
      }, 16); // ~60fps
    }
  }, [isEnvironmentReady, isEnvironmentLoading]);

  // Animation frame to update mesh opacity
  useFrame(() => {
    if (fadeMeshRef.current && fadeMeshRef.current.material) {
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
    
    const files = [
      `${currentEnvironment}/px.jpg`,
      `${currentEnvironment}/nx.jpg`,
      `${currentEnvironment}/py.jpg`,
      `${currentEnvironment}/ny.jpg`,
      `${currentEnvironment}/pz.jpg`,
      `${currentEnvironment}/nz.jpg`,
    ];
    
    console.log('🖼️ PanoramaScene: Loading environment images:', files);
    console.log('📁 Environment base path:', currentEnvironment);
    console.log('🎨 Color space config:', colorSpaceConfig.environment);
    
    return { 
      files,
      // Add VR-specific environment settings with memory optimization
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
      <mesh ref={fadeMeshRef} position={[0, 1.6, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0} side={THREE.DoubleSide} depthTest={false} depthWrite/>
      </mesh>
    </group>
  );
};

export default PanoramaScene;
