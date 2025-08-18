import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { getStateById } from '../../config/experienceStates';
import { useExperienceState } from '../../hooks/useExperienceState';

/**
 * Image360Viewer Component
 * 
 * This component now accepts a stateId instead of an imageUrl.
 * The environment is automatically selected based on the experience state's
 * environmentImage property, which should point to a folder containing:
 * - px.jpg (positive X - right)
 * - nx.jpg (negative X - left)
 * - py.jpg (positive Y - top)
 * - ny.jpg (negative Y - bottom)
 * - pz.jpg (positive Z - front)
 * - nz.jpg (negative Z - back)
 * 
 * Usage:
 * <Image360Viewer stateId="raw-materials" className="w-full h-full" />
 */

interface Image360ViewerProps {
  stateId: string;
  className?: string;
}

const PanoramaScene: React.FC<{ stateId: string }> = ({ stateId }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  // Get the experience state to access environmentImage
  const experienceState = getStateById(stateId);
  const environmentImage = experienceState?.environmentImage;

  // Set up camera - fixed positioning
  React.useEffect(() => {
    camera.position.set(0, 2, 0);
    camera.lookAt(0, 2, -1);
    camera.updateProjectionMatrix();
  }, [camera]);

  // Handle mouse events for panning
  const handlePointerDown = useCallback((event: any) => {
    setIsDragging(true);
    setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    event.preventDefault();

    if (event.target.setPointerCapture && event.pointerId !== undefined) {
      event.target.setPointerCapture(event.pointerId);
    }
  }, []);

  const handlePointerUp = useCallback((event: any) => {
    setIsDragging(false);

    if (event.target.releasePointerCapture && event.pointerId !== undefined) {
      event.target.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handlePointerMove = useCallback((event: any) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    // Fixed rotation logic - rotate the camera around the sphere
    const rotationSpeed = 0.01;

    // Rotate around Y axis (horizontal)
    camera.rotation.y -= deltaX * rotationSpeed;

    // Rotate around X axis (vertical) with clamping
    const newRotationX = camera.rotation.x - deltaY * rotationSpeed;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, newRotationX));

    setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    event.preventDefault();
  }, [isDragging, previousMousePosition.x, previousMousePosition.y, camera]);

  // Zoom with FOV
  const handleWheel = useCallback((event: any) => {
    event.preventDefault();

    // Only handle FOV for perspective cameras
    if (camera instanceof THREE.PerspectiveCamera) {
      const zoomSpeed = 0.05;
      const newFov = camera.fov + event.deltaY * zoomSpeed;

      camera.fov = Math.max(30, Math.min(120, newFov));
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  // Determine environment props based on the experience state's environmentImage
  const getEnvironmentProps = () => {
    if (!environmentImage) {
      // Fallback to a default environment
      return { preset: 'sunset' as const };
    }

    // For cubemap arrays (px, nx, py, ny, pz, nz)
    // The environmentImage property contains the base folder path
    return {
      files: [
        `${environmentImage}/px.jpg`, // positive X (right)
        `${environmentImage}/nx.jpg`, // negative X (left) 
        `${environmentImage}/py.jpg`, // positive Y (top)
        `${environmentImage}/ny.jpg`, // negative Y (bottom)
        `${environmentImage}/pz.jpg`, // positive Z (front)
        `${environmentImage}/nz.jpg`  // negative Z (back)
      ]
    };
  };

  const envProps = getEnvironmentProps();

  return (
    <group>
      {/* Environment setup using drei */}
      <Environment
        {...envProps}
        background={true}
        resolution={512}
        ground={{
          height: 15, // Height of the camera that was used to create the env map (Default: 15)
          radius: 60, // Radius of the world. (Default 60)
          scale: 100, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
        }}

      />

      {/* Invisible sphere to capture pointer events */}
      <mesh
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onWheel={handleWheel}
      >
        <sphereGeometry args={[1000, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

const Image360Viewer: React.FC<Image360ViewerProps> = ({
  stateId,
  className = ''
}) => {
  return (
    <Canvas
      camera={{ position: [0, 11, 0], fov: 45 }}
      className={`image-360-viewer ${className}`}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#000' }}
    >
      <PanoramaScene stateId={stateId} />
      <OrbitControls
        position={[0, 12, 1]}
        maxZoom={0.1}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={-0.5}
        target={[0, 10, 0]}

      // minDistance={10}
      />
    </Canvas>
  );
};

export default Image360Viewer;
