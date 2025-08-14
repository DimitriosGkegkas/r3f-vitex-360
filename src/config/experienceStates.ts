export interface ExperienceState {
  id: string;
  title: string;
  stepName: string;
  floor: string;
  description: string;
  keypoints: string[];
}

export const experienceStates: Record<string, ExperienceState> = {
  'raw-materials': {
    id: 'raw-materials',
    title: 'Πρώτη ύλη',
    stepName: 'Πρώτο',
    floor: '5ος',
    description: 'Dive into the dynamic realm of materials, where creativity intertwines with skill. Uncover the true spirit of craftsmanship and innovation in every facet. <br/><br/>Experience the artistry behind each design, as quality takes center stage. <br/>From sustainable resources to cutting-edge techniques, every choice reflects a commitment to excellence.',
    keypoints: [
      'Sustainable material sourcing',
      'Quality control standards',
      'Innovation in material selection',
      'Craftsmanship principles'
    ]
  },
  'sorting': {
    id: 'sorting',
    title: 'Διαλογή',
    stepName: 'Δεύτερο',
    floor: '4ος',
    description: 'Experience the precision of material sorting and classification. Every item is carefully evaluated and categorized according to strict quality standards.',
    keypoints: [
      'Material classification',
      'Quality assessment',
      'Precision sorting',
      'Standards compliance'
    ]
  },
  'quantities': {
    id: 'quantities',
    title: 'Ποσότητες',
    stepName: 'Τρίτο',
    floor: '3ος',
    description: 'Discover the science of quantity management and optimization. Learn how precise measurements and calculations ensure perfect product consistency.',
    keypoints: [
      'Quantity optimization',
      'Precise measurements',
      'Product consistency',
      'Efficiency management'
    ]
  },
  'secrets': {
    id: 'secrets',
    title: 'Μυστικά',
    stepName: 'Τέταρτο',
    floor: '2ος',
    description: 'Uncover the hidden techniques and trade secrets that make our products unique. This is where tradition meets innovation.',
    keypoints: [
      'Trade secrets',
      'Traditional techniques',
      'Innovation methods',
      'Unique processes'
    ]
  },
  'mixing': {
    id: 'mixing',
    title: 'Ανάμειξη',
    stepName: 'Πέμπτο',
    floor: '1ος',
    description: 'Witness the art of perfect blending and mixing. This is where individual components come together to create something extraordinary.',
    keypoints: [
      'Perfect blending',
      'Component integration',
      'Quality mixing',
      'Process optimization'
    ]
  },
  'packaging': {
    id: 'packaging',
    title: 'Συσκευασία',
    stepName: 'Έκτο',
    floor: 'Ισόγειο',
    description: 'Experience the final stage where products are carefully packaged and prepared for delivery. Attention to detail ensures customer satisfaction.',
    keypoints: [
      'Careful packaging',
      'Quality assurance',
      'Customer satisfaction',
      'Final inspection'
    ]
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
