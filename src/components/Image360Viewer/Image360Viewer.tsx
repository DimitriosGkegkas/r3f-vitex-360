import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { XR, XRStore } from '@react-three/xr';
// import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { getFloorById, environments, floors } from '../../config';
import { getColorSpaceConfig } from '../../config/colorSpace';
import ControllerLabels from '../ControllerLabels';
import VRInfoDisplay from '../ControllerLabels/VRInfoDisplay';
import PanoramaScene from '../PanoramaScene';
import DragLookControls from '../DragLookControls';
import FloorInfoPanel from '../FloorInfoPanel';
import VRVideoScreen from '../VRVideoScreen';
import { ImageLoadResult } from '../../utils/imagePreloader';

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
  onPrevious?: () => void;
  isPreloading?: boolean;
  isInVR?: boolean;
  onPreloadComplete?: (results: ImageLoadResult[]) => void;
  onPreloadProgress?: (progress: { loaded: number; total: number; percentage: number; currentImage?: string }) => void;
  // VR video props
  showVRVideo?: boolean;
  vrVideoData?: {
    floorIndex: number;
    floorTitle: string;
    floorNumber: string;
  } | null;
  onVRVideoEnd?: () => void;
  // Audio state
  muted?: boolean;
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
  infoCardData,
  className = '',
  onFloorChange,
  onTooltipChange,
  isInVR,
  onStepChange,
  onNext,
  onPrevious,
  isPreloading = false,
  onPreloadComplete,
  onPreloadProgress,
  // VR video props
  vrVideoData = null,
  onVRVideoEnd,
  // Audio state
  muted = false
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const [showFloorPanel, setShowFloorPanel] = useState(true);

  const floor = getFloorById(currentFloorId);
  const step = floor?.steps.find(s => s.id === currentStepId);
  const environmentId = step?.environmentId;
  const environment = environments[environmentId || ''];
  const colorSpaceConfig = getColorSpaceConfig();

  // Debug logging for VR
  useEffect(() => {
    const xrSession = xrStore.getState()?.session;
    console.log('🔍 VR Debug Info:', {
      isInVR: !!xrSession,
      currentFloorId,
      currentStepId,
      environmentId,
      environment: environment ? 'Found' : 'Missing',
      environmentImage: environment?.environmentImage,
      colorSpaceConfig: colorSpaceConfig.renderer.outputColorSpace,
      step: step ? 'Found' : 'Missing',
      floor: floor ? 'Found' : 'Missing'
    });

    // Additional VR-specific debugging
    if (xrSession) {
      console.log('🥽 VR Session Details:', {
        session: xrSession,
        inputSources: xrSession.inputSources?.length || 0,
        referenceSpace: xrSession.requestReferenceSpace ? 'Available' : 'Missing'
      });
    }
  }, [xrStore.getState()?.session, currentFloorId, currentStepId, environmentId, environment, colorSpaceConfig, step, floor]);

  useEffect(() => {
    if (xrStore.getState()?.session)
      setShowInfo(true);
  }, [currentStepId])

  const handleShowFloorPanel = () => {
    setShowFloorPanel(!showFloorPanel);
  };

  // Floor navigation functions
  const handleNextFloor = () => {
    const floorOrder = ['raw-materials', 'sorting', 'quantities', 'secrets', 'mixing', 'packaging'];
    const currentIndex = floorOrder.indexOf(currentFloorId);
    if (currentIndex < floorOrder.length - 1) {
      onFloorChange?.(floorOrder[currentIndex + 1]);
    }
  };

  const handlePreviousFloor = () => {
    const floorOrder = ['raw-materials', 'sorting', 'quantities', 'secrets', 'mixing', 'packaging'];
    const currentIndex = floorOrder.indexOf(currentFloorId);
    if (currentIndex > 0) {
      onFloorChange?.(floorOrder[currentIndex - 1]);
    }
  };

  // Force re-render when color space config changes
  const [colorSpaceKey, setColorSpaceKey] = useState(0);
  useEffect(() => {
    setColorSpaceKey(prev => prev + 1);
  }, [colorSpaceConfig]);

  // Note: Renderer settings are now handled by the RendererSettings component inside the Canvas


  // Handle show information
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };


  return (
    <>
      <Canvas
        key={colorSpaceKey}
        className={className}
        gl={{
          antialias: true,
          alpha: false,
          outputColorSpace: colorSpaceConfig.renderer.outputColorSpace,
          toneMapping: THREE[colorSpaceConfig.renderer.toneMapping as keyof typeof THREE] as THREE.ToneMapping,
          toneMappingExposure: colorSpaceConfig.renderer.toneMappingExposure,
          // Add context loss prevention settings
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        dpr={[1, 2]} // Limit device pixel ratio to prevent excessive memory usage
        performance={{ min: 0.5 }} // Maintain 50% performance target
      >
        <XR store={xrStore}>
          <PerspectiveCamera
            position={[0, 1.6, 0]}
            ref={cameraRef}
            makeDefault
            fov={85}
            near={0.1}
            far={3000}
            // Ensure camera updates properly in VR
            matrixAutoUpdate={true}
            matrixWorldAutoUpdate={true}
          />
          <DragLookControls floor={floor} stepId={currentStepId} isInVR={isInVR} />
          <PanoramaScene
            environment={environment}
            isPreloading={isPreloading}
            onPreloadComplete={onPreloadComplete}
            onPreloadProgress={onPreloadProgress}
            onEnvironmentReady={() => {
              console.log('🎬 Image360Viewer: Environment ready callback received');
            }}
            keypoints={environment?.keypoints || []}
            environmentId={environmentId || ''}
            onStepChange={onStepChange}
            onTooltipChange={onTooltipChange}
          />
          <ControllerLabels
            handedness="right"
            onNextStep={onNext}
            onPreviousStep={onPrevious}
            onShowInfo={handleShowInfo}
            isInfoVisible={showInfo}
          />
          <ControllerLabels
            handedness="left"
            onNextStep={onNext}
            onPreviousStep={onPrevious}
            onShowInfo={handleShowFloorPanel}
            isInfoVisible={showFloorPanel}
            onNextFloor={handleNextFloor}
            onPreviousFloor={handlePreviousFloor}
          />

          {/* VR Information Display */}
          {step && (
            <VRInfoDisplay
              stepData={{
                id: step.id,
                title: step.title,
                description: step.description,
                stepName: step.stepName,
                floor: infoCardData.floor,
                currentStep: (floor?.steps.findIndex(s => s.id === currentStepId) ?? -1) + 1,
                totalSteps: floor?.steps.length
              }}
              position={[-0.0, -0., -0.17]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.5, 0.5, 0.005]}
              isVisible={showInfo}
              handedness="right"
            />
          )}

          {/* Floor Info Panel for Left Controller */}
          <FloorInfoPanel
            currentFloorId={currentFloorId}
            experienceStates={floors}
            stateOrder={['raw-materials', 'sorting', 'quantities', 'secrets', 'mixing', 'packaging']}
            isVisible={showFloorPanel}
            handedness="left"
            onFloorChange={onFloorChange}
          />

          {/* VR Video Screen - only shows when in VR and video is active */}
          {vrVideoData && isInVR && (
            <VRVideoScreen
              floorIndex={vrVideoData.floorIndex}
              onVideoEnd={onVRVideoEnd || (() => { })}
              isVisible={true}
              muted={muted}
              distance={3}
              width={4}
              height={2.25}
              curve={0.}
            />
          )}

        </XR>

      </Canvas >
    </>
  );
};

export default Image360Viewer;


