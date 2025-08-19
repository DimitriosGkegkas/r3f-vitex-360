export interface Keypoint {
  id: string;
  yaw: number; // Yaw angle in degrees (0 = north, 90 = east, 180 = south, 270 = west)
  pitch: number; // Pitch angle in degrees (0 = horizon, positive = look up, negative = look down)
  zoom: number; // Distance from camera (1 = unit distance, larger = further away)
  targetFloor: string; // Reference to the floor this keypoint belongs to
  targetStep: string; // Reference to the step this keypoint belongs to
  title: string;
}

export interface Environment {
  id: string;
  environmentImage: string; // URL to base folder containing px, nx, py, ny, pz, nz images
  keypoints: Keypoint[];
  cameraAngle: number; // Initial camera angle in degrees (0 = straight ahead, positive = look up, negative = look down)
  cameraYaw: number; // Initial camera yaw in degrees (0 = north, 90 = east, 180 = south, 270 = west)
}

// Define all environments with their keypoints
export const environments: Record<string, Environment> = {
  'raw-materials-env': {
    id: 'raw-materials-env',
    environmentImage: '/cubemap/raw-materials',
    cameraAngle: 0,
    cameraYaw: 0,
    keypoints: [
      {
        id: 'sustainable-sourcing-kp',
        yaw: 178,
        pitch: 6,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'sustainable-sourcing',
        title: 'Sustainable Sourcing'
      },
      {
        id: 'quality-control-kp',
        yaw: 135,
        pitch: -10,
        zoom: 1.0,
        targetFloor: 'raw-materials',
        targetStep: 'quality-control',
        title: 'Quality Control'
      },
      {
        id: 'innovation-selection-kp',
        yaw: 225,
        pitch: 20,
        zoom: 1.5,
        targetFloor: 'raw-materials',
        targetStep: 'innovation-selection',
        title: 'Innovation Selection'
      },
      {
        id: 'craftsmanship-principles-kp',
        yaw: 315,
        pitch: 5,
        zoom: 0.8,
        targetFloor: 'raw-materials',
        targetStep: 'craftsmanship-principles',
        title: 'Craftsmanship Principles'
      }
    ]
  },
  'sorting-env': {
    id: 'sorting-env',
    environmentImage: '/cubemap/sorting',
    cameraAngle: 0,
    cameraYaw: 50,
    keypoints: [
      {
        id: 'material-classification-kp',
        yaw: 60,
        pitch: 25,
        zoom: 1.1,
        targetFloor: 'sorting',
        targetStep: 'material-classification',
        title: 'Material Classification'
      },
      {
        id: 'quality-assessment-kp',
        yaw: 150,
        pitch: -15,
        zoom: 0.9,
        targetFloor: 'sorting',
        targetStep: 'quality-assessment',
        title: 'Quality Assessment'
      },
      {
        id: 'precision-sorting-kp',
        yaw: 240,
        pitch: 10,
        zoom: 1.3,
        targetFloor: 'sorting',
        targetStep: 'precision-sorting',
        title: 'Precision Sorting'
      },
      {
        id: 'standards-compliance-kp',
        yaw: 330,
        pitch: 0,
        zoom: 1.0,
        targetFloor: 'sorting',
        targetStep: 'standards-compliance',
        title: 'Standards Compliance'
      }
    ]
  },
  'quantities-env': {
    id: 'quantities-env',
    environmentImage: '/cubemap/quantities',
    cameraAngle: 0,
    cameraYaw: 100,
    keypoints: [
      {
        id: 'quantity-optimization-kp',
        yaw: 75,
        pitch: 30,
        zoom: 1.2,
        targetFloor: 'quantities',
        targetStep: 'quantity-optimization',
        title: 'Quantity Optimization'
      },
      {
        id: 'precise-measurements-kp',
        yaw: 165,
        pitch: -20,
        zoom: 0.8,
        targetFloor: 'quantities',
        targetStep: 'precise-measurements',
        title: 'Precise Measurements'
      },
      {
        id: 'product-consistency-kp',
        yaw: 255,
        pitch: 15,
        zoom: 1.4,
        targetFloor: 'quantities',
        targetStep: 'product-consistency',
        title: 'Product Consistency'
      },
      {
        id: 'efficiency-management-kp',
        yaw: 345,
        pitch: 5,
        zoom: 1.0,
        targetFloor: 'quantities',
        targetStep: 'efficiency-management',
        title: 'Efficiency Management'
      }
    ]
  },
  'secrets-env': {
    id: 'secrets-env',
    environmentImage: '/cubemap/secrets',
    cameraAngle: 0,
    cameraYaw: 150,
    keypoints: [
      {
        id: 'trade-secrets-kp',
        yaw: 90,
        pitch: 35,
        zoom: 1.1,
        targetFloor: 'secrets',
        targetStep: 'trade-secrets',
        title: 'Trade Secrets'
      },
      {
        id: 'traditional-techniques-kp',
        yaw: 180,
        pitch: -25,
        zoom: 0.9,
        targetFloor: 'secrets',
        targetStep: 'traditional-techniques',
        title: 'Traditional Techniques'
      },
      {
        id: 'innovation-methods-kp',
        yaw: 270,
        pitch: 20,
        zoom: 1.3,
        targetFloor: 'secrets',
        targetStep: 'innovation-methods',
        title: 'Innovation Methods'
      },
      {
        id: 'unique-processes-kp',
        yaw: 0,
        pitch: 10,
        zoom: 1.0,
        targetFloor: 'secrets',
        targetStep: 'unique-processes',
        title: 'Unique Processes'
      }
    ]
  },
  'mixing-env': {
    id: 'mixing-env',
    environmentImage: '/cubemap/mixing',
    cameraAngle: 0,
    cameraYaw: 200,
    keypoints: [
      {
        id: 'perfect-blending-kp',
        yaw: 105,
        pitch: 40,
        zoom: 1.2,
        targetFloor: 'mixing',
        targetStep: 'perfect-blending',
        title: 'Perfect Blending'
      },
      {
        id: 'component-integration-kp',
        yaw: 195,
        pitch: -30,
        zoom: 0.8,
        targetFloor: 'mixing',
        targetStep: 'component-integration',
        title: 'Component Integration'
      },
      {
        id: 'quality-mixing-kp',
        yaw: 285,
        pitch: 25,
        zoom: 1.4,
        targetFloor: 'mixing',
        targetStep: 'quality-mixing',
        title: 'Quality Mixing'
      },
      {
        id: 'process-optimization-kp',
        yaw: 15,
        pitch: 15,
        zoom: 1.0,
        targetFloor: 'mixing',
        targetStep: 'process-optimization',
        title: 'Process Optimization'
      }
    ]
  },
  'packaging-env': {
    id: 'packaging-env',
    environmentImage: '/cubemap/packaging',
    cameraAngle: 0,
    cameraYaw: 250,
    keypoints: [
      {
        id: 'careful-packaging-kp',
        yaw: 120,
        pitch: 45,
        zoom: 1.1,
        targetFloor: 'packaging',
        targetStep: 'careful-packaging',
        title: 'Careful Packaging'
      },
      {
        id: 'quality-assurance-kp',
        yaw: 210,
        pitch: -35,
        zoom: 0.9,
        targetFloor: 'packaging',
        targetStep: 'quality-assurance',
        title: 'Quality Assurance'
      },
      {
        id: 'customer-satisfaction-kp',
        yaw: 300,
        pitch: 30,
        zoom: 1.3,
        targetFloor: 'packaging',
        targetStep: 'customer-satisfaction',
        title: 'Customer Satisfaction'
      },
      {
        id: 'final-inspection-kp',
        yaw: 30,
        pitch: 20,
        zoom: 1.0,
        targetFloor: 'packaging',
        targetStep: 'final-inspection',
        title: 'Final Inspection'
      }
    ]
  }
};

// Helper functions for working with environments
export const getEnvironmentById = (id: string): Environment | undefined => {
  return environments[id];
};

export const getKeypointByStep = (floorId: string, stepId: string): Keypoint | undefined => {
  // This function requires access to floors data, so it's kept in the main config file
  // but we can provide a basic version here for environment-specific operations
  for (const environment of Object.values(environments)) {
    const keypoint = environment.keypoints.find(kp => 
      kp.targetFloor === floorId && kp.targetStep === stepId
    );
    if (keypoint) return keypoint;
  }
  return undefined;
};
