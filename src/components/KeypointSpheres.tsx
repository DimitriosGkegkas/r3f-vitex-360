import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { allSteps, Keypoint } from '../config';
import TeleportMarker from './TeleportMarker';
import HotspotMarker from './HotspotMarker';

interface KeypointSpheresProps {
  keypoints: Keypoint[];
  environmentId: string;
  onStepChange: (stepId: string) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
}

interface KeypointSphereProps {
  step: Keypoint;
  teleporting: boolean;
  onClick: (stepId: string) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
}

const KeypointSphere: React.FC<KeypointSphereProps> = ({ step, teleporting, onClick, onTooltipChange }) => {
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
    const yawRad = - (step.yaw * Math.PI) / 180;
    const pitchRad = (step.pitch * Math.PI) / 180;

    // Calculate position on a sphere relative to camera
    // Camera is at [0, 10, 0], so we offset from there
    const x = (step.zoom / 0.3) * Math.cos(pitchRad) * Math.sin(yawRad);
    const y = 1.6 + (step.zoom / 0.3) * Math.sin(pitchRad); // Offset by camera height
    const z = (step.zoom / 0.3) * Math.cos(pitchRad) * Math.cos(yawRad);

    return [x, y, z];
  };

  const position = getPosition();

  // Calculate rotation to face (0,0,0) - the camera position
  const getRotation = () => {
    const x = position[0];
    const y = position[1];
    const z = position[2];

    // Calculate the angle to face the origin
    const yaw = Math.atan2(x, z);
    const pitch = Math.atan2(-y, Math.sqrt(x * x + z * z));

    return [pitch, yaw, 0];
  };

  const rotation = getRotation();

  // Add subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position as [number, number, number]}  >
      {/* Main sphere */}
      {teleporting ? <TeleportMarker onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(step.targetStep)} />
        :
        <HotspotMarker
          scale={0.5}
          rotation={rotation as [number, number, number]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onClick(step.targetStep)}
        />
      }

    </group>
  );
};


const KeypointSpheres: React.FC<KeypointSpheresProps> = ({
  keypoints,
  environmentId,
  onStepChange,
  onTooltipChange,
}) => {
  const handleStepClick = (stepId: string) => {
    console.log('Step clicked:', stepId);
    onStepChange(stepId);
  };

  return (
    <group>
      {keypoints.map((keypoint) => (
        <KeypointSphere
          key={keypoint.id}
          step={keypoint}
          teleporting={allSteps.find(s => s.id === keypoint.targetStep)?.environmentId !== environmentId}
          onClick={handleStepClick}
          onTooltipChange={onTooltipChange}
        />
      ))}
    </group>
  );
};

export default KeypointSpheres;
