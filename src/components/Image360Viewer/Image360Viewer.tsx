import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { XR, XRStore } from '@react-three/xr';
import * as THREE from 'three';
import { getFloorById, environments } from '../../config';
import KeypointSpheres from '../KeypointSpheres';
import ControllerLabels from '../ControllerLabels';
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
  useVideo = false,
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
          <PanoramaScene environment={environment} useVideo={useVideo} />
          {floor && <KeypointSpheres
            keypoints={environment?.keypoints || []}
            environmentId={environmentId || ''}
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

