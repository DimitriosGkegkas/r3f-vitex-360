import React from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { DoubleSide } from 'three';

export const Experience: React.FC = () => {
  return (
    <>
      <OrbitControls></OrbitControls>
      <PerspectiveCamera makeDefault position={[0, 10, 10]} fov={45} />
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial color="orange" side={DoubleSide} />
      </mesh>
    </>
  );
};
