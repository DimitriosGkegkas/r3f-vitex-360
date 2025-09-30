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
    cameraAngle: 10,
    cameraYaw: 80,
    keypoints: [
      {
        id: 'info_5_1_1-kp',
        yaw: 70,
        pitch: 0,
        zoom: 1.8,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_1_1',
        title: `Αναβατόριο παραλαβής Α' υλών`
      },
      {
        id: 'step_5_2-kp',
        yaw: -55,
        pitch: -50,
        zoom: 1.0,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_2_1',
        title: 'Μετάβαση κάτω'
      },
      // {
      //   id: 'info_5_1_2_kp',
      //   yaw: 180,
      //   pitch: 0,
      //   zoom: 2.3,
      //   targetFloor: 'raw-materials',
      //   targetStep: 'info_5_1_2',
      //   title: 'θέα στο βάθος'
      // },
    ]
  },
  'raw-materials-env_5_2': {
    id: 'raw-materials-env_5_2',
    environmentImage: '/cubemap/raw-materials/5_2',
    cameraAngle: -10,
    cameraYaw: 30,
    keypoints: [
      {
        id: 'step_5_6_kp',
        yaw: 25,
        pitch: -17,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_6_1',
        title: 'Μετάβαση στα σιλό'
      },
      {
        id: 'step_5_3_kp',
        yaw: 57,
        pitch: -10,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_3_1',
        title: 'Μετάβαση στους σωλήνες'
      },
      {
        id: 'info_5_2_1_kp',
        yaw: 0,
        pitch: -30,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_2_1',
        title: 'Καπάκι επιθεώρησης'
      },
    ]
  },
  'raw-materials-env_5_3': {
    id: 'raw-materials-env_5_3',
    environmentImage: '/cubemap/raw-materials/5_3',
    cameraAngle: -10,
    cameraYaw: 120,
    keypoints: [
      {
        id: 'step_5_2_kp',
        yaw: 190,
        pitch: -30,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_2_1',
        title: 'Επιστροφή'
      },
      {
        id: 'step_5_4_kp',
        yaw: 175,
        pitch: -20,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_4_2',
        title: 'Επόμενο'
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
    cameraAngle: 10,
    cameraYaw: -15,
    keypoints: [
      {
        id: 'step_5_1_kp',
        yaw: 120,
        pitch: -10,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'step_5_1',
        title: 'Μετάβαση στο αναβατόριο'
      },
      {
        id: 'step_5_3_kp',
        yaw: 205,
        pitch: -20,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_3_1',
        title: 'Μετάβαση στους σωλήνες'
      },
      {
        id: 'step_5_5_kp',
        yaw: 140,
        pitch: -20,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_5_1',
        title: 'Μετάβαση στα silo'
      },
      // {
      //   id: 'info_5_4_1_kp',
      //   yaw: 102,
      //   pitch: -38,
      //   zoom: 2,
      //   targetFloor: 'raw-materials',
      //   targetStep: 'info_5_4_1',
      //   title: 'Κίτρινο'
      // },
      {
        id: 'info_5_4_2_kp',
        yaw: -15,
        pitch: 0,
        zoom: 1.5,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_4_2',
        title: 'Φίλτρα συστήματος αποκονίωσης'
      },
    ]
  },
  'raw-materials-env_5_5': {
    id: 'raw-materials-env_5_5',
    environmentImage: '/cubemap/raw-materials/5_5',
    cameraAngle: 10,
    cameraYaw: 140,
    keypoints: [
      {
        id: 'step_5_4_kp',
        yaw: -20,
        pitch: -15,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_4_2',
        title: 'Επιστροφή'
      },
      {
        id: 'step_5_6_kp',
        yaw: 147,
        pitch: -25,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_6_1',
        title: 'Επόμενο'
      },
      {
        id: 'info_5_5_1kp',
        yaw: 75,
        pitch: 30,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_5_1',
        title: 'Silo. Aποθήκευση A’ Υλών.'
      },

    ]
  },
  'raw-materials-env_5_6': {
    id: 'raw-materials-env_5_6',
    environmentImage: '/cubemap/raw-materials/5_6',
    cameraAngle: 10,
    cameraYaw: 0,
    keypoints: [
      {
        id: 'step_5_4_kp',
        yaw: 185,
        pitch: -10,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_4_2',
        title: 'Επιστροφή στον κεντρικό χώρο'
      },
      {
        id: 'step_5_5_kp',
        yaw: 170,
        pitch: -30,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_5_1',
        title: 'Μετάβαση στα silo'
      },
      {
        id: 'info_5_6_1_kp',
        yaw: 0,
        pitch: 0,
        zoom: 2,
        targetFloor: 'raw-materials',
        targetStep: 'info_5_6_1',
        title: 'Tο οικοσύστημα Vitex'
      },
    ]
  },
  // raw materials level 
  // ------------
  // sorting level
  'sorting-env_4_1': {
    id: 'sorting-env_4_1',
    environmentImage: '/cubemap/sorting/4_1',
    cameraAngle: 10,
    cameraYaw: 30,
    keypoints: [
      // {
      //   id: 'step_4_2-kp',
      //   yaw: -30,
      //   pitch: -50,
      //   zoom: 1,
      //   targetFloor: 'sorting',
      //   targetStep: 'info_4_2_1',
      //   title: 'ΜΕΤΑΒΑΣΗ ΒΗΜΑ 4_2'
      // },
            {
        id: 'info_4_1_1-kp',
        yaw: 0,
        pitch: 25,
        zoom: 2.1,
        targetFloor: 'sorting',
        targetStep: 'info_4_1_1',
        title: 'Απόλιξη silo αποθήκευσης Α υλών'
      },
      {
        id: 'step_4_3-kp',
        yaw: 195,
        pitch: -40,
        zoom: 1.2,
        targetFloor: 'sorting',
        targetStep: 'info_4_3_1',
        title: 'Μετάβαση στους καδοζυγούς'
      },
    ]
  },
  // 'sorting-env_4_2': {
  //   id: 'sorting-env_4_2',
  //   environmentImage: '/cubemap/sorting/4_2',
  //   cameraAngle: 0,
  //   cameraYaw: 50,
  //   keypoints: [
  //     {
  //       id: 'step_4_1-kp',
  //       yaw: 60,
  //       pitch: -10,
  //       zoom: 1.2,
  //       targetFloor: 'sorting',
  //       targetStep: 'step_4_1',
  //       title: 'ΜΕΤΑΒΑΣΗ ΣΤΟ ΠΡΟΗΓΟΥΜΕΝΟ/4_1'
  //     },
  //     {
  //       id: 'step_4_4-kp',
  //       yaw: 118,
  //       pitch: -5,
  //       zoom: 2,
  //       targetFloor: 'sorting',
  //       targetStep: 'info_4_4_2',
  //       title: 'ΜΕΤΑΒΑΣΗ ΣΤΟ ΒΗΜΑ 4_4'
  //     },
  //     {
  //       id: 'info_4_2_1-kp',
  //       yaw: 12,
  //       pitch: 22,
  //       zoom: 2,
  //       targetFloor: 'sorting',
  //       targetStep: 'info_4_2_1',
  //       title: 'Απόλιξη silo αποθήκευσης Α υλών'
  //     }
  //   ]
  // },
  'sorting-env_4_3': {
    id: 'sorting-env_4_3',
    environmentImage: '/cubemap/sorting/4_3',
    cameraAngle: 0,
    cameraYaw: 80,
    keypoints: [
      {
        id: 'step_4_1-kp',
        yaw: -55,
        pitch: -35,
        zoom: 1.1,
        targetFloor: 'sorting',
        targetStep: 'step_4_1',
        title: 'Μετάβαση στην απόλιξη των Silo'
      },
      {
        id: 'step_4_4-kp',
        yaw: 18,
        pitch: -20,
        zoom: 1.5,
        targetFloor: 'sorting',
        targetStep: 'info_4_4_2',
        title: 'Μετάβαση στο σύστημα αποκονίωσης'
      },
      {
        id: 'info_4_3_1-kp',
        yaw: 80,
        pitch: -20,
        zoom: 2,
        targetFloor: 'sorting',
        targetStep: 'info_4_3_1',
        title: 'Καδοζυγοί'
      },
    ]
  },
  'sorting-env_4_4': {
    id: 'sorting-env_4_4',
    environmentImage: '/cubemap/sorting/4_4',
    cameraAngle: 10,
    cameraYaw: -50,
    keypoints: [
      {
        id: 'step_4_1-kp',
        yaw: -15,
        pitch: -25,
        zoom: 1.1,
        targetFloor: 'sorting',
        targetStep: 'step_4_1',
        title: 'Μετάβαση στην απόλιξη των Silo'
      },
      {
        id: 'step_4_3-kp',
        yaw: 70,
        pitch: -35,
        zoom: 1.1,
        targetFloor: 'sorting',
        targetStep: 'info_4_3_1',
        title: 'Μετάβαση στους καδοζυγούς'
      },
      {
        id: 'info_4_4_1-kp',
        yaw: -130,
        pitch: -20,
        zoom: 2.5,
        targetFloor: 'sorting',
        targetStep: 'info_4_4_1',
        title: 'Big bag station'
      },
      {
        id: 'info_4_4_2-kp',
        yaw: -50,
        pitch: 0,
        zoom: 2,
        targetFloor: 'sorting',
        targetStep: 'info_4_4_2',
        title: '26 Φίλτρα συστήματος αποκονίωσης.'
      },

    ]
  },
  // sorting level
  // ------------
  // quantities env
  'quantities-env_3_1': {
    id: 'quantities-env_3_1',
    environmentImage: '/cubemap/quantities/3_1',
    cameraAngle: 10,
    cameraYaw: -100,
    keypoints: [
      {
        id: 'step_3_2-kp',
        yaw: 160,
        pitch: -17,
        zoom: 2,
        targetFloor: 'quantities',
        targetStep: 'info_3_2_1',
        title: 'Μετάβαση στη μονάδα ρίψης προζυγισμένων πρόσθετων'
      },
      {
        id: 'info_3_1_1',
        yaw: -135,
        pitch: 20,
        zoom: 2,
        targetFloor: 'quantities',
        targetStep: 'info_3_1_1',
        title: 'Big Bag Station'
      },
      // {
      //   id: 'info_3_1_2-kp',
      //   yaw: 95,
      //   pitch: 20,
      //   zoom: 2.5,
      //   targetFloor: 'quantities',
      //   targetStep: 'info_3_1_2',
      //   title: 'ΜΠΛΕ ΧΩΝΙ'
      // }
    ]
  },
  'quantities-env_3_2': {
    id: 'quantities-env_3_2',
    environmentImage: '/cubemap/quantities/3_2',
    cameraAngle: 10,
    cameraYaw: -50,
    keypoints: [
      {
        id: 'step_3_1-kp',
        yaw: 140,
        pitch: -25,
        zoom: 1.5,
        targetFloor: 'quantities',
        targetStep: 'step_3_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      },
      {
        id: 'step_3_3-kp',
        yaw: 225,
        pitch: -20,
        zoom: 2,
        targetFloor: 'quantities',
        targetStep: 'info_3_3_1',
        title: 'Μετάβση στο επόμενο'
      },
      {
        id: 'info_3_2_1-kp',
        yaw: -30,
        pitch: -10,
        zoom: 2,
        targetFloor: 'quantities',
        targetStep: 'info_3_2_1',
        title: 'Σταθμός ρίψης προζυγισμένων πρόσθετων'
      },
    ]
  },
  'quantities-env_3_3': {
    id: 'quantities-env_3_3',
    environmentImage: '/cubemap/quantities/3_3',
    cameraAngle: 10,
    cameraYaw: 190,
    keypoints: [
      {
        id: 'step_3_2-kp',
        yaw: 115,
        pitch: -20,
        zoom: 2,
        targetFloor: 'quantities',
        targetStep: 'info_3_2_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      },
      {
        id: 'info_3_3_1-kp',
        yaw: 190,
        pitch: 5,
        zoom: 2,
        targetFloor: 'quantities',
        targetStep: 'info_3_3_1',
        title: 'Σταθμός ρίψης προζυγισμένων πρόσθετων'
      },
    ]
  },
  // quantities env
  // ------------
  // secrets env
  'secrets-env_2_1': {
    id: 'secrets-env_2_1',
    environmentImage: '/cubemap/secrets/2_1',
    cameraAngle: -10,
    cameraYaw: 240,
    keypoints: [
      {
        id: 'step_2_2-kp',
        yaw: -90,
        pitch: -15,
        zoom: 1.5,
        targetFloor: 'secrets',
        targetStep: 'info_2_2_1',
        title: 'ΜΕΤΑΒΑΣΗ ΣΤΟ ΕΠΟΜΕΝΟ/2_2'
      },
      {
        id: 'info_2_1_1-kp',
        yaw: 230,
        pitch: -10,
        zoom: 2,
        targetFloor: 'secrets',
        targetStep: 'info_2_1_1',
        title: 'Mixer ανάδευσης'
      },
    ]
  },
  'secrets-env_2_2': {
    id: 'secrets-env_2_2',
    environmentImage: '/cubemap/secrets/2_2',
    cameraAngle: -5,
    cameraYaw: 100,
    keypoints: [
      {
        id: 'step_2_1-kp',
        yaw: 126,
        pitch: -13,
        zoom: 2,
        targetFloor: 'secrets',
        targetStep: 'step_2_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      },
      {
        id: 'info_2_2_1-kp',
        yaw: 70,
        pitch: 0,
        zoom: 2,
        targetFloor: 'secrets',
        targetStep: 'info_2_2_1',
        title: 'Σταθμός αποκονίωσης'
      },
    ]
  },

  // secrets env
  // ------------
  // mixing level
  'mixing-env_1_1': {
    id: 'mixing-env_1_1',
    environmentImage: '/cubemap/mixing/1_1',
    cameraAngle: 10,
    cameraYaw: 150,
    keypoints: [
      {
        id: 'step_1_2-kp',
        yaw: 150,
        pitch: -15,
        zoom: 2,
        targetFloor: 'mixing',
        targetStep: 'info_1_2_1',
        title: 'Μετάβαση στο σύστημα αποκονίωσης'
      },
      {
        id: 'info_1_1_1-kp',
        yaw: 92,
        pitch: -15,
        zoom: 2.5,
        targetFloor: 'mixing',
        targetStep: 'info_1_1_1',
        title: 'Blower αερομεταφοράς συσκευαστικής.'
      },
      {
        id: 'info_1_1_2-kp',
        yaw: 215,
        pitch: 15,
        zoom: 2,
        targetFloor: 'mixing',
        targetStep: 'info_1_1_2',
        title: 'Buffer γραμμών παραγωγής'
      }
    ]
  },
  'mixing-env_1_2': {
    id: 'mixing-env_1_2',
    environmentImage: '/cubemap/mixing/1_2',
    cameraAngle: 10,
    cameraYaw: 120,
    keypoints: [
      {
        id: 'step_1_1-kp',
        yaw: -40,
        pitch: -30,
        zoom: 1.2,
        targetFloor: 'mixing',
        targetStep: 'step_1_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      },
      {
        id: 'info_1_2_1-kp',
        yaw: 105,
        pitch: -10,
        zoom: 2,
        targetFloor: 'mixing',
        targetStep: 'info_1_2_1',
        title: 'Αποκονίωση εγκατάστασης'
      },
    ]
  },
  // mixing level
  // ------------
  // packaging level
  'packaging-env_0_1': {
    id: 'packaging-env_0_1',
    environmentImage: '/cubemap/packaging/0_1',
    cameraAngle: 10,
    cameraYaw: -10,
    keypoints: [
      {
        id: 'step_0_4-kp',
        yaw: -74,
        pitch: -15,
        zoom: 2.5,
        targetFloor: 'packaging',
        targetStep: 'info_0_4_1',
        title: 'Εξωτερικός Χώρος'
      },
      {
        id: 'step_0_3-kp',
        yaw: 155,
        pitch: -30,
        zoom: 2,
        targetFloor: 'packaging',
        targetStep: 'step_0_3_vid',
        title: 'Συσκευαστική ξηρού κονιάματος'
      },
      {
        id: 'step_0_2-kp',
        yaw: -16,
        pitch: -25,
        zoom: 2,
        targetFloor: 'packaging',
        targetStep: 'step_0_2_vid',
        title: 'Εισαγωγή παλετών προς τύλιξη'
      },
      {
        id: 'info_0_1_1-kp',
        yaw: -145,
        pitch: -5,
        zoom: 2.5,
        targetFloor: 'packaging',
        targetStep: 'info_0_1_1',
        title: 'Χώρος γραφείων'
      },
      {
        id: 'info_0_1_2-kp',
        yaw: 137,
        pitch: -35,
        zoom: 2.2,
        targetFloor: 'packaging',
        targetStep: 'step_0_3_1_vid',
        title: 'Ταινιόδρομος μεταφοράς ετοίμων προ παλετοποίηση'
      },
      {
        id: 'info_0_1_3-kp',
        yaw: 30,
        pitch: 0,
        zoom: 2.5,
        targetFloor: 'packaging',
        targetStep: 'info_0_1_3',
        title: '110 Παλετοθέσεις αποθήκευσης αναλώσιμων και Α υλών.'
      }
    ]
  },
  'packaging-env_0_2': {
    id: 'packaging-env_0_2',
    environmentImage: '/cubemap/packaging/0_2',
    cameraAngle: -10,
    cameraYaw: 0,
    keypoints: [
      {
        id: 'step_0_1-kp',
        yaw: 90,
        pitch: -15,
        zoom: 1.5,
        targetFloor: 'packaging',
        targetStep: 'step_0_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      },
      {
        id: 'step_0_2_vid-kp',
        yaw: -5,
        pitch: -25,
        zoom: 2,
        targetFloor: 'packaging',
        targetStep: 'step_0_2_vid',
        title: 'Εισαγωγή παλετών προς τύλιξη'
      },
    ]
  },
  'packaging-env_0_2_video': {
    id: 'packaging-env_0_2_video',
    environmentImage: '/video/0_2.mp4',
    cameraAngle: 10,
    cameraYaw: -90,
    keypoints: [
      {
        id: 'step_0_1-kp',
        yaw: 70,
        pitch: -40,
        zoom: 1.5,
        targetFloor: 'packaging',
        targetStep: 'step_0_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      }
    ]
  },
  'packaging-env_0_3': {
    id: 'packaging-env_0_3',
    environmentImage: '/cubemap/packaging/0_3',
    cameraAngle: -10,
    cameraYaw: 45,
    keypoints: [
      {
        id: 'step_0_1-kp',
        yaw: -10,
        pitch: -10,
        zoom: 1.5,
        targetFloor: 'packaging',
        targetStep: 'step_0_1',
        title: 'ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΒΗΜΑ 0_1'
      },
      {
        id: 'step_0_3_1_vid-kp',
        yaw: 50,
        pitch: -20,
        zoom: 2,
        targetFloor: 'packaging',
        targetStep: 'step_0_3_1_vid',
        title: 'Ταινιόδρομος μεταφοράς ετοίμων προ παλετοποίηση'
      },
      {
        id: 'step_0_3_vid-kp',
        yaw: 213,
        pitch: -25,
        zoom: 1.7,
        targetFloor: 'packaging',
        targetStep: 'step_0_3_vid',
        title: 'Συσκευαστική ξηρού κονιάματος'
      }
    ]
  },
  'packaging-env_0_3_video': {
    id: 'packaging-env_0_3_video',
    environmentImage: '/video/0_3.mp4',
    cameraAngle: 10,
    cameraYaw: 120,
    keypoints: [
      {
        id: 'step_0_1-kp',
        yaw: -10,
        pitch: -50,
        zoom: 1.5,
        targetFloor: 'packaging',
        targetStep: 'step_0_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      }
    ]
  },
  'packaging-env_0_3_1_video': {
    id: 'packaging-env_0_3_1_video',
    environmentImage: '/video/0_3_1.mp4',
    cameraAngle: 10,
    cameraYaw: 75,
    keypoints: [
      {
        id: 'step_0_1-kp',
        yaw: 20,
        pitch: -20,
        zoom: 1.5,
        targetFloor: 'packaging',
        targetStep: 'step_0_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      }
    ]
  },
  'packaging-env_0_4': {
    id: 'packaging-env_0_4',
    environmentImage: '/cubemap/packaging/0_4',
    cameraAngle: -10,
    cameraYaw: -90,
    keypoints: [
      {
        id: 'step_0_1-kp',
        yaw: 10,
        pitch: -15,
        zoom: 1.7,
        targetFloor: 'packaging',
        targetStep: 'step_0_1',
        title: 'Επιστροφή στον κεντρικό χώρο'
      },
      {
        id: 'info_0_4_1-kp',
        yaw: -90,
        pitch: 10,
        zoom: 2.5,
        targetFloor: 'packaging',
        targetStep: 'info_0_4_1',
        title: 'Ράμπες Φόρτωσης'
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