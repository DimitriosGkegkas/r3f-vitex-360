import { useEffect } from 'react';
import { floors } from '../config';

interface UseUrlParamsProps {
  setCurrentFloorId: (floorId: string) => void;
  setCurrentStepId: (stepId: string) => void;
  setCurrentPage: (page: 'welcome' | 'experience' | 'completion') => void;
  setIsPreloading: (isPreloading: boolean) => void;
  setVisitedSteps: (steps: { floorId: string; stepId: string }[]) => void;
}

export const useUrlParams = ({
  setCurrentFloorId,
  setCurrentStepId,
  setCurrentPage,
  setIsPreloading,
  setVisitedSteps,
}: UseUrlParamsProps) => {
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
  }, [setCurrentFloorId, setCurrentStepId, setCurrentPage, setIsPreloading, setVisitedSteps]);
};
