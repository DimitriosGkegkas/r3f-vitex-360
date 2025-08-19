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

export interface Step {
  id: string;
  title: string;
  description: string;
  stepName: string; // πρώτο, δεύτερο, etc.
  environmentId: string; // Reference to the environment this step belongs to
}

export interface Floor {
  id: string;
  title: string;
  floorNumber: string; // 5ος, 4ος, 3ος, 2ος, 1ος, Ισόγειο
  description: string;
  steps: Step[];
  environmentId: string; // Reference to the environment for this floor
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

export const floors: Record<string, Floor> = {
  'raw-materials': {
    id: 'raw-materials',
    title: 'Πρώτη ύλη',
    floorNumber: '5ος',
    description: 'Dive into the dynamic realm of materials, where creativity intertwines with skill. Uncover the true spirit of craftsmanship and innovation in every facet. <br/><br/>Experience the artistry behind each design, as quality takes center stage. <br/>From sustainable resources to cutting-edge techniques, every choice reflects a commitment to excellence.',
    steps: [
      {
        id: 'sustainable-sourcing',
        title: 'Sustainable Material Sourcing',
        description: 'Discover how we carefully select environmentally responsible materials that meet our high quality standards while protecting our planet.',
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env'
      },
      {
        id: 'quality-control',
        title: 'Quality Control Standards',
        description: 'Learn about our rigorous testing procedures and quality assurance protocols that ensure every material meets our exacting specifications.',
        stepName: 'Δεύτερο',
        environmentId: 'raw-materials-env'
      },
      {
        id: 'innovation-selection',
        title: 'Innovation in Material Selection',
        description: 'Explore cutting-edge materials and advanced technologies that give our products their unique properties and performance.',
        stepName: 'Τρίτο',
        environmentId: 'raw-materials-env'
      },
      {
        id: 'craftsmanship-principles',
        title: 'Craftsmanship Principles',
        description: 'Understand the traditional techniques and artistic principles that guide our material selection and preparation process.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env'
      }
    ],
    environmentId: 'raw-materials-env'
  },
  'sorting': {
    id: 'sorting',
    title: 'Διαλογή',
    floorNumber: '4ος',
    description: 'Experience the precision of material sorting and classification. Every item is carefully evaluated and categorized according to strict quality standards.',
    steps: [
      {
        id: 'material-classification',
        title: 'Material Classification',
        description: 'See how we systematically categorize materials based on their properties, composition, and intended use.',
        stepName: 'Πρώτο',
        environmentId: 'sorting-env'
      },
      {
        id: 'quality-assessment',
        title: 'Quality Assessment',
        description: 'Witness our comprehensive evaluation process that ensures only the finest materials proceed to the next stage.',
        stepName: 'Δεύτερο',
        environmentId: 'sorting-env'
      },
      {
        id: 'precision-sorting',
        title: 'Precision Sorting',
        description: 'Observe the exacting standards and attention to detail that make our sorting process so effective.',
        stepName: 'Τρίτο',
        environmentId: 'sorting-env'
      },
      {
        id: 'standards-compliance',
        title: 'Standards Compliance',
        description: 'Learn about the industry standards and regulations we follow to maintain the highest quality and safety.',
        stepName: 'Τέταρτο',
        environmentId: 'sorting-env'
      }
    ],
    environmentId: 'sorting-env'
  },
  'quantities': {
    id: 'quantities',
    title: 'Ποσότητες',
    floorNumber: '3ος',
    description: 'Discover the science of quantity management and optimization. Learn how precise measurements and calculations ensure perfect product consistency.',
    steps: [
      {
        id: 'quantity-optimization',
        title: 'Quantity Optimization',
        description: 'Explore how we calculate the perfect ratios and quantities to achieve consistent product quality every time.',
        stepName: 'Πρώτο',
        environmentId: 'quantities-env'
      },
      {
        id: 'precise-measurements',
        title: 'Precise Measurements',
        description: 'Discover the advanced measuring equipment and techniques that ensure accuracy down to the smallest detail.',
        stepName: 'Δεύτερο',
        environmentId: 'quantities-env'
      },
      {
        id: 'product-consistency',
        title: 'Product Consistency',
        description: 'Learn how our quantity management systems guarantee that every batch meets the same high standards.',
        stepName: 'Τρίτο',
        environmentId: 'quantities-env'
      },
      {
        id: 'efficiency-management',
        title: 'Efficiency Management',
        description: 'See how we optimize our processes to minimize waste while maintaining the highest quality standards.',
        stepName: 'Τέταρτο',
        environmentId: 'quantities-env'
      }
    ],
    environmentId: 'quantities-env'
  },
  'secrets': {
    id: 'secrets',
    title: 'Μυστικά',
    floorNumber: '2ος',
    description: 'Uncover the hidden techniques and trade secrets that make our products unique. This is where tradition meets innovation.',
    steps: [
      {
        id: 'trade-secrets',
        title: 'Trade Secrets',
        description: 'Discover the closely guarded techniques and processes that have been perfected over generations.',
        stepName: 'Πρώτο',
        environmentId: 'secrets-env'
      },
      {
        id: 'traditional-techniques',
        title: 'Traditional Techniques',
        description: 'Learn about the time-honored methods that form the foundation of our craft and quality.',
        stepName: 'Δεύτερο',
        environmentId: 'secrets-env'
      },
      {
        id: 'innovation-methods',
        title: 'Innovation Methods',
        description: 'See how we combine traditional wisdom with modern technology to create something truly special.',
        stepName: 'Τρίτο',
        environmentId: 'secrets-env'
      },
      {
        id: 'unique-processes',
        title: 'Unique Processes',
        description: 'Explore the distinctive approaches that set our products apart from everything else in the market.',
        stepName: 'Τέταρτο',
        environmentId: 'secrets-env'
      }
    ],
    environmentId: 'secrets-env'
  },
  'mixing': {
    id: 'mixing',
    title: 'Ανάμειξη',
    floorNumber: '1ος',
    description: 'Witness the art of perfect blending and mixing. This is where individual components come together to create something extraordinary.',
    steps: [
      {
        id: 'perfect-blending',
        title: 'Perfect Blending',
        description: 'Observe the precise techniques that ensure every component is perfectly integrated for optimal results.',
        stepName: 'Πρώτο',
        environmentId: 'mixing-env'
      },
      {
        id: 'component-integration',
        title: 'Component Integration',
        description: 'Learn how we carefully combine different elements to create a harmonious and effective final product.',
        stepName: 'Δεύτερο',
        environmentId: 'mixing-env'
      },
      {
        id: 'quality-mixing',
        title: 'Quality Mixing',
        description: 'Discover the quality control measures that ensure every batch meets our exacting standards.',
        stepName: 'Τρίτο',
        environmentId: 'mixing-env'
      },
      {
        id: 'process-optimization',
        title: 'Process Optimization',
        description: 'See how we continuously improve our mixing processes for better efficiency and quality.',
        stepName: 'Τέταρτο',
        environmentId: 'mixing-env'
      }
    ],
    environmentId: 'mixing-env'
  },
  'packaging': {
    id: 'packaging',
    title: 'Συσκευασία',
    floorNumber: 'Ισόγειο',
    description: 'Experience the final stage where products are carefully packaged and prepared for delivery. Attention to detail ensures customer satisfaction.',
    steps: [
      {
        id: 'careful-packaging',
        title: 'Careful Packaging',
        description: 'Witness the meticulous attention to detail that goes into every package to ensure safe delivery.',
        stepName: 'Πρώτο',
        environmentId: 'packaging-env'
      },
      {
        id: 'quality-assurance',
        title: 'Quality Assurance',
        description: 'See our final quality checks that ensure every product meets our standards before shipping.',
        stepName: 'Δεύτερο',
        environmentId: 'packaging-env'
      },
      {
        id: 'customer-satisfaction',
        title: 'Customer Satisfaction',
        description: 'Learn how our packaging design prioritizes both protection and an excellent unboxing experience.',
        stepName: 'Τρίτο',
        environmentId: 'packaging-env'
      },
      {
        id: 'final-inspection',
        title: 'Final Inspection',
        description: 'Observe the comprehensive final review process that guarantees excellence in every detail.',
        stepName: 'Τέταρτο',
        environmentId: 'packaging-env'
      }
    ],
    environmentId: 'packaging-env'
  },
};

// Helper functions for navigating between floors
export const getFloorById = (id: string): Floor | undefined => {
  return floors[id];
};

export const getNextFloor = (currentId: string): Floor | undefined => {
  const floorOrder = [
    'raw-materials',
    'sorting', 
    'quantities',
    'secrets',
    'mixing',
    'packaging'
  ];
  
  const currentIndex = floorOrder.indexOf(currentId);
  if (currentIndex === -1 || currentIndex === floorOrder.length - 1) {
    return undefined;
  }
  
  return floors[floorOrder[currentIndex + 1]];
};

export const getPreviousFloor = (currentId: string): Floor | undefined => {
  const floorOrder = [
    'raw-materials',
    'sorting', 
    'quantities',
    'secrets',
    'mixing',
    'packaging'
  ];
  
  const currentIndex = floorOrder.indexOf(currentId);
  if (currentIndex <= 0) {
    return undefined;
  }
  
  return floors[floorOrder[currentIndex - 1]];
};

// Helper functions for navigating between steps within a floor
export const getStepById = (floorId: string, stepId: string): Step | undefined => {
  const floor = floors[floorId];
  return floor?.steps.find(step => step.id === stepId);
};

export const getNextStep = (floorId: string, currentStepId: string): Step | undefined => {
  const floor = floors[floorId];
  if (!floor) return undefined;
  
  const currentIndex = floor.steps.findIndex(step => step.id === currentStepId);
  if (currentIndex === -1 || currentIndex === floor.steps.length - 1) {
    return undefined;
  }
  
  return floor.steps[currentIndex + 1];
};

export const getPreviousStep = (floorId: string, currentStepId: string): Step | undefined => {
  const floor = floors[floorId];
  if (!floor) return undefined;
  
  const currentIndex = floor.steps.findIndex(step => step.id === currentStepId);
  if (currentIndex === -1 || currentIndex <= 0) {
    return undefined;
  }
  
  return floor.steps[currentIndex - 1];
};

// Helper functions for working with environments
export const getEnvironmentById = (id: string): Environment | undefined => {
  return environments[id];
};

export const getEnvironmentByFloorId = (floorId: string): Environment | undefined => {
  const floor = floors[floorId];
  if (!floor) return undefined;
  return environments[floor.environmentId];
};

export const getKeypointByStep = (floorId: string, stepId: string): Keypoint | undefined => {
  const floor = floors[floorId];
  if (!floor) return undefined;
  
  const environment = environments[floor.environmentId];
  if (!environment) return undefined;
  
  return environment.keypoints.find(kp => 
    kp.targetFloor === floorId && kp.targetStep === stepId
  );
};

export const getCameraPositionByStep = (floorId: string, stepId: string): { yaw: number; pitch: number; zoom: number } | undefined => {
  const keypoint = getKeypointByStep(floorId, stepId);
  if (!keypoint) return undefined;
  
  return {
    yaw: keypoint.yaw,
    pitch: keypoint.pitch,
    zoom: keypoint.zoom
  };
};

export const getEnvironmentImageByFloor = (floorId: string): string | undefined => {
  const environment = getEnvironmentByFloorId(floorId);
  return environment?.environmentImage;
};

export const getInitialCameraPositionByFloor = (floorId: string): { angle: number; yaw: number } | undefined => {
  const environment = getEnvironmentByFloorId(floorId);
  if (!environment) return undefined;
  
  return {
    angle: environment.cameraAngle,
    yaw: environment.cameraYaw
  };
};
