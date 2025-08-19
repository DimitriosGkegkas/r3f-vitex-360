import React from 'react';
import { Header } from '../Header';
import { InfoCard } from '../InfoCard';
import { Menu } from '../Menu';
import { FloorPanel } from '../FloorPanel';
import { experienceStates, ExperienceState } from '../../config';
import './Experience.css';
import Image360Viewer from '../Image360Viewer';

interface ExperienceProps {
  currentStateId: string;
  onStateChange: (newStateId: string) => void;
  onTooltipChange?: (tooltip: { title: string; isVisible: boolean } | null) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ currentStateId, onStateChange, onTooltipChange }) => {
  // Get current state data
  const currentState: ExperienceState = experienceStates[currentStateId];

  // Define state order for navigation
  const stateOrder = ['raw-materials', 'sorting', 'quantities', 'secrets', 'mixing', 'packaging'];

  const handleStepChange = (direction: 'prev' | 'next') => {
    const currentIndex = stateOrder.indexOf(currentStateId);
    
    if (direction === 'next' && currentIndex < stateOrder.length - 1) {
      onStateChange(stateOrder[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      onStateChange(stateOrder[currentIndex - 1]);
    }
  };

  const canGoNext = () => {
    const currentIndex = stateOrder.indexOf(currentStateId);
    return currentIndex < stateOrder.length - 1;
  };

  const canGoPrevious = () => {
    const currentIndex = stateOrder.indexOf(currentStateId);
    return currentIndex > 0;
  };

  return (
    <div className="experience-page">
      <Image360Viewer
        stateId={currentStateId}
        className="w-full h-full"
        onTooltipChange={onTooltipChange}
      />
      <Header />
      <div className="info-card-container">
        <InfoCard
          title={currentState.title}
          description={currentState.description}
          step={currentState.stepName}
          floor={currentState.floor}
          currentStep={stateOrder.indexOf(currentStateId) + 1}
          totalSteps={stateOrder.length}
          onNext={canGoNext() ? () => handleStepChange('next') : undefined}
          onPrev={canGoPrevious() ? () => handleStepChange('prev') : undefined}
        />
      </div>
      <Menu floorPanel={
        <FloorPanel
          currentStateId={currentStateId}
          experienceStates={experienceStates}
          stateOrder={stateOrder}
          onStepChange={handleStepChange}
          canGoPrevious={canGoPrevious}
          onClose={() => {
            // This will close the floor panel by toggling the menu state
            // The Menu component will handle this through its own state management
          }}
          onStateChange={onStateChange}
        />
      } />
    </div>
  );
};
