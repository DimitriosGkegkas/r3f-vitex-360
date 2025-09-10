import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { XR, XRStore } from '@react-three/xr';
// import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { getFloorById, environments } from '../../config';
import { getColorSpaceConfig, setColorSpaceConfig, vrColorSpaceConfig, defaultColorSpaceConfig } from '../../config/colorSpace';
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

// Component to handle renderer settings and context loss
const RendererSettings: React.FC<{ colorSpaceConfig: any }> = ({ colorSpaceConfig }) => {
  const { gl } = useThree();
  
  // useEffect(() => {
  //   if (gl) {
  //     // Apply color space settings
  //     gl.outputColorSpace = colorSpaceConfig.renderer.outputColorSpace;
  //     gl.toneMapping = THREE[colorSpaceConfig.renderer.toneMapping as keyof typeof THREE] as THREE.ToneMapping;
  //     gl.toneMappingExposure = colorSpaceConfig.renderer.toneMappingExposure;
      
  //     console.log('🎨 Applied color space settings to renderer:', {
  //       outputColorSpace: gl.outputColorSpace,
  //       toneMapping: gl.toneMapping,
  //       toneMappingExposure: gl.toneMappingExposure
  //     });

  //     // Handle WebGL context loss
  //     const handleContextLost = (event: Event) => {
  //       console.warn('⚠️ WebGL context lost, preventing default behavior');
  //       event.preventDefault();
  //     };

  //     const handleContextRestored = () => {
  //       console.log('✅ WebGL context restored');
  //       // Reapply settings after context restoration
  //       gl.outputColorSpace = colorSpaceConfig.renderer.outputColorSpace;
  //       gl.toneMapping = THREE[colorSpaceConfig.renderer.toneMapping as keyof typeof THREE] as THREE.ToneMapping;
  //       gl.toneMappingExposure = colorSpaceConfig.renderer.toneMappingExposure;
  //     };

  //     // Add event listeners
  //     gl.domElement.addEventListener('webglcontextlost', handleContextLost);
  //     gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);

  //     // Cleanup
  //     return () => {
  //       gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
  //       gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
  //     };
  //   }
  // }, [gl, colorSpaceConfig]);
  
  return null;
};


const Image360Viewer: React.FC<Image360ViewerProps> = ({
  currentFloorId,
  currentStepId,
  xrStore,
  infoCardData,
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
          <RendererSettings colorSpaceConfig={colorSpaceConfig} />
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
          {/* Enhanced lighting for VR */}
          {/* Sunlight simulation - directional light from above */}
          <directionalLight
            position={[0, 50, 0]}
            intensity={xrStore.getState()?.session ? 3 : 2}
            castShadow={false}
          />

          {/* Ambient light for overall scene illumination */}
          <ambientLight intensity={xrStore.getState()?.session ? 0.5 : 0.3} />

          {/* Hemisphere light for realistic sky lighting */}
          <hemisphereLight
            args={["#87CEEB", "#8B4513", xrStore.getState()?.session ? 0.6 : 0.4]}
          />

          {/* Additional VR-specific lighting */}
          {xrStore.getState()?.session && (
            <>
              <directionalLight
                position={[10, 10, 10]}
                intensity={1}
                color="#ffffff"
              />
              <pointLight
                position={[0, 2, 0]}
                intensity={0.5}
                color="#ffffff"
              />
            </>
          )}

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
        
      </Canvas>
    </>
  );
};

export default Image360Viewer;


