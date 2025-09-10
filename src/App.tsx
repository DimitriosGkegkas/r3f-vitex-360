import React, { useState, useEffect, useCallback } from 'react';
import { LoadingPage, Experience, Tooltip, ScoreCard } from './components';
import { floors } from './config';
import { ImageLoadResult } from './utils/imagePreloader';
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
  const [currentPage, setCurrentPage] = useState<'welcome' | 'experience' | 'completion'>('welcome');
  const [currentFloorId, setCurrentFloorId] = useState<string>('raw-materials');
  const [currentStepId, setCurrentStepId] = useState<string>('step_5_1'); // Start with first step of raw-materials
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [visitedSteps, setVisitedSteps] = useState<VisitedStep[]>([]);
  const [isWelcomeDissolving, setIsWelcomeDissolving] = useState(false);
  const [preloadResults, setPreloadResults] = useState<ImageLoadResult[]>([]);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState<{ loaded: number; total: number; percentage: number; currentImage?: string }>({
    loaded: 0,
    total: 0,
    percentage: 0
  });
  const [showScoreCard, setShowScoreCard] = useState(false);

  // Calculate total possible steps
  const totalPossibleSteps = Object.values(floors).reduce((total, floor) => total + floor.steps.length, 0);

  // Check if we're at the last step of the last floor
  const isAtLastStep = currentFloorId === 'packaging' && currentStepId === 'info_0_4_1';

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
        setIsPreloading(false);
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

  // Show score card when reaching the last step
  useEffect(() => {
    if (isAtLastStep) {
      setShowScoreCard(true);
    }
  }, [isAtLastStep]);

  const handleStart = () => {
    console.log('🎯 App: Starting the experience...');
    console.log('📊 App: Preload results:', preloadResults);
    console.log('🖼️ App: Images preloaded:', imagesPreloaded);
    
    // Start dissolve animation
    setIsWelcomeDissolving(true);
    
    // After dissolve animation completes, transition to experience
    setTimeout(() => {
      setCurrentPage('experience');
      // Mark the initial step as visited
      setVisitedSteps([{
        floorId: 'raw-materials',
        stepId: 'info_5_1_1'
      }]);
    }, 1000); // 1 second dissolve animation
  };

  const handlePreloadProgress = useCallback((progress: { loaded: number; total: number; percentage: number; currentImage?: string }) => {
    console.log('📊 App: Preload progress update', progress);
    setPreloadProgress(progress);
  }, []);

  const handlePreloadComplete = useCallback((results: ImageLoadResult[]) => {
    console.log('🎉 App: Preload completed with results:', results);
    setPreloadResults(results);
    setImagesPreloaded(true);
    setIsPreloading(false);
    
    // Log detailed preload statistics
    const loaded = results.filter(r => r.loaded).length;
    const failed = results.filter(r => !r.loaded).length;
    const total = results.length;
    
    console.log(`📈 App: Preload Statistics - ${loaded}/${total} loaded, ${failed} failed`);
    
    // Log failed images for debugging
    if (failed > 0) {
      console.warn('⚠️ App: Failed to preload images:', results.filter(r => !r.loaded));
    }
    
    // Expose preload results to window for debugging
    (window as any).preloadResults = results;
    (window as any).imagesPreloaded = true;
    console.log('🔧 Debug: Preload results available at window.preloadResults');
  }, []);

  const handleRestart = () => {
    console.log('Restarting the experience...');
    setVisitedSteps([]);
    setCurrentFloorId('raw-materials');
    setCurrentStepId('info_5_1_1');
    setCurrentPage('experience');
    setShowScoreCard(false);
  };

  const handleShowScoreCard = () => {
    setShowScoreCard(true);
  };

  const handleCloseScoreCard = () => {
    setShowScoreCard(false);
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
            isBackgroundMode={currentPage === 'welcome'}
            shouldStartVideo={isWelcomeDissolving}
            isPreloading={isPreloading}
            onPreloadComplete={handlePreloadComplete}
            onPreloadProgress={handlePreloadProgress}
            onShowScoreCard={handleShowScoreCard}
          />

          {/* Render tooltip outside the canvas */}
          <Tooltip
            title={tooltip?.title}
            isVisible={tooltip?.isVisible}
          />
        </div>
      )}

      {/* Show WelcomeCard on top when welcome */}
      {currentPage === 'welcome' && (
        <LoadingPage 
          onStart={handleStart} 
          isDissolving={isWelcomeDissolving}
          isPreloading={isPreloading}
          preloadResults={preloadResults}
          preloadProgress={preloadProgress}
        />
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

      {/* Show score card overlay when showScoreCard is true */}
      {showScoreCard && currentPage !== 'completion' && (
        <div className="score-card-overlay">
          <div className="score-card-container">
            <button 
              className="score-card-close" 
              onClick={handleCloseScoreCard}
              aria-label="Close score card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <ScoreCard
              visitedCount={visitedCount}
              totalPossibleSteps={totalPossibleSteps}
              dailyProduction={dailyProduction}
              onRestart={handleRestart}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
