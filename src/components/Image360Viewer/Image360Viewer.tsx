import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Environment as EnvironmentType, environments, Floor, getFloorById } from '../../config';
import KeypointSpheres from '../KeypointSpheres';

interface Image360ViewerProps {
  currentFloorId: string;
  currentStepId: string;
  className?: string;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
  onStepChange: (stepId: string) => void;
}

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
        resolution={512}
        ground={{
          height: 15,
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

  // 🔥 When floor or step changes, set new target pitch and yaw
  useEffect(() => {
    if (floor && stepId) {
      const step = floor.steps.find(s => s.id === stepId);
      if (step) {
        const environmentId = step?.environmentId;
        const environment = environments[environmentId || ''];
        if (environment.cameraAngle !== undefined) {
          targetPitch.current = (environment.cameraAngle * Math.PI) / 180;
        }
        if (environment.cameraYaw !== undefined) {
          targetYaw.current = (environment.cameraYaw * Math.PI) / 180;
        }
      }
    } 
  }, [floor, stepId])

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
    <Canvas className={className} gl={{ antialias: true, alpha: false }}>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 10, 0]} fov={45} />
      <DragLookControls floor={floor} stepId={currentStepId} />
      <PanoramaScene environment={environment} />
      {floor && <KeypointSpheres 
        keypoints={environment?.keypoints || []}
        onStepChange={onStepChange}
        onTooltipChange={onTooltipChange} 
      />}
    </Canvas>
  );
};

export default Image360Viewer;

