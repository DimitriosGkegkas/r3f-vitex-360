import { useMemo } from 'react';
import { floors } from '../config';
import { VisitedStep } from './useAppState';

export const useScoreCalculation = (visitedSteps: VisitedStep[]) => {
  // Calculate total possible steps
  const totalPossibleSteps = useMemo(() => 
    Object.values(floors).reduce((total, floor) => total + floor.steps.length, 0),
    []
  );

  // Calculate score (visited steps vs total possible steps)
  const visitedCount = visitedSteps.length;
  const scorePercentage = Math.round((visitedCount / totalPossibleSteps) * 100);

  // Calculate daily production capacity based on score
  const dailyProduction = Math.round((scorePercentage / 100) * 14000); // Max 14,000 bags per day

  // Check if we're at the last step of the last floor
  const isAtLastStep = useMemo(() => {
    // This would need currentFloorId and currentStepId passed in if needed
    // For now, keeping it simple
    return false;
  }, []);

  return {
    totalPossibleSteps,
    visitedCount,
    scorePercentage,
    dailyProduction,
    isAtLastStep,
  };
};
