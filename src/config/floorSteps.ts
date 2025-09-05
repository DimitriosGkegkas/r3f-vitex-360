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

// Define all floors with their steps
export const floors: Record<string, Floor> = {
  'raw-materials': {
    id: 'raw-materials',
    title: 'Πρώτη ύλη',
    floorNumber: '5ος',
    description: 'Dive into the dynamic realm of materials, where creativity intertwines with skill. Uncover the true spirit of craftsmanship and innovation in every facet. <br/><br/>Experience the artistry behind each design, as quality takes center stage. <br/>From sustainable resources to cutting-edge techniques, every choice reflects a commitment to excellence.',
    steps: [
      {
        id: 'step_5_1',
        title: 'ΚΕΙΜΕΝΟ ΒΗΜΑ ΑΣΑΝΣΕΡ',
        description: 'Discover how we carefully select environmentally responsible materials that meet our high quality standards while protecting our planet.',
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env_5_1'
      },
      {
        id: 'info_5_1_1',
        title: 'Κείμενο Ασανσέρ',
        description: 'Μηχανισμός του Ασανσέρ.',
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env_5_1'
      },
      {
        id: 'info_5_1_2',
        title: 'Κείμενο θέα στο βάθος',
        description: 'Εδώ θα αναφερθεί ότι η Vitex αποτελεί ένα οικοσύστημα βιομηχανικών λύσεων. Στο campus φαίνονται και άλλες λύσεις/μονάδες που έχουν αναπτυχθεί, δείχνοντας το πώς λειτουργεί το σύνολο.',
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env_5_1'
      },
      {
        id: 'step_5_2',
        title: 'ΚΕΙΜΕΝΟ ΒΗΜΑ 5_2',
        description: 'Learn about our rigorous testing procedures and quality assurance protocols that ensure every material meets our exacting specifications.',
        stepName: 'Δεύτερο',
        environmentId: 'raw-materials-env_5_2'
      },
      {
        id: 'info_5_2_1',
        title: 'Κείμενο κίτρινο στο πάτωμα',
        description: 'Discover how we carefully select environmentally responsible materials that meet our high quality standards while protecting our planet.',
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env_5_2'
      },
      {
        id: 'step_5_3',
        title: 'Innovation in Material Selection',
        description: 'Explore cutting-edge materials and advanced technologies that give our products their unique properties and performance.',
        stepName: 'Τρίτο',
        environmentId: 'raw-materials-env_5_3'
      },
      {
        id: 'info_5_3_1',
        title: 'Πληροφορίες για τους σωλήνες',
        description: 'Discover how we carefully select environmentally responsible materials that meet our high quality standards while protecting our planet.',
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env_5_3'
      },
      {
        id: 'step_5_4',
        title: 'Craftsmanship Principles',
        description: 'Understand the traditional techniques and artistic principles that guide our material selection and preparation process.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_4'
      },
      {
        id: 'info_5_4_1',
        title: 'Κίτρινο',
        description: 'Understand the traditional techniques and artistic principles that guide our material selection and preparation process.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_4'
      },
      {
        id: 'info_5_4_2',
        title: 'Μηχάνημα ACΜΟΝ',
        description: 'Παρουσιάζει το μηχάνημα ACCOM. Θα εξηγηθεί η λειτουργία του και ο ρόλος του στη ροή της παραγωγής.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_4'
      },
      {
        id: 'step_5_5',
        title: 'Craftsmanship Principles',
        description: 'Understand the traditional techniques and artistic principles that guide our material selection and preparation process.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_5'
      },
      {
        id: 'info_5_5_1',
        title: 'Πράσινο',
        description: 'Η αξία των σιλό, το ύψος τους, ο ρόλος τους στη διαχείριση των πρώτων υλών.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_5'
      },
      {
        id: 'step_5_6',
        title: 'Craftsmanship Principles',
        description: 'Understand the traditional techniques and artistic principles that guide our material selection and preparation process.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_6'
      },
      {
        id: 'info_5_6_1',
        title: 'Κείμενο για θέα',
        description: 'Πληροφορίες για τη θεα πιο αναλητικά',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_6'
      },
    ],
    environmentId: 'raw-materials-env_5_1'
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
        environmentId: 'sorting-env_4_1'
      },
      // {
      //   id: 'material-classification',
      //   title: 'Material Classification',
      //   description: 'See how we systematically categorize materials based on their properties, composition, and intended use.',
      //   stepName: 'Πρώτο',
      //   environmentId: 'sorting-env_4_1'
      // },
      {
        id: 'quality-assessment',
        title: 'Quality Assessment',
        description: 'Witness our comprehensive evaluation process that ensures only the finest materials proceed to the next stage.',
        stepName: 'Δεύτερο',
        environmentId: 'sorting-env_4_1'
      },
      {
        id: 'precision-sorting',
        title: 'Precision Sorting',
        description: 'Observe the exacting standards and attention to detail that make our sorting process so effective.',
        stepName: 'Τρίτο',
        environmentId: 'sorting-env_4_1'
      },
      {
        id: 'standards-compliance',
        title: 'Standards Compliance',
        description: 'Learn about the industry standards and regulations we follow to maintain the highest quality and safety.',
        stepName: 'Τέταρτο',
        environmentId: 'sorting-env_4_1'
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
        environmentId: 'quantities-env_3_1'
      },
      {
        id: 'precise-measurements',
        title: 'Precise Measurements',
        description: 'Discover the advanced measuring equipment and techniques that ensure accuracy down to the smallest detail.',
        stepName: 'Δεύτερο',
        environmentId: 'quantities-env_3_1'
      },
      {
        id: 'product-consistency',
        title: 'Product Consistency',
        description: 'Learn how our quantity management systems guarantee that every batch meets the same high standards.',
        stepName: 'Τρίτο',
        environmentId: 'quantities-env_3_1'
      },
      {
        id: 'efficiency-management',
        title: 'Efficiency Management',
        description: 'See how we optimize our processes to minimize waste while maintaining the highest quality standards.',
        stepName: 'Τέταρτο',
        environmentId: 'quantities-env_3_1'
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
        environmentId: 'secrets-env_2_1'
      },
      {
        id: 'traditional-techniques',
        title: 'Traditional Techniques',
        description: 'Learn about the time-honored methods that form the foundation of our craft and quality.',
        stepName: 'Δεύτερο',
        environmentId: 'secrets-env_2_1'
      },
      {
        id: 'innovation-methods',
        title: 'Innovation Methods',
        description: 'See how we combine traditional wisdom with modern technology to create something truly special.',
        stepName: 'Τρίτο',
        environmentId: 'secrets-env_2_1'
      },
      {
        id: 'unique-processes',
        title: 'Unique Processes',
        description: 'Explore the distinctive approaches that set our products apart from everything else in the market.',
        stepName: 'Τέταρτο',
        environmentId: 'secrets-env_2_1'
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
        environmentId: 'mixing-env_1_1'
      },
      {
        id: 'component-integration',
        title: 'Component Integration',
        description: 'Learn how we carefully combine different elements to create a harmonious and effective final product.',
        stepName: 'Δεύτερο',
        environmentId: 'mixing-env_1_1'
      },
      {
        id: 'quality-mixing',
        title: 'Quality Mixing',
        description: 'Discover the quality control measures that ensure every batch meets our exacting standards.',
        stepName: 'Τρίτο',
        environmentId: 'mixing-env_1_1'
      },
      {
        id: 'process-optimization',
        title: 'Process Optimization',
        description: 'See how we continuously improve our mixing processes for better efficiency and quality.',
        stepName: 'Τέταρτο',
        environmentId: 'mixing-env_1_1'
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
  }
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

export const allSteps = Object.values(floors).flatMap(floor => floor.steps);