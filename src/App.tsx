import React, { useState, useEffect } from 'react';
import { LoadingPage, Experience, Tooltip } from './components';
import { floors } from './config';
import './App.css';
import { CustomVRButton } from './components/VRExperience/VRExperience';
import { createXRStore } from '@react-three/xr';

interface TooltipData {
  title: string;
  isVisible: boolean;
}

const xrStore = createXRStore(
  { controller: { left: true, right: true } }
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'loading' | 'experience'>('loading');
  const [currentFloorId, setCurrentFloorId] = useState<string>('raw-materials');
  const [currentStepId, setCurrentStepId] = useState<string>('sustainable-sourcing'); // Start with first step of raw-materials
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isVRMode, setIsVRMode] = useState(false);
  const [isVRSupported, setIsVRSupported] = useState(false);

  useEffect(() => {
    // Check if WebXR is supported
    if ('xr' in navigator) {
      navigator.xr?.isSessionSupported('immersive-vr').then((supported) => {
        setIsVRSupported(supported);
      });
    }
  }, []);

  const handleStart = () => {
    console.log('Starting the experience...');
    setCurrentPage('experience');
  };

  const handleStateChange = (newFloorId: string) => {
    setCurrentFloorId(newFloorId);
    // Reset to first step when changing floors
    const newFloor = floors[newFloorId];
    if (newFloor && newFloor.steps.length > 0) {
      setCurrentStepId(newFloor.steps[0].id);
    }
  };

  const handleStepChange = (newStepId: string) => {
    setCurrentStepId(newStepId);
  };

  const handleVRToggle = (isVR: boolean) => {
    setIsVRMode(isVR);
  };

  return (
    <div className="App">
      {currentPage === 'loading' ? (
        <LoadingPage onStart={handleStart} />
      ) : (
        <div className="experience-container">
          {/* VR Toggle */}
          <div className="vr-toggle-container">
            <CustomVRButton xrStore={xrStore} />
          </div>

          {/* Render VR or Regular Experience */}
          <Experience
            xrStore={xrStore}
            currentFloorId={currentFloorId}
            currentStepId={currentStepId}
            onStateChange={handleStateChange}
            onStepChange={handleStepChange}
            onTooltipChange={setTooltip}
          />


          {/* Render tooltip outside the canvas */}
          <Tooltip
            title={tooltip?.title}
            isVisible={tooltip?.isVisible}
          />
        </div>
      )}
    </div>
  );
};

export default App;
