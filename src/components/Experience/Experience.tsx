import React, { useState } from 'react';
import { Header } from '../Header';
import { InfoCard } from '../InfoCard';
import { Menu } from '../Menu';
import { FloorPanel } from '../FloorPanel';
import { floors, Floor, getNextStep, getPreviousStep } from '../../config';
import './Experience.css';
import Image360Viewer from '../Image360Viewer';
import { XRStore } from '@react-three/xr';
import { VideoBackground } from '../VideoBackground';

interface ExperienceProps {
  xrStore: XRStore;
  currentFloorId: string;
  currentStepId: string;
  onStateChange: (newFloorId: string) => void;
  onStepChange: (newStepId: string) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
  isBackgroundMode?: boolean;
  shouldStartVideo?: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({
  xrStore,
  currentFloorId,
  currentStepId,
  onStateChange,
  onStepChange,
  onTooltipChange,
  isBackgroundMode = false,
  shouldStartVideo = false
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

  const handleFloorChange = (direction: 'prev' | 'next') => {
    const currentIndex = floorOrder.indexOf(currentFloorId);

    if (direction === 'next' && currentIndex < floorOrder.length - 1) {
      onStateChange(floorOrder[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      onStateChange(floorOrder[currentIndex - 1]);
    }
  };

  const handleStepChange = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      const nextStep = getNextStep(currentFloorId, currentStepId);
      if (nextStep) {
        onStepChange(nextStep.id);
      } else {
        // If no more steps in current floor, go to next floor
        handleFloorChange('next');
      }
    } else if (direction === 'prev') {
      const prevStep = getPreviousStep(currentFloorId, currentStepId);
      if (prevStep) {
        onStepChange(prevStep.id);
      } else {
        // If no more steps in current floor, go to previous floor
        handleFloorChange('prev');
      }
    }
  };

  const canGoNext = () => {
    // Check if there's a next step in current floor or if we can go to next floor
    const nextStep = getNextStep(currentFloorId, currentStepId);
    if (nextStep) return true;

    const currentIndex = floorOrder.indexOf(currentFloorId);
    return currentIndex < floorOrder.length - 1;
  };

  const canGoPrevious = () => {
    // Check if there's a previous step in current floor or if we can go to previous floor
    const prevStep = getPreviousStep(currentFloorId, currentStepId);
    if (prevStep) return true;

    const currentIndex = floorOrder.indexOf(currentFloorId);
    return currentIndex > 0;
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
        floorPanel={
          <FloorPanel
            currentFloorId={currentFloorId}
            experienceStates={floors}
            stateOrder={floorOrder}
            onStepChange={handleFloorChange}
            canGoPrevious={canGoPrevious}
            onClose={() => {
              // This will close the floor panel by toggling the menu state
              // The Menu component will handle this through its own state management
            }}
            onStateChange={onStateChange}
          />
        }
        hideFloorsButton={showVideo}
      />
    </div>
  );
};
