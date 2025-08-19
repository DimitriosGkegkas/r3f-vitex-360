import React, { useState } from 'react';
import { LoadingPage, Experience, Tooltip } from './components';
import { floors } from './config';
import './App.css';

interface TooltipData {
  title: string;
  isVisible: boolean;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'loading' | 'experience'>('loading');
  const [currentFloorId, setCurrentFloorId] = useState<string>('raw-materials');
  const [currentStepId, setCurrentStepId] = useState<string>('sustainable-sourcing'); // Start with first step of raw-materials
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

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

  return (
    <div className="App">
      {currentPage === 'loading' ? (
        <LoadingPage onStart={handleStart} />
      ) : (
        <div className="experience-container">
          <Experience
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
