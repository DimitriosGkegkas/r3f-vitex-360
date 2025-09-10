import React, { useState } from 'react';
import { Header } from '../Header';
import { InfoCard } from '../InfoCard';
import { Menu } from '../Menu';
import { floors, Floor } from '../../config';
import { createStepChangeHandler } from '../../utils/stepNavigation';
import './Experience.css';
import Image360Viewer from '../Image360Viewer';
import { XRStore } from '@react-three/xr';
import { VideoBackground } from '../VideoBackground';
import { ImageLoadResult } from '../../utils/imagePreloader';

interface ExperienceProps {
  xrStore: XRStore;
  currentFloorId: string;
  currentStepId: string;
  onStateChange: (newFloorId: string) => void;
  onStepChange: (newStepId: string) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
  isBackgroundMode?: boolean;
  shouldStartVideo?: boolean;
  isPreloading?: boolean;
  onPreloadComplete?: (results: ImageLoadResult[]) => void;
  onPreloadProgress?: (progress: { loaded: number; total: number; percentage: number; currentImage?: string }) => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  xrStore,
  currentFloorId,
  currentStepId,
  onStateChange,
  onStepChange,
  onTooltipChange,
  isBackgroundMode = false,
  shouldStartVideo = false,
  isPreloading = false,
  onPreloadComplete,
  onPreloadProgress
}) => {
  // State for video visibility
  const [showVideo, setShowVideo] = useState(!isBackgroundMode);
  const [videoStarted, setVideoStarted] = useState(false);

  // Get current floor data
  const currentFloor: Floor = floors[currentFloorId];

  // Get current step data
  const currentStep = currentFloor.steps.find(step => step.id === currentStepId) || currentFloor.steps[0];

  // Define floor order for navigation
  const floorOrder = ['raw-materials', 'sorting', 'quantities', 'secrets', 'mixing', 'packaging'];


  // Create step change handler with shared logic
  const stepNavigation = createStepChangeHandler({
    onStepChange,
    onFloorChange: (floorId) => onStateChange(floorId)
  });

  const handleStepChange = (direction: 'prev' | 'next') => {
    stepNavigation.handleStepChange(direction, currentFloorId, currentStepId);
  };

  const canGoNext = () => {
    return stepNavigation.canGoNext(currentFloorId, currentStepId);
  };

  const canGoPrevious = () => {
    return stepNavigation.canGoPrevious(currentFloorId, currentStepId);
  };

  // Get current step index within the floor
  const currentStepIndex = currentFloor.steps.findIndex(step => step.id === currentStepId);
  const totalStepsInFloor = currentFloor.steps.length;

  // Handle video end
  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  // Handle video skip
  const handleVideoSkip = () => {
    setShowVideo(false);
  };

  // Effect to start video when shouldStartVideo becomes true
  React.useEffect(() => {
    if (shouldStartVideo && !videoStarted) {
      setVideoStarted(true);
      setShowVideo(true);
    }
  }, [shouldStartVideo, videoStarted]);

  return (

    <div className={`experience-page ${isBackgroundMode ? 'background-mode' : ''}`}>
      {showVideo && (
        <VideoBackground
          videoSrc="/video/intro_drone.mp4"
          className="loading-page-bg"
          autoplay={videoStarted}
          muted={true}
          loop={false}
          onVideoEnd={handleVideoEnd}
          onSkip={handleVideoSkip}
          showSkipButton={!isBackgroundMode}
        />
      )}
      <Image360Viewer
        currentFloorId={currentFloorId}
        currentStepId={currentStepId}
        xrStore={xrStore}
        className="w-full h-full"
        onTooltipChange={onTooltipChange}
        onStepChange={onStepChange}
        onFloorChange={onStateChange}
        onNext={canGoNext() ? () => handleStepChange('next') : undefined}
        isPreloading={isPreloading}
        onPreloadComplete={onPreloadComplete}
        onPreloadProgress={onPreloadProgress}
        infoCardData={{
          title: currentStep.title,
          description: currentStep.description,
          step: currentStep.stepName,
          floor: currentFloor.floorNumber,
          currentStep: currentStepIndex + 1,
          totalSteps: totalStepsInFloor
        }}
      />
      <Header />
      {!showVideo && (
        <div className="info-card-container">
          <InfoCard
            title={currentStep.title}
            description={currentStep.description}
            step={currentStep.stepName}
            floor={currentFloor.floorNumber}
            currentStep={currentStepIndex + 1}
            totalSteps={totalStepsInFloor}
            onNext={canGoNext() ? () => handleStepChange('next') : undefined}
            onPrev={canGoPrevious() ? () => handleStepChange('prev') : undefined}
          />
        </div>
      )}

      <Menu 
        hideFloorsButton={showVideo}
        currentFloorId={currentFloorId}
        floors={floors}
        floorOrder={floorOrder}
        onStateChange={onStateChange}
        canGoPrevious={canGoPrevious}
      />
    </div>
  );
};
