import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { XR, XRStore } from '@react-three/xr';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { getFloorById, environments } from '../../config';
import { getColorSpaceConfig } from '../../config/colorSpace';
import KeypointSpheres from '../KeypointSpheres';
import ControllerLabels from '../ControllerLabels';
import VRInfoDisplay from '../ControllerLabels/VRInfoDisplay';
import PanoramaScene from '../PanoramaScene';
import DragLookControls from '../DragLookControls';
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
  isPreloading?: boolean;
  onPreloadComplete?: (results: ImageLoadResult[]) => void;
  onPreloadProgress?: (progress: { loaded: number; total: number; percentage: number; currentImage?: string }) => void;
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
  onNext,
  isPreloading = false,
  onPreloadComplete,
  onPreloadProgress
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const floor = getFloorById(currentFloorId);
  const step = floor?.steps.find(s => s.id === currentStepId);
  const environmentId = step?.environmentId;
  const environment = environments[environmentId || ''];
  const colorSpaceConfig = getColorSpaceConfig();

  useEffect(() => {
    if (xrStore.getState()?.session)
      setShowInfo(true);
  }, [currentStepId])

  // Set renderer properties after canvas creation
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const renderer = (canvas as any).__r3f?.gl;
      if (renderer) {
        renderer.useLegacyLights = !colorSpaceConfig.renderer.physicallyCorrectLights;
      }
    }
  }, [colorSpaceConfig.renderer.physicallyCorrectLights]);

  // Handle show information
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };


  return (
    <>
      <Canvas 
        className={className} 
        gl={{ 
          antialias: true, 
          alpha: false,
          outputColorSpace: colorSpaceConfig.renderer.outputColorSpace,
          toneMapping: colorSpaceConfig.renderer.toneMapping as any,
          toneMappingExposure: colorSpaceConfig.renderer.toneMappingExposure
        }}
      >
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
          <PanoramaScene 
            environment={environment} 
            isPreloading={isPreloading}
            onPreloadComplete={onPreloadComplete}
            onPreloadProgress={onPreloadProgress}
          />
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
        
        {/* Post-processing effects for enhanced realism */}
        <EffectComposer>
          <Bloom
            intensity={colorSpaceConfig.postProcessing.bloom.intensity}
            luminanceThreshold={colorSpaceConfig.postProcessing.bloom.luminanceThreshold}
            luminanceSmoothing={colorSpaceConfig.postProcessing.bloom.luminanceSmoothing}
            mipmapBlur={colorSpaceConfig.postProcessing.bloom.mipmapBlur}
          />
          <ChromaticAberration
            offset={new THREE.Vector2(...colorSpaceConfig.postProcessing.chromaticAberration.offset)}
            radialModulation={colorSpaceConfig.postProcessing.chromaticAberration.radialModulation}
            modulationOffset={colorSpaceConfig.postProcessing.chromaticAberration.modulationOffset}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default Image360Viewer;

