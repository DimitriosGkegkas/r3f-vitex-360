import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { useXR, XRStore } from '@react-three/xr';
import * as THREE from 'three';

interface InfoCardData {
  title: string;
  description: string;
  step?: string;
  floor?: string;
  currentStep?: number;
  totalSteps?: number;
}

interface InfoCardBillboardProps {
  infoCardData: InfoCardData;
  xrStore: XRStore;
}

const InfoCardBillboard: React.FC<InfoCardBillboardProps> = ({ infoCardData, xrStore }) => {
  const { camera } = useThree();
  const billboardRef = useRef<THREE.Group>(null);

  const { session } = useXR();

  // Smooth following state
  const currentPosition = useRef(new THREE.Vector3());
  const isMoving = useRef(false);
  const lastTargetPosition = useRef(new THREE.Vector3());

  // Distance from camera - adjust for VR vs desktop
  const getDistance = () => {
    return 5; // Closer in VR for better readability
  };

  // Fixed pitch offset (slightly below eye level)
  const pitchOffset = 0.;

  // Threshold for movement (only start moving when difference is significant)
  const MOVEMENT_THRESHOLD = 3;
  // Smoothing factor for movement
  const SMOOTHING_FACTOR = 0.001;

  useFrame(() => {
    if (billboardRef.current) {
      let targetPosition = new THREE.Vector3();
      let targetDirection = new THREE.Vector3();

      // Check if we're in VR mode
      targetPosition.copy(camera.position);

      if (session) {
        // In VR mode, try different approaches to get the camera direction
        // Method 1: Try using the camera's matrix
        const cameraMatrix = camera.matrixWorld;

        // Extract forward direction from matrix (negative Z axis)
        targetDirection.set(-cameraMatrix.elements[8], 0, -cameraMatrix.elements[10]);
        targetDirection.normalize();

        // Alternative: Try using getWorldDirection as fallback
        const fallbackDirection = new THREE.Vector3();
        camera.getWorldDirection(fallbackDirection);

        // Use the matrix-based direction if it's valid, otherwise fallback
        // if (targetDirection.length() > 0.1) {
        // } else {
        //   targetDirection.copy(fallbackDirection);
        // }
      } else {
        // In desktop mode, use getWorldDirection
        camera.getWorldDirection(targetDirection);
      }

      // Calculate billboard position
      const billboardPosition = new THREE.Vector3();
      billboardPosition.copy(targetPosition);

      // Clone the direction vector to avoid modifying the original
      const cameraDirection = targetDirection.clone();
      const currentDistance = getDistance();
      billboardPosition.add(cameraDirection.multiplyScalar(currentDistance));

      // Apply pitch offset
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3();
      right.crossVectors(cameraDirection, up).normalize();
      const pitchVector = new THREE.Vector3();
      pitchVector.crossVectors(right, cameraDirection).normalize();
      billboardPosition.add(pitchVector.multiplyScalar(Math.sin(pitchOffset) * currentDistance));

      // Check if we need to start moving (significant difference from current position)
      const distanceToTarget = currentPosition.current.distanceTo(billboardPosition);

      // Start movement when distance exceeds threshold
      if (distanceToTarget > MOVEMENT_THRESHOLD && !isMoving.current) {
        isMoving.current = true;
      }

      // Stop movement when distance goes below threshold
      if (distanceToTarget <= MOVEMENT_THRESHOLD && isMoving.current) {
        isMoving.current = false;
      }

      // Smooth movement towards target position only when moving
      if (isMoving.current) {
        // Lerp towards target position
        currentPosition.current.lerp(billboardPosition, SMOOTHING_FACTOR);
      } else {

      }

      // Apply the position
      if (isMoving.current) {
        billboardRef.current.position.copy(currentPosition.current);
      } else {

      }
      billboardRef.current.lookAt(targetPosition);

      // Store last target for next frame
      lastTargetPosition.current.copy(billboardPosition);
    }
  });

  return (
    <group ref={billboardRef}>
      {/* Background plane */}
      <RoundedBox
        position={[0, 0, -0.1]}
        args={[2, 1.5, 0.1]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        steps={1} // Extrusion steps. Default is 1
        smoothness={4} // The number of curve segments. Default is 4
        bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      >
        <meshBasicMaterial
          color={xrStore.isPresenting ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.9)"}
          transparent
          opacity={xrStore.isPresenting ? 0.95 : 0.9}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.12}
        fontWeight={600}
        color="#1A1A1A"
        maxWidth={1.8}
        textAlign="left"
        anchorX="center"
        anchorY="middle"
      >
        {infoCardData.title}
      </Text>

      {/* Description */}
      <Text
        position={[0, 0., 0]}
        fontSize={0.08}
        color="#1A1A1A"
        maxWidth={1.8}
        textAlign="left"
        anchorX="center"
        anchorY="middle"
      >
        {infoCardData.description}
      </Text>

      {/* Step info */}
      {infoCardData.step && (
        <Text
          position={[-.6, 0.65, 0]}
          fontSize={xrStore.isPresenting ? 0.1 : 0.06}
          color="#4D4D4D"
          maxWidth={1.8}
          textAlign="left"
          anchorX="center"
          anchorY="middle"
        >
          Βήμα: {infoCardData.step}
        </Text>
      )}

      {/* Floor info */}
      {infoCardData.floor && (
        <Text
          position={[0.6, 0.65, 0]}
          fontSize={xrStore.isPresenting ? 0.1 : 0.06}
          color="#4D4D4D"
          maxWidth={1.8}
          textAlign="left"
          anchorX="center"
          anchorY="middle"
        >
          Όροφος: {infoCardData.floor}
        </Text>
      )}

      {/* Step counter */}
      {infoCardData.currentStep && infoCardData.totalSteps && (
        <Text
          position={[0, -0.65, 0]}
          fontSize={xrStore.isPresenting ? 0.1 : 0.06}
          color="#4D4D4D"
          maxWidth={1.8}
          textAlign="left"
          anchorX="center"
          anchorY="middle"
        >
          {infoCardData.currentStep} από {infoCardData.totalSteps}
        </Text>
      )}
    </group>
  );
};

export default InfoCardBillboard;
