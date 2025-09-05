import React from 'react';
import { Environment } from '@react-three/drei';
import { Environment as EnvironmentType } from '../../config';
import VideoEnvironment from '../VideoEnvironment';

interface PanoramaSceneProps {
  environment: EnvironmentType;
}

const PanoramaScene: React.FC<PanoramaSceneProps> = ({ 
  environment
}) => {
  const environmentImage = environment?.environmentImage;

  // Helper function to determine if the environment is a video
  const isVideoEnvironment = (path: string | undefined): boolean => {
    if (!path) return false;
    return path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.mov');
  };

  const getEnvironmentProps = () => {
    if (!environmentImage) {
      return { preset: 'sunset' as const };
    }
    return {
      files: [
        `${environmentImage}/px.jpg`,
        `${environmentImage}/nx.jpg`,
        `${environmentImage}/py.jpg`,
        `${environmentImage}/ny.jpg`,
        `${environmentImage}/pz.jpg`,
        `${environmentImage}/nz.jpg`,
      ],
    };
  };

  return (
    <group>
      {/* Check if environment is video or image */}
      {isVideoEnvironment(environmentImage) ? (
        <VideoEnvironment 
          src={environmentImage} 
          quality="low"
        />
      ) : (
        <>
          {/* Image environment (default) */}
          <Environment
            {...getEnvironmentProps()}
            background={true}
            resolution={1024}
            ground={{
              height: 1.7,
              radius: 60,
              scale: 100,
            }}
          />
        </>
      )}
    </group>
  );
};

export default PanoramaScene;
