import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Html, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { Environment as EnvironmentType, environments, Floor, getFloorById } from '../../config';
import KeypointSpheres from '../KeypointSpheres';
import { useXR, XR, XRStore } from '@react-three/xr';
import ControllerLabels from '../ControllerLabels';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

interface Image360ViewerProps {
  currentFloorId: string;
  currentStepId: string;
  xrStore: XRStore;
  infoCardData: InfoCardData;
  className?: string;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
  onStepChange: (stepId: string) => void;
}

// Extract InfoCard data interface
interface InfoCardData {
  title: string;
  description: string;
  step?: string;
  floor?: string;
  currentStep?: number;
  totalSteps?: number;
}

// InfoCard Billboard component that follows the camera
const InfoCardBillboard: React.FC<{ infoCardData: InfoCardData; xrStore: XRStore }> = ({ infoCardData, xrStore }) => {
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

// Scene with the environment
const PanoramaScene: React.FC<{ environment: EnvironmentType }> = ({ environment }) => {
  const environmentImage = environment?.environmentImage;

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
    </group>
  );
};

const DragLookControls: React.FC<{ floor?: Floor; stepId?: string }> = ({ floor, stepId }) => {
  const { camera, gl } = useThree()
  const [isDragging, setIsDragging] = useState(false)
  const prevMouse = useRef({ x: 0, y: 0 })

  // store yaw/pitch separately
  const yaw = useRef(0)
  const pitch = useRef(0)

  // target yaw/pitch when state changes
  const targetYaw = useRef(0)
  const targetPitch = useRef(0)

  const onPointerDown = useCallback((e: MouseEvent) => {
    setIsDragging(true)
    prevMouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onPointerUp = useCallback(() => setIsDragging(false), [])

  const onPointerMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - prevMouse.current.x
      const deltaY = e.clientY - prevMouse.current.y
      prevMouse.current = { x: e.clientX, y: e.clientY }

      const sensitivity = 0.002

      targetYaw.current -= deltaX * sensitivity // left/right
      targetPitch.current -= deltaY * sensitivity // up/down

      // clamp target pitch
      const limit = Math.PI / 2 - 0.1
      targetPitch.current = Math.max(-limit, Math.min(limit, targetPitch.current))
    },
    [isDragging]
  )

  const environmentId = useMemo(() => {
    if (floor && stepId) {
      const step = floor.steps.find(s => s.id === stepId);
      return step?.environmentId;
    }
    return null;
  }, [floor, stepId])

  // 🔥 When floor or step changes, set new target pitch and yaw
  useEffect(() => {
    if (environmentId) {
      const environment = environments[environmentId || ''];
      if (environment.cameraAngle !== undefined) {
        targetPitch.current = (environment.cameraAngle * Math.PI) / 180;
      }
      if (environment.cameraYaw !== undefined) {
        targetYaw.current = (environment.cameraYaw * Math.PI) / 180;
      }

    }
  }, [environmentId])

  // 🎥 Apply smooth rotation every frame
  useFrame(() => {
    // Lerp yaw and pitch towards targets if not dragging

    yaw.current = THREE.MathUtils.lerp(yaw.current, targetYaw.current, 0.05)
    pitch.current = THREE.MathUtils.lerp(pitch.current, targetPitch.current, 0.05)


    // build quaternion from yaw/pitch
    const q = new THREE.Quaternion()
    q.setFromEuler(new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ'))
    camera.quaternion.copy(q)
  })

  // Mouse listeners
  useEffect(() => {
    const dom = gl.domElement
    dom.addEventListener('mousedown', onPointerDown)
    dom.addEventListener('mouseup', onPointerUp)
    dom.addEventListener('mouseleave', onPointerUp)
    dom.addEventListener('mousemove', onPointerMove)
    return () => {
      dom.removeEventListener('mousedown', onPointerDown)
      dom.removeEventListener('mouseup', onPointerUp)
      dom.removeEventListener('mouseleave', onPointerUp)
      dom.removeEventListener('mousemove', onPointerMove)
    }
  }, [gl, onPointerDown, onPointerUp, onPointerMove])

  return null
}


const Image360Viewer: React.FC<Image360ViewerProps> = ({
  currentFloorId,
  currentStepId,
  xrStore,
  infoCardData,
  className = '',
  onTooltipChange,
  onStepChange,
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const floor = getFloorById(currentFloorId);
  const step = floor?.steps.find(s => s.id === currentStepId);
  const environmentId = step?.environmentId;
  const environment = environments[environmentId || ''];



  return (
    <>
      <Canvas className={className} gl={{ antialias: true, alpha: false }}>
        <EffectComposer>
          {/* Bloom makes emissive/glow pop */}
          {/* <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} /> */}
          {/* <Vignette eskil offset={0.2} darkness={0.6} /> */}
        </EffectComposer>
        <XR store={xrStore}>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 1.6, 0]}
            fov={85}
            scale={[1, 1, -1]}
            // Ensure camera updates properly in VR
            matrixAutoUpdate={true}
            matrixWorldAutoUpdate={true}
          />
          <ambientLight intensity={5} />
          <DragLookControls floor={floor} stepId={currentStepId} />
          <PanoramaScene environment={environment} />
          {floor && <KeypointSpheres
            keypoints={environment?.keypoints || []}
            environmentId={environmentId}
            steps={floor.steps}
            onStepChange={onStepChange}
            onTooltipChange={onTooltipChange}
          />}
          <ControllerLabels />
          {/* <InfoCardBillboard infoCardData={infoCardData} xrStore={xrStore} /> */}
        </XR>
      </Canvas>
    </>
  );
};

export default Image360Viewer;

