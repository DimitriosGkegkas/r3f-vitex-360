import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Sparkles, Billboard, Image } from '@react-three/drei';
import * as THREE from 'three';
import { ExperienceState, Keypoint } from '../config/experienceStates';

interface KeypointSpheresProps {
  experienceState: ExperienceState;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
}

interface KeypointSphereProps {
  keypoint: Keypoint;
  onClick: (keypoint: Keypoint) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
}

const KeypointSphere: React.FC<KeypointSphereProps> = ({ keypoint, onClick, onTooltipChange }) => {
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
          title: keypoint.title,
          isVisible: true
        });
      } else {
        onTooltipChange(null);
      }
    }
  }, [hovered, onTooltipChange, keypoint.title]);

  // Convert yaw/pitch/zoom to 3D position
  // Camera is at [0, 10, 0], so we need to offset from that position
  const getPosition = () => {
    const yawRad = (keypoint.yaw * Math.PI) / 180;
    const pitchRad = (keypoint.pitch * Math.PI) / 180;

    // Calculate position on a sphere relative to camera
    // Camera is at [0, 10, 0], so we offset from there
    const x = (keypoint.zoom/0.3) * Math.cos(pitchRad) * Math.sin(yawRad);
    const y = 10 + (keypoint.zoom/0.3) * Math.sin(pitchRad); // Offset by camera height
    const z = (keypoint.zoom/0.3) * Math.cos(pitchRad) * Math.cos(yawRad);

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
          scale={0.5}
          transparent
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onClick(keypoint)}
        />
      </Billboard>
    </group>
  );
};

const KeypointSpheres: React.FC<KeypointSpheresProps> = ({ experienceState, onTooltipChange }) => {
  const handleKeypointClick = (keypoint: Keypoint) => {
    console.log('Keypoint clicked:', keypoint);
    // TODO: Implement keypoint interaction (show detailed info, trigger animations, etc.)
  };

  return (
    <group>
      {experienceState.keypoints.map((keypoint) => (
        <KeypointSphere
          key={keypoint.id}
          keypoint={keypoint}
          onClick={handleKeypointClick}
          onTooltipChange={onTooltipChange}
        />
      ))}
    </group>
  );
};

export default KeypointSpheres;
