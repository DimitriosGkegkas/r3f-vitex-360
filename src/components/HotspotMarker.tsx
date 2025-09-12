import React, { useState } from 'react';
import { Sphere } from '@react-three/drei';
import { useXR } from '@react-three/xr';
import { hotspotMarkerStates, MarkerState } from '../config/markerStates';

interface HotspotMarkerProps {
  scale?: number;
  rotation?: [number, number, number];
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  onClick?: () => void;
}

const HotspotMarker: React.FC<HotspotMarkerProps> = ({
  scale = 0.5,
  rotation,
  onPointerOver,
  onPointerOut,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { isPresenting } = useXR();

  // Determine current state
  const currentState: MarkerState = clicked ? 'clicked' : hovered ? 'hover' : 'normal';
  const config = hotspotMarkerStates[currentState];
  const vrScaleMultiplier = isPresenting ? 1.2 : 1.0;

  const handlePointerOver = () => {
    setHovered(true);
    onPointerOver?.();
  };

  const handlePointerOut = () => {
    setHovered(false);
    onPointerOut?.();
  };

  const handleClick = () => {
    setClicked(true);
    onClick?.();
    // Reset clicked state after a short delay
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <group rotation={rotation} scale={config.scale * vrScaleMultiplier}>
      {/* White outer sphere */}
      <Sphere
        args={[1, 32, 32]}
        scale={scale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <meshBasicMaterial 
          color={config.outerColor} 
          transparent 
          opacity={config.outerOpacity}
          // depthWrite={true}
        />
      </Sphere>
      
      {/* Blue inner sphere - positioned forward and with depth test disabled */}
      <Sphere
        args={[0.6, 32, 32]}
        scale={scale}
        position={[0, 0, -0.01]} // More forward positioning
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <meshBasicMaterial 
          color={config.innerColor} 
          transparent 
          opacity={config.innerOpacity}
          // depthWrite={false} // Disable depth writing
          // depthTest={false}  // Disable depth testing so it always renders on top
        />
      </Sphere>
    </group>
  );
};

export default HotspotMarker;
