import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Image } from '@react-three/drei';
import * as THREE from 'three';
import { Keypoint } from '../config';

interface KeypointSpheresProps {
  keypoints: Keypoint[];
  onStepChange: (stepId: string) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
}

interface KeypointSphereProps {
  step: Keypoint;
  onClick: (stepId: string) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
}

const KeypointSphere: React.FC<KeypointSphereProps> = ({ step, onClick, onTooltipChange }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = React.useRef<THREE.Mesh>(null);

  // Change cursor when hovering
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }

    // Cleanup function to reset cursor when component unmounts
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [hovered]);

  // Handle tooltip visibility
  useEffect(() => {
    if (onTooltipChange) {
      if (hovered) {
        onTooltipChange({
          title: step.title,
          isVisible: true
        });
      } else {
        onTooltipChange(null);
      }
    }
  }, [hovered, onTooltipChange, step.title]);

  // Convert yaw/pitch/zoom to 3D position
  // Camera is at [0, 10, 0], so we need to offset from that position
  const getPosition = () => {
    const yawRad = (step.yaw * Math.PI) / 180;
    const pitchRad = (step.pitch * Math.PI) / 180;

    // Calculate position on a sphere relative to camera
    // Camera is at [0, 10, 0], so we offset from there
    const x = (step.zoom/0.3) * Math.cos(pitchRad) * Math.sin(yawRad);
    const y = 1.6 + (step.zoom/0.3) * Math.sin(pitchRad); // Offset by camera height
    const z = (step.zoom/0.3) * Math.cos(pitchRad) * Math.cos(yawRad);

    return [x, y, z];
  };

  const position = getPosition();

  // Add subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position as [number, number, number]}  >
      {/* Main sphere */}
      <Billboard>
        <Image
          url={"/Hotspot.png"}
          scale={0.5} // Larger scale for current step
          transparent
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onClick(step.targetStep)}
        />
      </Billboard>
    </group>
  );
};

const KeypointSpheres: React.FC<KeypointSpheresProps> = ({ 
  keypoints, 
  onStepChange, 
  onTooltipChange 
}) => {
  const handleStepClick = (stepId: string) => {
    console.log('Step clicked:', stepId);
    onStepChange(stepId);
  };

  return (
    <group>
      {keypoints.map((step) => (
        <KeypointSphere
          key={step.id}
          step={step}
          onClick={handleStepClick}
          onTooltipChange={onTooltipChange}
        />
      ))}
    </group>
  );
};

export default KeypointSpheres;
