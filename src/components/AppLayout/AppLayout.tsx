import React from 'react';
import { LoadingPage, Experience, Tooltip, ScoreCard, FloorVideoCard } from '../';
import { CustomVRButton } from '../VRExperience/VRExperience';
import { TooltipData, FloorVideoData, PreloadProgress, VisitedStep } from '../../hooks';
import { ImageLoadResult } from '../../utils/imagePreloader';
import './AppLayout.css';
import { useVideoPreloader } from '../../hooks/useVideoPreloader';

interface AppLayoutProps {
  // Page state
  currentPage: 'welcome' | 'experience' | 'completion';
  currentFloorId: string;
  currentStepId: string;
  
  // UI state
  tooltip: TooltipData | null;
  showScoreCard: boolean;
  showFloorVideo: boolean;
  floorVideoData: FloorVideoData | null;
  isWelcomeDissolving: boolean;
  
  // Preload state
  isPreloading: boolean;
  preloadResults: ImageLoadResult[];
  preloadProgress: PreloadProgress;
  
  // VR state
  xrStore: any;
  isInVR: boolean;
  setIsInVR: (isInVR: boolean) => void;
  
  // Score state
  visitedSteps: VisitedStep[];
  totalPossibleSteps: number;
  dailyProduction: number;
  
  // Handlers
  onStart: () => void;
  onStateChange: (floorId: string) => void;
  onStepChange: (stepId: string) => void;
  onTooltipChange: (tooltip: TooltipData | null) => void;
  onPreloadComplete: (results: ImageLoadResult[]) => void;
  onPreloadProgress: (progress: PreloadProgress) => void;
  onShowScoreCard: () => void;
  onCloseScoreCard: () => void;
  onFloorVideoEnd: () => void;
  onRestart: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentPage,
  currentFloorId,
  currentStepId,
  tooltip,
  showScoreCard,
  showFloorVideo,
  floorVideoData,
  isWelcomeDissolving,
  isPreloading,
  preloadResults,
  preloadProgress,
  xrStore,
  isInVR,
  setIsInVR,
  visitedSteps,
  totalPossibleSteps,
  dailyProduction,
  onStart,
  onStateChange,
  onStepChange,
  onTooltipChange,
  onPreloadComplete,
  onPreloadProgress,
  onShowScoreCard,
  onCloseScoreCard,
  onFloorVideoEnd,
  onRestart,
}) => {
  const visitedCount = visitedSteps.length;

  // Preload videos
  useVideoPreloader();

  return (
    <div className="app-layout">
      {/* Always render Experience in background */}
      <div className="experience-container">
        {/* VR Toggle */}
        <CustomVRButton xrStore={xrStore} setIsInVR={setIsInVR} isInVR={isInVR} />
        
        {/* Render VR or Regular Experience */}
        <Experience
          xrStore={xrStore}
          isInVR={isInVR}
          currentFloorId={currentFloorId}
          currentStepId={currentStepId}
          onStateChange={onStateChange}
          onStepChange={onStepChange}
          onTooltipChange={onTooltipChange}
          isBackgroundMode={currentPage === 'welcome'}
          shouldStartVideo={isWelcomeDissolving}
          isPreloading={isPreloading}
          onPreloadComplete={onPreloadComplete}
          onPreloadProgress={onPreloadProgress}
          onShowScoreCard={onShowScoreCard}
          // VR video props - only show VR video when in VR mode
          showVRVideo={showFloorVideo && isInVR}
          vrVideoData={floorVideoData}
          onVRVideoEnd={onFloorVideoEnd}
        />

        {/* Render tooltip outside the canvas */}
        <Tooltip
          title={tooltip?.title}
          isVisible={tooltip?.isVisible}
        />
      </div>

      {/* Show WelcomeCard on top when welcome */}
      {currentPage === 'welcome' && (
        <LoadingPage
          onStart={onStart}
          isDissolving={isWelcomeDissolving}
          isPreloading={isPreloading}
          preloadResults={preloadResults}
          preloadProgress={preloadProgress}
        />
      )}

      {/* Show score card overlay when showScoreCard is true */}
      {showScoreCard && (
        <div className="score-card-overlay">
          <div className="score-card-container">
            <button
              className="score-card-close"
              onClick={onCloseScoreCard}
              aria-label="Close score card"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ScoreCard
              visitedCount={visitedCount}
              totalPossibleSteps={totalPossibleSteps}
              dailyProduction={dailyProduction}
              onRestart={onRestart}
            />
          </div>
        </div>
      )}

      {/* Show floor video when changing floors - conditional rendering based on VR mode */}
      {showFloorVideo && floorVideoData && !isInVR && (
        <FloorVideoCard
          floorIndex={floorVideoData.floorIndex}
          onVideoEnd={onFloorVideoEnd}
          isVisible={showFloorVideo}
        />
      )}
    </div>
  );
};
