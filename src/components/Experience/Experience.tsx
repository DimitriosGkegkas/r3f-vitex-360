import React, { useEffect, useRef } from 'react';
import { Header } from '../Header';
import { InfoCard } from '../InfoCard';
import { Menu } from '../Menu';
import { FloorPanel } from '../FloorPanel';
import { experienceStates, ExperienceState } from '../../config';
import { useExperienceState } from '../../hooks';
import './Experience.css';
import Image360Viewer from '../Image360Viewer';

interface ExperienceProps {
  currentStateId: string;
  onStateChange: (newStateId: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ currentStateId, onStateChange }) => {
  // Use custom hook for state management
  const {
    currentStateId: localStateId,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious
  } = useExperienceState(currentStateId);

  // Ref for the background overlay
  const backgroundOverlayRef = useRef<HTMLDivElement>(null);

  // State for FloorPanel visibility

  // Sync local state with prop changes
  useEffect(() => {
    if (localStateId !== currentStateId) {
      onStateChange(localStateId);
    }
  }, [localStateId, currentStateId, onStateChange]);

  // Get current state data
  const currentState: ExperienceState = experienceStates[localStateId];

  const handleStepChange = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      const newStateId = goToNext();
      if (newStateId) {
        onStateChange(newStateId);
      }
    } else {
      const newStateId = goToPrevious();
      if (newStateId) {
        onStateChange(newStateId);
      }
    }
  };

  // Handle background clicks to forward to canvas
  const handleBackgroundClick = (event: React.MouseEvent) => {
    // Only handle clicks on the background overlay itself, not on child elements
    if (event.target === backgroundOverlayRef.current) {
      // Find the canvas element and simulate a click on it
      const canvas = document.querySelector('canvas');
      if (canvas) {
        // Create a new mouse event to forward to the canvas
        const canvasEvent = new MouseEvent('mousedown', {
          clientX: event.clientX,
          clientY: event.clientY,
          button: event.button,
          buttons: event.buttons,
          bubbles: true,
          cancelable: true
        });

        canvas.dispatchEvent(canvasEvent);
      }
    }
  };

  // Define state order for navigation
  const stateOrder = ['raw-materials', 'sorting', 'quantities', 'secrets', 'mixing', 'packaging'];

  return (
    <div className="experience-page">
      <Image360Viewer
        stateId={currentStateId}
        className="w-full h-full"
      />
      <Header />
      <div className="info-card-container">
        <InfoCard
          title={currentState.title}
          description={currentState.description}
          step={currentState.stepName}
          floor={currentState.floor}
          currentStep={stateOrder.indexOf(localStateId) + 1}
          totalSteps={stateOrder.length}
          onNext={canGoNext() ? () => handleStepChange('next') : undefined}
          onPrev={canGoPrevious() ? () => handleStepChange('prev') : undefined}
        />
      </div>
      <Menu floorPanel={
        <FloorPanel
          currentStateId={localStateId}
          experienceStates={experienceStates}
          stateOrder={stateOrder}
          onStepChange={handleStepChange}
          canGoPrevious={canGoPrevious}
          onClose={() => {
            // This will close the floor panel by toggling the menu state
            // The Menu component will handle this through its own state management
          }}
        />
      } />
    </div>
  );
};
