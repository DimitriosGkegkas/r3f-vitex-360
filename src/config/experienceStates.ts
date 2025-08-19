// Import from the new separate config files
export * from './environments';
export * from './floorSteps';

// Import types and data for cross-referencing helper functions
import { floors } from './floorSteps';
import { environments, Keypoint } from './environments';

// Cross-referencing helper functions that need access to both environments and floors
export const getEnvironmentByFloorId = (floorId: string) => {
  const floor = floors[floorId];
  if (!floor) return undefined;
  return environments[floor.environmentId];
};

export const getKeypointByStep = (floorId: string, stepId: string): Keypoint | undefined => {
  const floor = floors[floorId];
  if (!floor) return undefined;
  
  const environment = environments[floor.environmentId];
  if (!environment) return undefined;
  
  return environment.keypoints.find((kp: Keypoint) => 
    kp.targetFloor === floorId && kp.targetStep === stepId
  );
};

export const getCameraPositionByStep = (floorId: string, stepId: string) => {
  const keypoint = getKeypointByStep(floorId, stepId);
  if (!keypoint) return undefined;
  
  return {
    yaw: keypoint.yaw,
    pitch: keypoint.pitch,
    zoom: keypoint.zoom
  };
};

export const getEnvironmentImageByFloor = (floorId: string) => {
  const environment = getEnvironmentByFloorId(floorId);
  return environment?.environmentImage;
};

export const getInitialCameraPositionByFloor = (floorId: string) => {
  const environment = getEnvironmentByFloorId(floorId);
  if (!environment) return undefined;
  
  return {
    angle: environment.cameraAngle,
    yaw: environment.cameraYaw
  };
};
