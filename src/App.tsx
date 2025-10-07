import React, { useEffect } from 'react';
import { AppLayout } from './components';
import { floors } from './config';
import { 
  useAppState, 
  useVRState, 
  useUrlParams, 
  useScoreCalculation, 
  useFloorVideo,
  VisitedStep 
} from './hooks';
import './App.css';

const App: React.FC = () => {
  // Use custom hooks for state management
  const appState = useAppState();
  const vrState = useVRState();
  const scoreData = useScoreCalculation(appState.visitedSteps);
  const floorVideo = useFloorVideo({
    setShowFloorVideo: appState.setShowFloorVideo,
    setFloorVideoData: appState.setFloorVideoData,
  });

  // URL parameter handling
  useUrlParams({
    setCurrentFloorId: appState.setCurrentFloorId,
    setCurrentStepId: appState.setCurrentStepId,
    setCurrentPage: appState.setCurrentPage,
    setIsPreloading: () => {}, // This would need to be handled in useAppState if needed
    setVisitedSteps: appState.setVisitedSteps,
  });

  // Check if we're at the last step of the last floor
  const isAtLastStep = appState.currentFloorId === 'packaging' && appState.currentStepId === 'info_0_4_1';

  useEffect(() => {
    // Check if we should show completion page when reaching the last step
    if (isAtLastStep && appState.currentPage === 'experience') {
      appState.setCurrentPage('completion');
    }
  }, [isAtLastStep, appState.currentPage, appState.setCurrentPage]);

  // Show score card when reaching the last step
  useEffect(() => {
    if (isAtLastStep) {
      appState.setShowScoreCard(true);
      vrState.closeVR();
    }
  }, [isAtLastStep, appState.setShowScoreCard, vrState.closeVR]);

  const handleStart = () => {
    console.log('🎯 App: Starting the experience...');
    console.log('📊 App: Preload results:', appState.preloadResults);
    console.log('🖼️ App: Images preloaded:', appState.imagesPreloaded);

    // Start dissolve animation
    appState.setIsWelcomeDissolving(true);

    // Show the initial floor video (5th floor) when intro starts
    floorVideo.showFloorVideo(appState.currentFloorId, true);

    // After dissolve animation completes, transition to experience
    setTimeout(() => {
      appState.setCurrentPage('experience');
      // Mark the initial step as visited
      appState.setVisitedSteps([{
        floorId: 'raw-materials',
        stepId: 'info_5_1_1'
      }]);
    }, 1000); // 1 second dissolve animation
  };

  const handleRestart = () => {
    console.log('Restarting the experience...');
    appState.setVisitedSteps([]);
    appState.setCurrentFloorId('raw-materials');
    appState.setCurrentStepId('info_5_1_1');
    appState.setCurrentPage('experience');
    appState.setShowScoreCard(false);
  };

  const handleShowScoreCard = () => {
    appState.setShowScoreCard(true);
    vrState.closeVR();
  };

  const handleCloseScoreCard = () => {
    appState.setShowScoreCard(false);
  };

  const handleStateChange = (newFloorId: string) => {
    // Only show video when actually changing floors (not on initial load)
    const isActualFloorChange = appState.currentFloorId !== newFloorId;
    
    console.log(`🎬 Floor change: ${appState.currentFloorId} -> ${newFloorId}, isActualFloorChange: ${isActualFloorChange}`);
    
    floorVideo.showFloorVideo(newFloorId, isActualFloorChange);
    
    appState.setCurrentFloorId(newFloorId);
    // Reset to first step when changing floors
    const newFloor = floors[newFloorId];
    if (newFloor && newFloor.steps.length > 0) {
      appState.setCurrentStepId(newFloor.steps[0].id);
    }
  };

  const handleStepChange = (newStepId: string) => {
    appState.setCurrentStepId(newStepId);

    // Open info panel when step changes (hotspot clicked)
    appState.setIsInfoPanelOpen(true);

    // Mark this step as visited
    const newVisitedStep: VisitedStep = {
      floorId: appState.currentFloorId,
      stepId: newStepId
    };

    // Check if this step is already visited
    const isAlreadyVisited = appState.visitedSteps.some(
      step => step.floorId === newVisitedStep.floorId && step.stepId === newVisitedStep.stepId
    );

    if (!isAlreadyVisited) {
      appState.setVisitedSteps(prev => {
        const newVisitedSteps = [...prev, newVisitedStep];
        console.log('New step visited:', newVisitedStep);
        console.log('Total visited steps:', newVisitedSteps.length);
        console.log('Total possible steps:', scoreData.totalPossibleSteps);
        return newVisitedSteps;
      });
    }
  };


  return (
    <AppLayout
      // Page state
      currentPage={appState.currentPage}
      currentFloorId={appState.currentFloorId}
      currentStepId={appState.currentStepId}
      
      // UI state
      tooltip={appState.tooltip}
      showScoreCard={appState.showScoreCard}
      showFloorVideo={appState.showFloorVideo}
      floorVideoData={appState.floorVideoData}
      isWelcomeDissolving={appState.isWelcomeDissolving}
      isInfoPanelOpen={appState.isInfoPanelOpen}
      
      // Preload state
      isPreloading={appState.isPreloading}
      preloadResults={appState.preloadResults}
      preloadProgress={appState.preloadProgress}
      
      // VR state
      xrStore={vrState.xrStore}
      isInVR={vrState.isInVR}
      setIsInVR={vrState.setIsInVR}
      
      // Score state
      visitedSteps={appState.visitedSteps}
      totalPossibleSteps={scoreData.totalPossibleSteps}
      dailyProduction={scoreData.dailyProduction}
      
      // Audio state
      isMuted={appState.isMuted}
      onToggleMute={appState.toggleMute}
      
      // Handlers
      onStart={handleStart}
      onStateChange={handleStateChange}
      onStepChange={handleStepChange}
      onTooltipChange={appState.setTooltip}
      onPreloadComplete={appState.handlePreloadComplete}
      onPreloadProgress={appState.handlePreloadProgress}
      onShowScoreCard={handleShowScoreCard}
      onCloseScoreCard={handleCloseScoreCard}
      onFloorVideoEnd={floorVideo.hideFloorVideo}
      onRestart={handleRestart}
      onInfoPanelClose={() => appState.setIsInfoPanelOpen(false)}
    />
  );
};

export default App;
