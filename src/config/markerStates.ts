export interface MarkerStateConfig {
  scale: number;
  outerColor: string;
  innerColor: string;
  outerOpacity: number;
  innerOpacity: number;
  emissiveIntensity?: number;
  pulseMultiplier?: number;
}

export interface MarkerStates {
  normal: MarkerStateConfig;
  hover: MarkerStateConfig;
  clicked: MarkerStateConfig;
}

export const hotspotMarkerStates: MarkerStates = {
  normal: {
    scale: 0.6,
    outerColor: "white",
    innerColor: "#1088F4",
    outerOpacity: 0.8,
    innerOpacity: 1.0,
  },
  hover: {
    scale: 0.7,
    outerColor: "#FFD700",
    innerColor: "#FF6B35",
    outerOpacity: 0.9,
    innerOpacity: 1.0,
  },
  clicked: {
    scale: 0.8,
    outerColor: "#00FF00",
    innerColor: "#00CC00",
    outerOpacity: 1.0,
    innerOpacity: 1.0,
  },
};

export const teleportMarkerStates: MarkerStates = {
  normal: {
    scale: 1.0,
    outerColor: "#1088F4",
    innerColor: "#1088F4",
    outerOpacity: 1,
    innerOpacity: 0.3,
    emissiveIntensity: 3.0,
    pulseMultiplier: 1.0,
  },
  hover: {
    scale: 1.2,
    outerColor: "#FFD700",
    innerColor: "#FFD700",
    outerOpacity: 0.9,
    innerOpacity: 0.2,
    emissiveIntensity: 4.0,
    pulseMultiplier: 1.2,
  },
  clicked: {
    scale: 1.4,
    outerColor: "#00FF00",
    innerColor: "#00CC00",
    outerOpacity: 1.0,
    innerOpacity: 0.3,
    emissiveIntensity: 5.0,
    pulseMultiplier: 1.4,
  },
};

export type MarkerState = 'normal' | 'hover' | 'clicked';

