import React, { useEffect, useState, useRef } from 'react';
import { Environment } from '@react-three/drei';
import { Environment as EnvironmentType } from '../../config';
import { getColorSpaceConfig } from '../../config/colorSpace';
import VideoEnvironment from '../VideoEnvironment';
import { ImagePreloader, ImageLoadResult } from '../../utils/imagePreloader';
import { DoubleSide, Mesh, MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

interface PanoramaSceneProps {
  environment: EnvironmentType;
  isPreloading?: boolean;
  onPreloadComplete?: (results: ImageLoadResult[]) => void;
  onPreloadProgress?: (progress: { loaded: number; total: number; percentage: number; currentImage?: string }) => void;
}

const PanoramaScene: React.FC<PanoramaSceneProps> = ({ 
  environment,
  isPreloading = false,
  onPreloadComplete,
  onPreloadProgress
}) => {
  const environmentImage = environment?.environmentImage;
  const [isPreloadComplete, setIsPreloadComplete] = useState(false);
  const colorSpaceConfig = getColorSpaceConfig();
  
  // Fade animation state
  const [currentEnvironment, setCurrentEnvironment] = useState(environmentImage);
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
            
            // Start fade out after a brief delay
            setTimeout(() => {
              const fadeOutInterval = setInterval(() => {
                fadeOpacity.current -= 0.05; // Adjust speed as needed
                if (fadeOpacity.current <= 0) {
                  fadeOpacity.current = 0;
                  clearInterval(fadeOutInterval);
                }
              }, 16); // ~60fps
            }, 100); // Brief delay before fade out
          }
        }, 16); // ~60fps
      };
      
      fadeIn();
    }
  }, [environmentImage, currentEnvironment]);

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
    
    return { files };
  };

  return (
    <group>
      {/* Check if environment is video or image */}
      {isVideoEnvironment(currentEnvironment) ? (
        <VideoEnvironment 
          src={currentEnvironment} 
          quality="low"
        />
      ) : (
        <>
          {/* Image environment (default) */}
          <Environment
            {...getEnvironmentProps()}
            background={true}
            resolution={colorSpaceConfig.environment.resolution}
            ground={{
              height: 1.7,
              radius: 60,
              scale: 100,
            }}
            environmentIntensity={colorSpaceConfig.environment.environmentIntensity}
            environmentRotation={colorSpaceConfig.environment.environmentRotation}
          />
        </>
      )}

      {/* Fade overlay mesh */}
      <mesh ref={fadeMeshRef} position={[0, 1.6, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0} side={DoubleSide} depthWrite={false}/>
      </mesh>
    </group>
  );
};

export default PanoramaScene;
