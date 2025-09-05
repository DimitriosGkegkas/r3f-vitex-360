import { getNextStep, getPreviousStep, getNextFloor, getPreviousFloor } from '../config';

export interface StepNavigationCallbacks {
  onStepChange: (stepId: string) => void;
  onFloorChange: (floorId: string) => void;
}

export const createStepChangeHandler = (callbacks: StepNavigationCallbacks) => {
  const { onStepChange, onFloorChange } = callbacks;

  const handleStepChange = (direction: 'prev' | 'next', currentFloorId: string, currentStepId: string) => {
    if (direction === 'next') {
      const nextStep = getNextStep(currentFloorId, currentStepId);
      if (nextStep) {
        onStepChange(nextStep.id);
      } else {
        // If no more steps in current floor, go to next floor
        const nextFloor = getNextFloor(currentFloorId);
        if (nextFloor) {
          onFloorChange(nextFloor.id);
        }
      }
    } else if (direction === 'prev') {
      const prevStep = getPreviousStep(currentFloorId, currentStepId);
      if (prevStep) {
        onStepChange(prevStep.id);
      } else {
        // If no more steps in current floor, go to previous floor
        const prevFloor = getPreviousFloor(currentFloorId);
        if (prevFloor) {
          onFloorChange(prevFloor.id);
        }
      }
    }
  };

  const canGoNext = (currentFloorId: string, currentStepId: string) => {
    // Check if there's a next step in current floor or if we can go to next floor
    const nextStep = getNextStep(currentFloorId, currentStepId);
    if (nextStep) return true;

    const nextFloor = getNextFloor(currentFloorId);
    return !!nextFloor;
  };

  const canGoPrevious = (currentFloorId: string, currentStepId: string) => {
    // Check if there's a previous step in current floor or if we can go to previous floor
    const prevStep = getPreviousStep(currentFloorId, currentStepId);
    if (prevStep) return true;

    const prevFloor = getPreviousFloor(currentFloorId);
    return !!prevFloor;
  };

  return {
    handleStepChange,
    canGoNext,
    canGoPrevious
  };
};
