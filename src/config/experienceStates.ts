export interface Keypoint {
  id: string;
  title: string;
  description: string;
  yaw: number; // Yaw angle in degrees (0 = north, 90 = east, 180 = south, 270 = west)
  pitch: number; // Pitch angle in degrees (0 = horizon, positive = look up, negative = look down)
  zoom: number; // Distance from camera (1 = unit distance, larger = further away)
}

export interface ExperienceState {
  id: string;
  title: string;
  stepName: string;
  floor: string;
  description: string;
  keypoints: Keypoint[];
  environmentImage: string; // URL to base folder containing px, nx, py, ny, pz, nz images
  cameraAngle: number; // Initial camera angle in degrees (0 = straight ahead, positive = look up, negative = look down)
  cameraYaw: number; // Initial camera yaw in degrees (0 = north, 90 = east, 180 = south, 270 = west)
}

export const experienceStates: Record<string, ExperienceState> = {
  'raw-materials': {
    id: 'raw-materials',
    title: 'Πρώτη ύλη',
    stepName: 'Πρώτο',
    floor: '5ος',
    description: 'Dive into the dynamic realm of materials, where creativity intertwines with skill. Uncover the true spirit of craftsmanship and innovation in every facet. <br/><br/>Experience the artistry behind each design, as quality takes center stage. <br/>From sustainable resources to cutting-edge techniques, every choice reflects a commitment to excellence.',
    keypoints: [
      {
        id: 'sustainable-sourcing',
        title: 'Sustainable Material Sourcing',
        description: 'Discover how we carefully select environmentally responsible materials that meet our high quality standards while protecting our planet.',
        yaw: 178,
        pitch: 6,
        zoom: 2
      },
      {
        id: 'quality-control',
        title: 'Quality Control Standards',
        description: 'Learn about our rigorous testing procedures and quality assurance protocols that ensure every material meets our exacting specifications.',
        yaw: 135,
        pitch: -10,
        zoom: 1.0
      },
      {
        id: 'innovation-selection',
        title: 'Innovation in Material Selection',
        description: 'Explore cutting-edge materials and advanced technologies that give our products their unique properties and performance.',
        yaw: 225,
        pitch: 20,
        zoom: 1.5
      },
      {
        id: 'craftsmanship-principles',
        title: 'Craftsmanship Principles',
        description: 'Understand the traditional techniques and artistic principles that guide our material selection and preparation process.',
        yaw: 315,
        pitch: 5,
        zoom: 0.8
      }
    ],
    environmentImage: '/cubemap/raw-materials',
    cameraAngle: 0,
    cameraYaw: 0,
  },
  'sorting': {
    id: 'sorting',
    title: 'Διαλογή',
    stepName: 'Δεύτερο',
    floor: '4ος',
    description: 'Experience the precision of material sorting and classification. Every item is carefully evaluated and categorized according to strict quality standards.',
    keypoints: [
      {
        id: 'material-classification',
        title: 'Material Classification',
        description: 'See how we systematically categorize materials based on their properties, composition, and intended use.',
        yaw: 60,
        pitch: 25,
        zoom: 1.1
      },
      {
        id: 'quality-assessment',
        title: 'Quality Assessment',
        description: 'Witness our comprehensive evaluation process that ensures only the finest materials proceed to the next stage.',
        yaw: 150,
        pitch: -15,
        zoom: 0.9
      },
      {
        id: 'precision-sorting',
        title: 'Precision Sorting',
        description: 'Observe the exacting standards and attention to detail that make our sorting process so effective.',
        yaw: 240,
        pitch: 10,
        zoom: 1.3
      },
      {
        id: 'standards-compliance',
        title: 'Standards Compliance',
        description: 'Learn about the industry standards and regulations we follow to maintain the highest quality and safety.',
        yaw: 330,
        pitch: 0,
        zoom: 1.0
      }
    ],
    environmentImage: '/cubemap/sorting',
    cameraAngle: 0,
    cameraYaw: 50,
  },
  'quantities': {
    id: 'quantities',
    title: 'Ποσότητες',
    stepName: 'Τρίτο',
    floor: '3ος',
    description: 'Discover the science of quantity management and optimization. Learn how precise measurements and calculations ensure perfect product consistency.',
    keypoints: [
      {
        id: 'quantity-optimization',
        title: 'Quantity Optimization',
        description: 'Explore how we calculate the perfect ratios and quantities to achieve consistent product quality every time.',
        yaw: 75,
        pitch: 30,
        zoom: 1.2
      },
      {
        id: 'precise-measurements',
        title: 'Precise Measurements',
        description: 'Discover the advanced measuring equipment and techniques that ensure accuracy down to the smallest detail.',
        yaw: 165,
        pitch: -20,
        zoom: 0.8
      },
      {
        id: 'product-consistency',
        title: 'Product Consistency',
        description: 'Learn how our quantity management systems guarantee that every batch meets the same high standards.',
        yaw: 255,
        pitch: 15,
        zoom: 1.4
      },
      {
        id: 'efficiency-management',
        title: 'Efficiency Management',
        description: 'See how we optimize our processes to minimize waste while maintaining the highest quality standards.',
        yaw: 345,
        pitch: 5,
        zoom: 1.0
      }
    ],
    environmentImage: '/cubemap/quantities',
    cameraAngle: 0,
    cameraYaw: 100,
  },
  'secrets': {
    id: 'secrets',
    title: 'Μυστικά',
    stepName: 'Τέταρτο',
    floor: '2ος',
    description: 'Uncover the hidden techniques and trade secrets that make our products unique. This is where tradition meets innovation.',
    keypoints: [
      {
        id: 'trade-secrets',
        title: 'Trade Secrets',
        description: 'Discover the closely guarded techniques and processes that have been perfected over generations.',
        yaw: 90,
        pitch: 35,
        zoom: 1.1
      },
      {
        id: 'traditional-techniques',
        title: 'Traditional Techniques',
        description: 'Learn about the time-honored methods that form the foundation of our craft and quality.',
        yaw: 180,
        pitch: -25,
        zoom: 0.9
      },
      {
        id: 'innovation-methods',
        title: 'Innovation Methods',
        description: 'See how we combine traditional wisdom with modern technology to create something truly special.',
        yaw: 270,
        pitch: 20,
        zoom: 1.3
      },
      {
        id: 'unique-processes',
        title: 'Unique Processes',
        description: 'Explore the distinctive approaches that set our products apart from everything else in the market.',
        yaw: 0,
        pitch: 10,
        zoom: 1.0
      }
    ],
    environmentImage: '/cubemap/secrets',
    cameraAngle: 0,
    cameraYaw: 150,
  },
  'mixing': {
    id: 'mixing',
    title: 'Ανάμειξη',
    stepName: 'Πέμπτο',
    floor: '1ος',
    description: 'Witness the art of perfect blending and mixing. This is where individual components come together to create something extraordinary.',
    keypoints: [
      {
        id: 'perfect-blending',
        title: 'Perfect Blending',
        description: 'Observe the precise techniques that ensure every component is perfectly integrated for optimal results.',
        yaw: 105,
        pitch: 40,
        zoom: 1.2
      },
      {
        id: 'component-integration',
        title: 'Component Integration',
        description: 'Learn how we carefully combine different elements to create a harmonious and effective final product.',
        yaw: 195,
        pitch: -30,
        zoom: 0.8
      },
      {
        id: 'quality-mixing',
        title: 'Quality Mixing',
        description: 'Discover the quality control measures that ensure every batch meets our exacting standards.',
        yaw: 285,
        pitch: 25,
        zoom: 1.4
      },
      {
        id: 'process-optimization',
        title: 'Process Optimization',
        description: 'See how we continuously improve our mixing processes for better efficiency and quality.',
        yaw: 15,
        pitch: 15,
        zoom: 1.0
      }
    ],
    environmentImage: '/cubemap/mixing',
    cameraAngle: 0,
    cameraYaw: 200,
  },
  'packaging': {
    id: 'packaging',
    title: 'Συσκευασία',
    stepName: 'Έκτο',
    floor: 'Ισόγειο',
    description: 'Experience the final stage where products are carefully packaged and prepared for delivery. Attention to detail ensures customer satisfaction.',
    keypoints: [
      {
        id: 'careful-packaging',
        title: 'Careful Packaging',
        description: 'Witness the meticulous attention to detail that goes into every package to ensure safe delivery.',
        yaw: 120,
        pitch: 45,
        zoom: 1.1
      },
      {
        id: 'quality-assurance',
        title: 'Quality Assurance',
        description: 'See our final quality checks that ensure every product meets our standards before shipping.',
        yaw: 210,
        pitch: -35,
        zoom: 0.9
      },
      {
        id: 'customer-satisfaction',
        title: 'Customer Satisfaction',
        description: 'Learn how our packaging design prioritizes both protection and an excellent unboxing experience.',
        yaw: 300,
        pitch: 30,
        zoom: 1.3
      },
      {
        id: 'final-inspection',
        title: 'Final Inspection',
        description: 'Observe the comprehensive final review process that guarantees excellence in every detail.',
        yaw: 30,
        pitch: 20,
        zoom: 1.0
      }
    ],
    environmentImage: '/cubemap/packaging',
    cameraAngle: 0,
    cameraYaw: 250,
  },
};

export const getStateById = (id: string): ExperienceState | undefined => {
  return experienceStates[id];
};

export const getNextState = (currentId: string): ExperienceState | undefined => {
  const stateOrder = [
    'raw-materials',
    'sorting', 
    'quantities',
    'secrets',
    'mixing',
    'packaging'
  ];
  
  const currentIndex = stateOrder.indexOf(currentId);
  if (currentIndex === -1 || currentIndex === stateOrder.length - 1) {
    return undefined;
  }
  
  return experienceStates[stateOrder[currentIndex + 1]];
};

export const getPreviousState = (currentId: string): ExperienceState | undefined => {
  const stateOrder = [
    'raw-materials',
    'sorting', 
    'quantities',
    'secrets',
    'mixing',
    'packaging'
  ];
  
  const currentIndex = stateOrder.indexOf(currentId);
  if (currentIndex <= 0) {
    return undefined;
  }
  
  return experienceStates[stateOrder[currentIndex - 1]];
};
