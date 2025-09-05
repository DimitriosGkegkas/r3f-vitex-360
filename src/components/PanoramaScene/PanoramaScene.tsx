import React, { useState } from 'react';
import { Environment, Text } from '@react-three/drei';
import { Environment as EnvironmentType } from '../../config';
import VideoEnvironment from '../VideoEnvironment';

interface PanoramaSceneProps {
  environment: EnvironmentType;
  useVideo?: boolean;
  testVideo?: string;
}

const PanoramaScene: React.FC<PanoramaSceneProps> = ({ 
  environment, 
  useVideo = false, // Default to image environment
  testVideo = '/cubemap/demo/0903.mp4' 
}) => {
  const environmentImage = environment?.environmentImage;
  const [videoError, setVideoError] = useState(false);

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
      {/* 360 video environment */}
      {useVideo && !videoError ? (
        <VideoEnvironment 
          src={testVideo} 
          background={true}
          env={true}
          updateHz={10}
          onError={() => setVideoError(true)}
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
          {/* Show error message only if video was attempted and failed */}
          {useVideo && videoError && (
            <Text position={[0, 0, -10]} fontSize={1} color="red">
              Video failed to load, using fallback environment
            </Text>
          )}
        </>
      )}
    </group>
  );
};

export default PanoramaScene;
