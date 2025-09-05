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
  // raw materials level 
  'raw-materials-env_5_1': {
    id: 'raw-materials-env_5_1',
    environmentImage: '/cubemap/raw-materials/5_1',
    cameraAngle: -20,
    cameraYaw: 30,
    keypoints: [
      {
        id: 'step_5_2-kp',
        yaw: -50,
        pitch: -45,
        zoom: 1.0,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_2',
        title: 'Μετάβαση στα σιλό'
      },
      {
        id: 'info_5_1_1-kp',
        yaw: 70,
        pitch: -10,
        zoom: 1.5,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_1_1',
        title: 'Ασανσέρ'
      },
      {
        id: 'info_5_1_2_kp',
        yaw: 180,
        pitch: 0,
        zoom: 1,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_1_2',
        title: 'θέα στο βάθος'
      },
    ]
  },
  'raw-materials-env_5_2': {
    id: 'raw-materials-env_5_2',
    environmentImage: '/cubemap/raw-materials/5_2',
    cameraAngle: 0,
    cameraYaw: 210,
    keypoints: [
      {
        id: 'step_5_6_kp',
        yaw: 40,
        pitch: -10,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_6',
        title: 'Μετάβαση στα σιλό'
      },
      {
        id: 'step_5_3_kp',
        yaw: 55,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_3',
        title: 'Μετάβαση στους σωλήνες'
      },
      {
        id: 'info_5_2_1_kp',
        yaw: 0,
        pitch: -30,
        zoom: 1.5,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_2_1',
        title: 'Πληροφορίες για το κίτρινο'
      },
    ]
  },
  'raw-materials-env_5_3': {
    id: 'raw-materials-env_5_3',
    environmentImage: '/cubemap/raw-materials/5_3',
    cameraAngle: 0,
    cameraYaw: 0,
    keypoints: [
      {
        id: 'step_5_2_kp',
        yaw: 195,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_2',
        title: 'Μετάβαση στο πίσω/5_2'
      },
      {
        id: 'step_5_4_kp',
        yaw: 175,
        pitch: -10,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_4',
        title: 'Μετάβαση στο επόμενο/5_4'
      },
      {
        id: 'info_5_3_1',
        yaw: 140,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_3_1',
        title: 'Πληροφορίες για τους σωλήνες'
      },

    ]
  },
  'raw-materials-env_5_4': {
    id: 'raw-materials-env_5_4',
    environmentImage: '/cubemap/raw-materials/5_4',
    cameraAngle: 0,
    cameraYaw: 0,
    keypoints: [
      {
        id: 'step_5_1_kp',
        yaw: 125,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_1',
        title: 'Μετάβαση στο προηγούμενο/5_1'
      },
      {
        id: 'step_5_3_kp',
        yaw: 205,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_3',
        title: 'Μετάβαση στις σωλήνες'
      },
      {
        id: 'step_5_5_kp',
        yaw: 140,
        pitch: -20,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_5',
        title: 'Μετάβαση στο επόμενο/5_5'
      },
      {
        id: 'info_5_4_1_kp',
        yaw: 102,
        pitch: -38,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_4_1',
        title: 'Κίτρινο'
      },
      {
        id: 'info_5_4_2_kp',
        yaw: -15,
        pitch: 0,
        zoom: 1,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_4_2',
        title: 'Μηχάνημα ACΜΟΝ'
      },
    ]
  },
  'raw-materials-env_5_5': {
    id: 'raw-materials-env_5_5',
    environmentImage: '/cubemap/raw-materials/5_5',
    cameraAngle: 0,
    cameraYaw: 0,
    keypoints: [
      {
        id: 'step_5_4_kp',
        yaw: -20,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_4',
        title: 'Μετάβαση στο προηγούμενο/5_4'
      },
      {
        id: 'step_5_6_kp',
        yaw: 150,
        pitch: 25,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_6',
        title: 'Μετάβαση στο προηγούμενο/5_6'
      },
      {
        id: 'info_5_5_1kp',
        yaw: 75,
        pitch: 30,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_5_1',
        title: 'Πληροφορίες για το πράσινο'
      },

    ]
  },
  'raw-materials-env_5_6': {
    id: 'raw-materials-env_5_6',
    environmentImage: '/cubemap/raw-materials/5_6',
    cameraAngle: 0,
    cameraYaw: 0,
    keypoints: [
      {
        id: 'step_5_4_kp',
        yaw: 180,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_4',
        title: 'Μετάβαση στο 5_4'
      },
      {
        id: 'step_5_5_kp',
        yaw: 180,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_5',
        title: 'Μετάβαση στο 5_5'
      },
      {
        id: 'info_5_1_2_kp',
        yaw: 180,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_1_2',
        title: 'Θέα στο βάθος'
      },
    ]
  },
  // raw materials level 
  // ------------
  // sorting level
  'sorting-env_4_1': {
    id: 'sorting-env_4_1',
    environmentImage: '/cubemap/sorting/4_1',
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
    ]
  },
  'sorting-env_4_2': {
    id: 'sorting-env_4_2',
    environmentImage: '/cubemap/sorting/4_2',
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
      }
    ]
  },
  'sorting-env_4_3': {
    id: 'sorting-env_4_3',
    environmentImage: '/cubemap/sorting/4_3',
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
    ]
  },
  'sorting-env_4_4': {
    id: 'sorting-env_4_4',
    environmentImage: '/cubemap/sorting/4_4',
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
      }
    ]
  },
  // sorting level
  // ------------
  // quantities env
  'quantities-env_3_1': {
    id: 'quantities-env_3_1',
    environmentImage: '/cubemap/quantities/3_2',
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
  'quantities-env_3_2': {
    id: 'quantities-env_3_2',
    environmentImage: '/cubemap/quantities/3_2',
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
    ]
  },
  'quantities-env_3_3': {
    id: 'quantities-env_3_3',
    environmentImage: '/cubemap/quantities/3_3',
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
    ]
  },
  // quantities env
  // ------------
  // secrets env
  'secrets-env_2_1': {
    id: 'secrets-env_2_1',
    environmentImage: '/cubemap/secrets/2_1',
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
  'secrets-env_2_2': {
    id: 'secrets-env_2_2',
    environmentImage: '/cubemap/secrets/2_2',
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
    ]
  },

  // secrets env
  // ------------
  // mixing level
  'mixing-env_1_1': {
    id: 'mixing-env_1_1',
    environmentImage: '/cubemap/mixing/1_1',
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
  'mixing-env_1_2': {
    id: 'mixing-env_1_2',
    environmentImage: '/cubemap/mixing/1_2',
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
    ]
  },
  // mixing level
  // ------------
  // packaging level
  'packaging-env_0_1': {
    id: 'packaging-env_0_1',
    environmentImage: '/cubemap/packaging/0_1',
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
  },
  'packaging-env_0_2': {
    id: 'packaging-env_0_2',
    environmentImage: '/cubemap/packaging/0_2',
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
    ]
  },
  'packaging-env_0_3': {
    id: 'packaging-env_0_3',
    environmentImage: '/cubemap/packaging/0_3',
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

    ]
  },
  'packaging-env_0_4': {
    id: 'packaging-env_0_4',
    environmentImage: '/cubemap/packaging/0_4',
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