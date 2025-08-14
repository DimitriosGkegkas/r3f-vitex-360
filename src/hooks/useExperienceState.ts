import { useState, useCallback } from 'react';
import { getNextState, getPreviousState } from '../config';

export const useExperienceState = (initialStateId: string = 'raw-materials') => {
  const [currentStateId, setCurrentStateId] = useState<string>(initialStateId);

  const goToNext = useCallback(() => {
    const nextState = getNextState(currentStateId);
    if (nextState) {
      setCurrentStateId(nextState.id);
      return nextState.id;
    }
    return null;
  }, [currentStateId]);

  const goToPrevious = useCallback(() => {
    const prevState = getPreviousState(currentStateId);
    if (prevState) {
      setCurrentStateId(prevState.id);
      return prevState.id;
    }
    return null;
  }, [currentStateId]);

  const goToState = useCallback((stateId: string) => {
    setCurrentStateId(stateId);
    return stateId;
  }, []);

  const canGoNext = useCallback(() => {
    return !!getNextState(currentStateId);
  }, [currentStateId]);

  const canGoPrevious = useCallback(() => {
    return !!getPreviousState(currentStateId);
  }, [currentStateId]);

  return {
    currentStateId,
    goToNext,
    goToPrevious,
    goToState,
    canGoNext,
    canGoPrevious,
    setCurrentStateId
  };
};
