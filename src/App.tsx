import React, { useState, useEffect } from 'react';
import { LoadingPage, Experience, Tooltip, ScoreCard } from './components';
import { floors } from './config';
import './App.css';
import { CustomVRButton } from './components/VRExperience/VRExperience';
import { createXRStore } from '@react-three/xr';

interface TooltipData {
  title: string;
  isVisible: boolean;
}

interface VisitedStep {
  floorId: string;
  stepId: string;
}

const xrStore = createXRStore(
  { controller: { left: true, right: true } }
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'loading' | 'experience' | 'completion'>('loading');
  const [currentFloorId, setCurrentFloorId] = useState<string>('raw-materials');
  const [currentStepId, setCurrentStepId] = useState<string>('step_5_1'); // Start with first step of raw-materials
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [visitedSteps, setVisitedSteps] = useState<VisitedStep[]>([]);
  const [isLoadingPageDissolving, setIsLoadingPageDissolving] = useState(false);

  // Calculate total possible steps
  const totalPossibleSteps = Object.values(floors).reduce((total, floor) => total + floor.steps.length, 0);

  // Check if we're at the last step of the last floor
  const isAtLastStep = currentFloorId === 'packaging' && currentStepId === 'final-inspection';

  // Calculate score (visited steps vs total possible steps)
  const visitedCount = visitedSteps.length;
  const scorePercentage = Math.round((visitedCount / totalPossibleSteps) * 100);

  // Calculate daily production capacity based on score
  const dailyProduction = Math.round((scorePercentage / 100) * 14000); // Max 14,000 bags per day

  // URL parameter support for debugging
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const floorIdParam = urlParams.get('floorId');
    const stepIdParam = urlParams.get('stepId');

    // Validate floor ID
    if (floorIdParam && floors[floorIdParam]) {
      setCurrentFloorId(floorIdParam);
      
      // If step ID is provided and valid for this floor, set it
      if (stepIdParam) {
        const floor = floors[floorIdParam];
        const stepExists = floor.steps.some(step => step.id === stepIdParam);
        if (stepExists) {
          setCurrentStepId(stepIdParam);
        } else {
          // If step ID is invalid, default to first step of the floor
          setCurrentStepId(floor.steps[0].id);
        }
      } else {
        // If no step ID provided, default to first step of the floor
        setCurrentStepId(floors[floorIdParam].steps[0].id);
      }
      
      // If both parameters are provided, start directly in experience mode
      if (floorIdParam && stepIdParam) {
        setCurrentPage('experience');
        // Mark the initial step as visited
        setVisitedSteps([{
          floorId: floorIdParam,
          stepId: stepIdParam
        }]);
      }
    }
  }, []);

  useEffect(() => {
    // Check if we should show completion page when reaching the last step
    if (isAtLastStep && currentPage === 'experience') {
      setCurrentPage('completion');
    }
  }, [isAtLastStep, currentPage]);

  const handleStart = () => {
    console.log('Starting the experience...');
    // Start dissolve animation
    setIsLoadingPageDissolving(true);
    
    // After dissolve animation completes, transition to experience
    setTimeout(() => {
      setCurrentPage('experience');
      // Mark the initial step as visited
      setVisitedSteps([{
        floorId: 'raw-materials',
        stepId: 'sustainable-sourcing'
      }]);
    }, 1000); // 1 second dissolve animation
  };

  const handleRestart = () => {
    console.log('Restarting the experience...');
    setVisitedSteps([]);
    setCurrentFloorId('raw-materials');
    setCurrentStepId('sustainable-sourcing');
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
    
    // Mark this step as visited
    const newVisitedStep: VisitedStep = {
      floorId: currentFloorId,
      stepId: newStepId
    };
    
    // Check if this step is already visited
    const isAlreadyVisited = visitedSteps.some(
      step => step.floorId === newVisitedStep.floorId && step.stepId === newVisitedStep.stepId
    );
    
    if (!isAlreadyVisited) {
      setVisitedSteps(prev => {
        const newVisitedSteps = [...prev, newVisitedStep];
        console.log('New step visited:', newVisitedStep);
        console.log('Total visited steps:', newVisitedSteps.length);
        console.log('Total possible steps:', totalPossibleSteps);
        return newVisitedSteps;
      });
    }
  };

  return (
    <div className="App">
      {/* Always render Experience in background */}
      {currentPage !== 'completion' && (
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
            isBackgroundMode={currentPage === 'loading'}
            shouldStartVideo={isLoadingPageDissolving}
          />

          {/* Render tooltip outside the canvas */}
          <Tooltip
            title={tooltip?.title}
            isVisible={tooltip?.isVisible}
          />
        </div>
      )}

      {/* Show LoadingPage on top when loading */}
      {currentPage === 'loading' && (
        <LoadingPage onStart={handleStart} isDissolving={isLoadingPageDissolving} />
      )}

      {/* Show completion page */}
      {currentPage === 'completion' && (
        <div className="completion-container">
          <ScoreCard
            visitedCount={visitedCount}
            totalPossibleSteps={totalPossibleSteps}
            dailyProduction={dailyProduction}
            onRestart={handleRestart}
          />
        </div>
      )}
    </div>
  );
};

export default App;
