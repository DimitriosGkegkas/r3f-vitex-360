import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useXR, XR, XRStore } from '@react-three/xr';
import * as THREE from 'three';
import { getFloorById, environments } from '../../config';
import { createStepChangeHandler } from '../../utils/stepNavigation';
import KeypointSpheres from '../KeypointSpheres';
import ControllerLabels from '../ControllerLabels';
import VRInfoDisplay from '../ControllerLabels/VRInfoDisplay';
import PanoramaScene from '../PanoramaScene';
import DragLookControls from '../DragLookControls';

interface Image360ViewerProps {
  currentFloorId: string;
  currentStepId: string;
  xrStore: XRStore;
  infoCardData: InfoCardData;
  className?: string;
  useVideo?: boolean;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
  onStepChange: (stepId: string) => void;
  onFloorChange?: (floorId: string) => void;
  onNext?: () => void;
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


const Image360Viewer: React.FC<Image360ViewerProps> = ({
  currentFloorId,
  currentStepId,
  xrStore,
  className = '',
  onTooltipChange,
  onStepChange,
  onFloorChange,
  onNext
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const floor = getFloorById(currentFloorId);
  const step = floor?.steps.find(s => s.id === currentStepId);
  const environmentId = step?.environmentId;
  const environment = environments[environmentId || ''];

  useEffect(() => {
    if (xrStore.getState()?.session)
      setShowInfo(true);
  }, [currentStepId])

  // Handle show information
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };


  return (
    <>
      <Canvas className={className} gl={{ antialias: true, alpha: false }}>
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
          {/* Sunlight simulation - directional light from above */}
          <directionalLight
            position={[0, 50, 0]}
            intensity={2}
          />

          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={0.3} />

          {/* Hemisphere light for realistic sky lighting */}
          <hemisphereLight
            args={["#87CEEB", "#8B4513", 0.4]}
          />

          <DragLookControls floor={floor} stepId={currentStepId} />
          <PanoramaScene environment={environment} />
          {floor && <KeypointSpheres
            keypoints={environment?.keypoints || []}
            environmentId={environmentId || ''}
            onStepChange={onStepChange}
            onTooltipChange={onTooltipChange}
          />}
          <ControllerLabels
            handedness="right"
            onNextStep={onNext}
            onShowInfo={handleShowInfo}
            isInfoVisible={showInfo}
          />
          <ControllerLabels
            handedness="left"
            onNextStep={onNext}
            onShowInfo={handleShowInfo}
            isInfoVisible={showInfo}
          />

          {/* VR Information Display */}
          {step && (
            <VRInfoDisplay
              stepData={{
                id: step.id,
                title: step.title,
                description: step.description,
                stepName: step.stepName,
                floor: floor?.title,
                currentStep: (floor?.steps.findIndex(s => s.id === currentStepId) ?? -1) + 1,
                totalSteps: floor?.steps.length
              }}
              isVisible={showInfo}
            />
          )}
        </XR>
      </Canvas>
    </>
  );
};

export default Image360Viewer;

