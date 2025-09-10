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
        title: 'Πέμπτος Όροφος',
        description: 'Επίπεδο φίλτρων silo.',
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env_5_1'
      },
      {
        id: 'info_5_1_1',
        title: `Αναβατόριο παραλαβής Α' υλών.`,
        description: `Αναβατόριο παραλαβής Α' υλών.`,
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
        title: 'ΒΗΜΑ 5_2',
        description: '',
        stepName: 'Δεύτερο',
        environmentId: 'raw-materials-env_5_2'
      },
      {
        id: 'info_5_2_1',
        title: 'Καπάκι επόπτευσης εσωτερικού των silo',
        description: 'Καπάκι επόπτευσης εσωτερικού των silo.',
        stepName: 'Δεύτερο',
        environmentId: 'raw-materials-env_5_2'
      },
      {
        id: 'step_5_3',
        title: 'ΒΗΜΑ 5_3',
        description: '',
        stepName: 'Τρίτο',
        environmentId: 'raw-materials-env_5_3'
      },
      {
        id: 'info_5_3_1',
        title: 'Πληροφορίες για τους σωλήνες',
        description: 'Discover how we carefully select environmentally responsible materials that meet our high quality standards while protecting our planet.',
        stepName: 'Τρίτο',
        environmentId: 'raw-materials-env_5_3'
      },
      {
        id: 'step_5_4',
        title: 'ΒΗΜΑ 5_4',
        description: '',
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
        id: 'info_5_4_1',
        title: 'Κίτρινο',
        description: 'Understand the traditional techniques and artistic principles that guide our material selection and preparation process.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_4'
      },
      {
        id: 'step_5_5',
        title: 'Craftsmanship Principles',
        description: 'Understand the traditional techniques and artistic principles that guide our material selection and preparation process.',
        stepName: 'Πέμπτο',
        environmentId: 'raw-materials-env_5_5'
      },
      {
        id: 'info_5_5_1',
        title: 'Πέμπτο',
        description: 'Η αξία των σιλό, το ύψος τους, ο ρόλος τους στη διαχείριση των πρώτων υλών.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_5'
      },
      {
        id: 'step_5_6',
        title: 'ΒΗΜΑ 5_6',
        description: '',
        stepName: 'Έκτο',
        environmentId: 'raw-materials-env_5_6'
      },
      {
        id: 'info_5_6_1',
        title: 'Κείμενο για θέα',
        description: 'η Vitex αποτελεί ένα οικοσύστημα βιομηχανικών λύσεων. Στο campus φαίνονται και άλλες λύσεις/μονάδες που έχουν αναπτυχθεί, δείχνοντας το πώς λειτουργεί το σύνολο.',
        stepName: 'Έκτο',
        environmentId: 'raw-materials-env_5_6'
      },
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
        id: 'step_4_1',
        title: 'Τέταρτος Όροφος',
        description: 'Επίπεδο τροφοδοσίας big bag station.',
        stepName: 'Πρώτο',
        environmentId: 'sorting-env_4_1'
      },
      {
        id: 'info_4_1_1',
        title: 'ΚΙΤΡΙΝΟΣ ΣΩΛΗΝΑΣ',
        description: 'See how we systematically categorize materials based on their properties, composition, and intended use.',
        stepName: 'Πρώτο',
        environmentId: 'sorting-env_4_1'
      },
      {
        id: 'step_4_2',
        title: 'ΒΗΜΑ 4_2',
        description: '',
        stepName: 'Δεύτερο',
        environmentId: 'sorting-env_4_2'
      },
      {
        id: 'info_4_2_1',
        title: 'ΚΕΙΜΕΝΟ ΓΙΑ ΤΑ ΚΙΤΡΙΝΑ ΧΩΝΙΑ',
        description: 'See how we systematically categorize materials based on their properties, composition, and intended use.',
        stepName: 'Δεύτερο',
        environmentId: 'sorting-env_4_2'
      },
      {
        id: 'step_4_3',
        title: 'ΒΗΜΑ 4_3',
        description: 'Witness our comprehensive evaluation process that ensures only the finest materials proceed to the next stage.',
        stepName: 'Τρίτο',
        environmentId: 'sorting-env_4_3'
      },
      {
        id: 'info_4_3_1',
        title: 'Καδοζυγοί',
        description: 'Οι καδοζυγοί τροφοδοτούνται μέσω κοχλιών και εδώ ζυγίζονται τα υλικά που απαιτούνται να πάνε προς ανάδευση και παραγωγή έτοιμων.',
        stepName: 'Τρίτο',
        environmentId: 'sorting-env_4_3'
      },
      {
        id: 'step_4_4',
        title: 'ΒΗΜΑ 4_4',
        description: 'Observe the exacting standards and attention to detail that make our sorting process so effective.',
        stepName: 'Τέταρτο',
        environmentId: 'sorting-env_4_4'
      },
      {
        id: 'info_4_4_1',
        title: 'ΜΗΧΑΝΗΜΑ ΓΚΡΙ ΜΙΚΡΟ',
        description: 'See how we systematically categorize materials based on their properties, composition, and intended use.',
        stepName: 'Τέταρτο',
        environmentId: 'sorting-env_4_4'
      },
      {
        id: 'info_4_4_2',
        title: 'ΜΗΧΑΝΗΜΑ ΓΚΡΙ ΜΕΓΑΛΟ',
        description: 'See how we systematically categorize materials based on their properties, composition, and intended use.',
        stepName: 'Τέταρτο',
        environmentId: 'sorting-env_4_4'
      },
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
        id: 'step_3_1',
        title: 'Τρίτος Όροφος',
        description: 'Επίπεδο προσθήκης πρόσθετων προζυγισμένων χημικών.',
        stepName: 'Πρώτο',
        environmentId: 'quantities-env_3_1'
      },
      {
        id: 'info_3_1_1',
        title: 'ΠΛΗΡΟΦΟΡΙΕΣ ΓΚΡΙ ΜΗΧΑΝΗΜΑ',
        description: 'Επεξήγηση της βασικής μίξης: φαίνονται δύο σημεία όπου «πέφτουν» τα υλικά και πού καταλήγουν για να αναμειχθούν.',
        stepName: 'Πρώτο',
        environmentId: 'quantities-env_3_1'
      },
      {
        id: 'info_3_1_2',
        title: 'ΠΛΗΡΟΦΟΡΙΕΣ ΜΠΛΕ ΧΩΝΙ',
        description: 'Οι σωλήνες μεταφέρουν τα υλικά από πάνω.',
        stepName: 'Πρώτο',
        environmentId: 'quantities-env_3_1'
      },
      {
        id: 'step_3_2',
        title: 'ΒΗΜΑ 3_2',
        description: '',
        stepName: 'Δεύτερο',
        environmentId: 'quantities-env_3_2'
      },
      {
        id: 'info_3_2_1',
        title: 'Σταθμός ρίψης προζυγισμένων πρόσθετων.',
        description: 'Εδώ ο εργαζόμενος παραγωγής του ορόφου,μέσω ενός τερματικου πάνελ ενημερώνεται για την ρίψη των προζυγισμένων που οδηγούνται προς ανάδευση.',
        stepName: 'Δεύτερο',
        environmentId: 'quantities-env_3_2'
      },
      {
        id: 'step_3_3',
        title: 'ΒΗΜΑ 3_3',
        description: '',
        stepName: 'Τρίτο',
        environmentId: 'quantities-env_3_3'
      },
      {
        id: 'info_3_3_1',
        title: 'Σταθμός ρίψης προζυγισμένων πρόσθετων.',
        description: 'Εδώ ο εργαζόμενος παραγωγής του ορόφου,μέσω ενός τερματικου πάνελ ενημερώνεται για την ρίψη των προζυγισμένων που οδηγούνται προς ανάδευση.',
        stepName: 'Τρίτο',
        environmentId: 'quantities-env_3_3'
      },
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
        id: 'step_2_1',
        title: 'Δεύτερος Όροφος',
        description: 'Επίπεδο mixer',
        stepName: 'Πρώτο',
        environmentId: 'secrets-env_2_1'
      },
      {
        id: 'info_2_1_1',
        title: 'Mixer ανάδευσης',
        description: 'Mixer ανάδευσης ημιέτοιμων,εδώ γίνεται η ανάμιξη των ξηρών κονιαμάτων,σε οριζόντια θέση και με ταχύτητα περιστροφής 50hz.',
        stepName: 'Πρώτο',
        environmentId: 'secrets-env_2_1'
      },
      {
        id: 'step_2_2',
        title: 'ΒΗΜΑ 2_2',
        description: '',
        stepName: 'Δεύτερο',
        environmentId: 'secrets-env_2_2'
      },
      {
        id: 'info_2_2_1',
        title: 'Σταθμός αποκονίωσης.',
        description: 'Learn about the time-honored methods that form the foundation of our craft and quality.',
        stepName: 'Δεύτερο',
        environmentId: 'secrets-env_2_2'
      },
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
        id: 'step_1_1',
        title: 'Πρώτος Όροφος',
        description: 'Σε αυτόν τον όροφο βρίσκονται τα blower τών συσκευαστικών,τα buffer ετοίμων προς συσκευασία.',
        stepName: 'Πρώτο',
        environmentId: 'mixing-env_1_1'
      },
      {
        id: 'info_1_1_1',
        title: 'Blower αερομεταφοράς συσκευαστικής.',
        description: 'Μπλε μηχάνημα/στοιχείο, το οποίο πρέπει να εξηγηθεί (π.χ. ρόλος στη διαδικασία, γιατί είναι σημαντικό).',
        stepName: 'Πρώτο',
        environmentId: 'mixing-env_1_1'
      },
      {
        id: 'info_1_1_2',
        title: 'Buffer γραμμών παραγωγής',
        description: 'Buffer γραμμών παραγωγής,εδώ καταλήγει το έτοιμο προιόν για τις δύο γραμμές παραγωγής,πριν την τελική συσκευασία.',
        stepName: 'Πρώτο',
        environmentId: 'mixing-env_1_1'
      },
      {
        id: 'step_1_2',
        title: 'Ανακύκλωση',
        description: '',
        stepName: 'Δεύτερο',
        environmentId: 'mixing-env_1_2'
      },
      {
        id: 'info_1_2_1',
        title: 'Αποκονίωση εγκατάστασης',
        description: 'Αποκονίωση εγκατάστασης.Εδώ συλλέγονται όλα τα παραγωγά τριβής των υλικών αλλά και αιωρούμενα σωματιδία που συλλέγει το σύστημα αποκονίωσης της εγκατάστασης,αυτά μέσω ενός συστήματος αερομεταφράς και με την βοήθεια αεροφράχτη συλλέγονται σε μεγάσακους με σκοπό την ανακύκλωση και χρήση τους στην παραγωγή εκ νέου.',
        stepName: 'Δεύτερο',
        environmentId: 'mixing-env_1_2'
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
        id: 'step_0_1',
        title: 'Ισόγειο',
        description: 'Χωρος συσκευασίας,αποθήκευσης,και παλετοποίησης ετοίμων.',
        stepName: 'Πρώτο',
        environmentId: 'packaging-env_0_1'
      },
      {
        id: 'info_0_1_3',
        title: 'Αποθήκη',
        description: 'Παλετοθέσεις αποθήκευσης αναλώσιμων και Α υλών.',
        stepName: 'Πρώτο',
        environmentId: 'packaging-env_0_1'
      },
      {
        id: 'info_0_1_1',
        title: 'Χώρος γραφείων.',
        description: 'Στο κτήριο εντός του επιπέδου της συσκευασίας(ισόγειο)στεγάζεται το control room,το meeting room,το δωμάτιο πινάκων των γραφείων,το γραφείο εργασίας του τμήματος ΙΤ,το εργαστήριο ποιοτικού ελέγχου,και το γραφείο κίνησης.',
        stepName: 'Πρώτο',
        environmentId: 'packaging-env_0_1'
      },
      {
        id: 'info_0_1_2',
        title: 'Παλετοποίηση',
        description: 'Ταινιόδρομος μεταφοράς ετοίμων προ παλετοποίηση.',
        stepName: 'Πρώτο',
        environmentId: 'packaging-env_0_1'
      },
      {
        id: 'step_0_2',
        title: 'Παλετοποίηση',
        description: 'Εισαγωγή παλέτων προς τύλιξη.',
        stepName: 'Δεύτερο',
        environmentId: 'packaging-env_0_2'
      },
      {
        id: 'step_0_2_vid',
        title: 'BINTEO 360',
        description: 'Εισαγωγή παλέτων προς τύλιξη.',
        stepName: 'Δεύτερο',
        environmentId: 'packaging-env_0_2_video'
      },
      {
        id: 'step_0_3',
        title: 'Μηχάνημα συσκευασίας',
        description: '',
        stepName: 'Τρίτο',
        environmentId: 'packaging-env_0_3'
      },
      {
        id: 'step_0_3_1_vid',
        title: 'Μηχάνημα συσκευασίας',
        description: 'Το πιο εντυπωσιακό μηχάνημα, όπου γίνεται η συσκευασία. Παρουσίαση με λεπτομέρειες της διαδικασίας.',
        stepName: 'Τρίτο',
        environmentId: 'packaging-env_0_3_1_video'
      },
      {
        id: 'step_0_3_vid',
        title: 'Συσκευαστική ξηρού κονιάματος',
        description: 'Συσκευαστική ξηρού κονιάματος.Συσκευασία τελικού προιόντος,με χρήση αερομεταφοράς.Για την συσκευασία του τελικού προιόντος ένας ρομποτικός βραχίονας(αρπάγη),πιάνει τους χαρτόσακους έναν έναν και ανοίγει την βαλβίδα τους ώστε να την εφαρμόσει στην παροχή της συσκευαστικής,ώστε να γίνει η πλήρωση των σάκων με την χρήση αερομεταφοράς.',
        stepName: 'Τρίτο',
        environmentId: 'packaging-env_0_3_video'
      },
      {
        id: 'step_0_4',
        title: 'Εξωτερικός χώρος',
        description: '',
        stepName: 'Τέταρτο',
        environmentId: 'packaging-env_0_4'
      },
      {
        id: 'info_0_4_1',
        title: 'Εξω πληροφορίες',
        description: 'Δίνει θέα προς τα έξω με πανοραμική εικόνα του εργοστασίου και του περιβάλλοντος χώρου.',
        stepName: 'Τέταρτο',
        environmentId: 'packaging-env_0_4'
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