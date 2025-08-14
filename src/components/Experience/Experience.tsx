import React, { useEffect } from 'react';
import { Header } from '../Header';
import { InfoCard } from '../InfoCard';
import { Menu } from '../Menu';
import { FloorPanel } from '../FloorPanel';
import { experienceStates, ExperienceState } from '../../config';
import { useExperienceState } from '../../hooks';
import './Experience.css';

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


  // Define state order for navigation
  const stateOrder = ['raw-materials', 'sorting', 'quantities', 'secrets', 'mixing', 'packaging'];

  return (
    <div className="experience-page">
      <div className="experience-background">
        <img
          src="https://placehold.co/1440x750"
          alt="Factory Background"
          className="background-image"
        />
      </div>

      <Header />

      <div className="experience-content">
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
