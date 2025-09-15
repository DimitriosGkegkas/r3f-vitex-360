import { useState, useEffect } from 'react';
import { createXRStore } from '@react-three/xr';

const xrStore = createXRStore(
  { controller: { left: true, right: true } }
);

export const useVRState = () => {
  const [isInVR, setIsInVR] = useState(false);

  // Track VR session changes
  useEffect(() => {
    const checkVRSession = () => {
      const session = xrStore.getState().session;
      setIsInVR(!!session);
    };

    // Check initial state
    checkVRSession();

    // Listen for session changes
    const unsubscribe = xrStore.subscribe((state: any) => {
      setIsInVR(!!state.session);
    });

    return unsubscribe;
  }, []);

  const closeVR = () => {
    xrStore.getState().session?.end();
    setIsInVR(false);
  };

  return {
    xrStore,
    isInVR,
    setIsInVR,
    closeVR,
  };
};
