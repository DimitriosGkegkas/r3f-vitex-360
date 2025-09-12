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
        title: 'Επίπεδο φίλτρων silo.',
        description: 'Στην κορυφή των σιλό αρχίζει η διαδρομή της παραγωγής. Από εδώ, οι πρώτες ύλες μπαίνουν στη διαδικασία με ασφάλεια και ακρίβεια, δίνοντας ζωή σε όσα θα ακολουθήσουν.',
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env_5_1'
      },
      {
        id: 'info_5_1_1',
        title: `Αναβατόριο παραλαβής Α' υλών.`,
        description: `Με ροή έως 25 m³/h, το σύγχρονο αναβατόριο μεταφέρει τις πρώτες ύλες γρήγορα και με απόλυτη ασφάλεια, εξασφαλίζοντας σταθερή και αξιόπιστη παραγωγή.`,
        stepName: 'Πρώτο',
        environmentId: 'raw-materials-env_5_1'
      },
      // {
      //   id: 'info_5_1_2',
      //   title: 'Οικοσύστημα εργοστασίων Vitex',
      //   description: 'Με παράδοση από το 1932, η Vitex εξελίσσεται σε ένα ολοκληρωμένο οικοσύστημα βιομηχανικών λύσεων, συνδυάζοντας καινοτομία, συνέπεια και υψηλή απόδοση στην παραγωγή.',
      //   stepName: 'Πρώτο',
      //   environmentId: 'raw-materials-env_5_1'
      // },
      // {
      //   id: 'step_5_2',
      //   title: 'ΒΗΜΑ 5_2',
      //   description: '',
      //   stepName: 'Δεύτερο',
      //   environmentId: 'raw-materials-env_5_2'
      // },
      {
        id: 'info_5_2_1',
        title: 'Καπάκι επιθεώρησης',
        description: 'Από εδώ ελέγχεται το εσωτερικό των σιλό, διασφαλίζοντας ότι οι πρώτες ύλες παραμένουν καθαρές και προστατευμένες σε κάθε στάδιο της διαδικασίας. Εδώ διακρίνονται και τα χαρακτηριστικά χρώματα του Χρωμοπύργου, σήμα κατατεθέν του εργοστασίου.',
        stepName: 'Δεύτερο',
        environmentId: 'raw-materials-env_5_2'
      },
      // {
      //   id: 'step_5_3',
      //   title: 'ΒΗΜΑ 5_3',
      //   description: '',
      //   stepName: 'Τρίτο',
      //   environmentId: 'raw-materials-env_5_3'
      // },
      {
        id: 'info_5_3_1',
        title: 'Σωλήνες αερομεταφοράς πλήρωσης silo',
        description: 'Δεκαπέντε σωλήνες αερομεταφοράς γεμίζουν τα σιλό με ακρίβεια και ταχύτητα, ένα εντυπωσιακό δίκτυο που δίνει μεγάλη δύναμη και εξασφαλίζει αδιάκοπη ροή πρώτων υλών στην παραγωγή.',
        stepName: 'Τρίτο',
        environmentId: 'raw-materials-env_5_3'
      },
      // {
      //   id: 'step_5_4',
      //   title: 'ΒΗΜΑ 5_4',
      //   description: '',
      //   stepName: 'Τέταρτο',
      //   environmentId: 'raw-materials-env_5_4'
      // },
      {
        id: 'info_5_4_2',
        title: 'Φίλτρα συστήματος αποκονίωσης.',
        description: 'Το κεντρικό σύστημα αποκονίωσης λειτουργεί με υψηλό ρυθμό, φτάνοντας συνολικά πάνω από 14.000 m³/h. Με τέσσερις bagging machines και ένα mixer με hopper, εξασφαλίζεται καθαρή και σταθερή διαδικασία σε κάθε στάδιο παραγωγής.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_4'
      },
      // {
      //   id: 'info_5_4_1',
      //   title: 'Καπάκι επόπτευσης εσωτερικού των silo',
      //   description: 'Από εδώ ελέγχεται το εσωτερικό των σιλό, διασφαλίζοντας ότι οι πρώτες ύλες παραμένουν καθαρές και προστατευμένες σε κάθε στάδιο της διαδικασίας. Εδώ διακρίνονται και τα χαρακτηριστικά χρώματα του Χρωμοπύργου, σήμα κατατεθέν του εργοστασίου.',
      //   stepName: 'Τέταρτο',
      //   environmentId: 'raw-materials-env_5_4'
      // },
      // {
      //   id: 'step_5_5',
      //   title: 'Silo',
      //   description: '',
      //   stepName: 'Πέμπτο',
      //   environmentId: 'raw-materials-env_5_5'
      // },
      {
        id: 'info_5_5_1',
        title: 'Silo. Aποθήκευση Α υλών.',
        description: 'Εδώ βρίσκονται τα 15 σιλό που αποθηκεύουν τις πρώτες ύλες με ασφάλεια και οργάνωση. Τα χαρακτηριστικά χρώματα του Χρωμοπύργου ξεχωρίζουν και σε αυτό το σημείο, ως σήμα κατατεθέν του εργοστασίου.',
        stepName: 'Τέταρτο',
        environmentId: 'raw-materials-env_5_5'
      },
      // {
      //   id: 'step_5_6',
      //   title: 'ΒΗΜΑ 5_6',
      //   description: '',
      //   stepName: 'Έκτο',
      //   environmentId: 'raw-materials-env_5_6'
      // },
      {
        id: 'info_5_6_1',
        title: 'Tο οικοσύστημα Vitex',
        description: 'Από εδώ φαίνεται όλο το οικοσύστημα της Vitex: μια εταιρεία που, παρότι το όνομά της είναι ταυτισμένο με τα χρώματα που έχει αγαπήσει το κοινό, προσφέρει σήμερα ολοκληρωμένες λύσεις δομικών υλικών. Με παράδοση από το 1932, πλησιάζει τα 100 χρόνια συνεχούς παρουσίας και εξέλιξης.',
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
        title: 'Eπίπεδο τροφοδοσίας big bag station',
        description: 'Στο επίπεδο τροφοδοσίας, τα big bags γεμίζουν με ακρίβεια και συνέπεια, τροφοδοτώντας τη διαδικασία χωρίς διακοπή. Εδώ ξεκινά ένα κρίσιμο στάδιο που δίνει ρυθμό σε όλη την παραγωγή.',
        stepName: 'Πρώτο',
        environmentId: 'sorting-env_4_1'
      },
      {
        id: 'info_4_1_1',
        title: 'Απόλιξη silo αποθήκευσης Α υλών',
        description: 'Από αυτό το σημείο οι πρώτες ύλες κατεβαίνουν από τα σιλό για να μπουν στη γραμμή παραγωγής, με σταθερή ροή και απόλυτη ακρίβεια στη δοσομέτρηση.',
        stepName: 'Πρώτο',
        environmentId: 'sorting-env_4_1'
      },
      // {
      //   id: 'step_4_2',
      //   title: 'Big bag station',
      //   description: 'Στο επίπεδο τροφοδοσίας, τα big bags γεμίζουν με ακρίβεια και συνέπεια, τροφοδοτώντας τη διαδικασία χωρίς διακοπή. Εδώ ξεκινά ένα κρίσιμο στάδιο που δίνει ρυθμό σε όλη την παραγωγή.',
      //   stepName: 'Δεύτερο',
      //   environmentId: 'sorting-env_4_2'
      // },
      // {
      //   id: 'info_4_2_1',
      //   title: 'Απόλιξη silo αποθήκευσης Α υλών',
      //   description: 'Από αυτό το σημείο οι πρώτες ύλες κατεβαίνουν από τα σιλό για να μπουν στη γραμμή παραγωγής, με σταθερή ροή και απόλυτη ακρίβεια στη δοσομέτρηση.',
      //   stepName: 'Δεύτερο',
      //   environmentId: 'sorting-env_4_2'
      // },
      // {
      //   id: 'step_4_3',
      //   title: 'ΒΗΜΑ 4_3',
      //   description: 'Witness our comprehensive evaluation process that ensures only the finest materials proceed to the next stage.',
      //   stepName: 'Τρίτο',
      //   environmentId: 'sorting-env_4_3'
      // },
      {
        id: 'info_4_3_1',
        title: 'Καδοζυγοί',
        description: 'Οι καδοζυγοί τροφοδοτούνται μέσω κοχλιών και ζυγίζουν με ακρίβεια τις πρώτες ύλες που κατευθύνονται προς ανάδευση, για να ξεκινήσει η παραγωγή των έτοιμων προϊόντων.',
        stepName: 'Δεύτερο',
        environmentId: 'sorting-env_4_3'
      },
      // {
      //   id: 'step_4_4',
      //   title: 'ΒΗΜΑ 4_4',
      //   description: 'Observe the exacting standards and attention to detail that make our sorting process so effective.',
      //   stepName: 'Τέταρτο',
      //   environmentId: 'sorting-env_4_4'
      // },
      {
        id: 'info_4_4_1',
        title: 'Big bag station.',
        description: 'Στο Big Bag Station γεμίζουν τα μεγάλα σακιά με τις απαραίτητες ποσότητες υλικών, έτοιμα να μπουν στη ροή της παραγωγής με ταχύτητα και ακρίβεια.',
        stepName: 'Τέταρτο',
        environmentId: 'sorting-env_4_4'
      },
      {
        id: 'info_4_4_2',
        title: '26 Φίλτρα συστήματος αποκονίωσης',
        description: 'Συνολικά 26 φίλτρα αποκονίωσης λειτουργούν σε όλα τα επίπεδα του εργοστασίου, κρατώντας τη διαδικασία καθαρή και αποδοτική σε κάθε στάδιο παραγωγής.',
        stepName: 'Τρίτο',
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
        title: 'Επίπεδο προσθήκης προζυγισμένων χημικών',
        description: 'Σε αυτό το επίπεδο προστίθενται τα προζυγισμένα χημικά, δίνοντας στο μίγμα τα ειδικά χαρακτηριστικά που το κάνουν μοναδικό και υψηλής ποιότητας.',
        stepName: 'Πρώτο',
        environmentId: 'quantities-env_3_1'
      },
      {
        id: 'info_3_1_1',
        title: 'Big Bag Stations',
        description: 'Δώδεκα σταθμοί Big Bag λειτουργούν ταυτόχρονα, εξασφαλίζοντας μεγάλη δυναμικότητα και συνεχή τροφοδοσία της παραγωγής χωρίς καθυστερήσεις.',
        stepName: 'Πρώτο',
        environmentId: 'quantities-env_3_1'
      },
      // {
      //   id: 'info_3_1_2',
      //   title: 'ΠΛΗΡΟΦΟΡΙΕΣ ΜΠΛΕ ΧΩΝΙ',
      //   description: 'Οι σωλήνες μεταφέρουν τα υλικά από πάνω.',
      //   stepName: 'Πρώτο',
      //   environmentId: 'quantities-env_3_1'
      // },
      // {
      //   id: 'step_3_2',
      //   title: 'Σε αυτό το επίπεδο προστίθενται τα προζυγισμένα χημικά, δίνοντας στο μίγμα τα ειδικά χαρακτηριστικά που το κάνουν μοναδικό και υψηλής ποιότητας.',
      //   description: '',
      //   stepName: 'Δεύτερο',
      //   environmentId: 'quantities-env_3_2'
      // },
      {
        id: 'info_3_2_1',
        title: 'Σταθμός ρίψης προζυγισμένων πρόσθετων.',
        description: 'Εδώ ο εργαζόμενος παραγωγής του ορόφου,μέσω ενός τερματικου πάνελ ενημερώνεται για την ρίψη των προζυγισμένων που οδηγούνται προς ανάδευση.',
        stepName: 'Δεύτερο',
        environmentId: 'quantities-env_3_2'
      },
      // {
      //   id: 'step_3_3',
      //   title: 'ΒΗΜΑ 3_3',
      //   description: '',
      //   stepName: 'Τρίτο',
      //   environmentId: 'quantities-env_3_3'
      // },
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
        title: 'Επίπεδο mixer',
        description: 'Στο επίπεδο του mixer γίνεται η κεντρική ανάδευση των πρώτων υλών και πρόσθετων, δημιουργώντας ομοιογενή μίγματα που αποτελούν τη βάση της παραγωγής.',
        stepName: 'Πρώτο',
        environmentId: 'secrets-env_2_1'
      },
      {
        id: 'info_2_1_1',
        title: 'Mixer ανάδευσης',
        description: 'Εδώ αναμειγνύονται τα ξηρά κονιάματα σε οριζόντια θέση, με ταχύτητα περιστροφής 50Hz, δημιουργώντας τα ημιέτοιμα μίγματα που συνεχίζουν στη γραμμή παραγωγής.',
        stepName: 'Πρώτο',
        environmentId: 'secrets-env_2_1'
      },
      // {
      //   id: 'step_2_2',
      //   title: 'ΒΗΜΑ 2_2',
      //   description: '',
      //   stepName: 'Δεύτερο',
      //   environmentId: 'secrets-env_2_2'
      // },
      {
        id: 'info_2_2_1',
        title: 'Σταθμός αποκονίωσης',
        description: 'Στο σταθμό αποκονίωσης συγκρατείται η σκόνη που παράγεται κατά τη διαδικασία, εξασφαλίζοντας καθαρή και ομαλή ροή στην παραγωγή.',
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
        title: 'Πρώτος Όροφος Χρωμοπύργου',
        description: 'Εδώ βρίσκονται τα blower των συσκευαστικών και τα buffer με τα έτοιμα προϊόντα προς συσκευασία, εξασφαλίζοντας αδιάκοπη ροή στη γραμμή παραγωγής.',
        stepName: 'Πρώτο',
        environmentId: 'mixing-env_1_1'
      },
      {
        id: 'info_1_1_1',
        title: 'Blower αερομεταφοράς συσκευαστικής.',
        description: 'Το blower αερομεταφοράς δίνει την απαραίτητη ισχύ για τη μεταφορά των υλικών στη συσκευασία, διατηρώντας τη διαδικασία γρήγορη και αδιάλειπτη.',
        stepName: 'Πρώτο',
        environmentId: 'mixing-env_1_1'
      },
      {
        id: 'info_1_1_2',
        title: 'Buffer γραμμών παραγωγής',
        description: 'Εδώ συγκεντρώνεται το έτοιμο προϊόν για τις δύο γραμμές παραγωγής, πριν περάσει στο τελικό στάδιο συσκευασίας.',
        stepName: 'Πρώτο',
        environmentId: 'mixing-env_1_1'
      },
      // {
      //   id: 'step_1_2',
      //   title: 'Ανακύκλωση',
      //   description: '',
      //   stepName: 'Δεύτερο',
      //   environmentId: 'mixing-env_1_2'
      // },
      {
        id: 'info_1_2_1',
        title: 'Αποκονίωση εγκατάστασης',
        description: 'Εδώ συλλέγονται τα παράγωγα τριβής και τα αιωρούμενα σωματίδια που συγκρατεί το σύστημα αποκονίωσης. Μέσω αερομεταφοράς και με τη βοήθεια αεροφράχτη, οδηγούνται σε μεγασάκους για ανακύκλωση και επαναχρησιμοποίηση στην παραγωγή.',
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
        description: 'Ο χώρος όπου τα έτοιμα προϊόντα συσκευάζονται, αποθηκεύονται και παλετοποιούνται, πριν πάρουν τον δρόμο προς την αγορά.',
        stepName: 'Πρώτο',
        environmentId: 'packaging-env_0_1'
      },
      {
        id: 'info_0_1_3',
        title: '110 Παλετοθέσεις αποθήκευσης αναλώσιμων και Α υλών.',
        description: 'Με 110 παλετοθέσεις για αναλώσιμα και πρώτες ύλες, ο χώρος προσφέρει μεγάλη αποθηκευτική ικανότητα και απρόσκοπτη τροφοδοσία της παραγωγής.',
        stepName: 'Πρώτο',
        environmentId: 'packaging-env_0_1'
      },
      {
        id: 'info_0_1_1',
        title: 'Χώρος γραφείων',
        description: 'Στο ισόγειο στεγάζονται το control room, το meeting room, το εργαστήριο ποιοτικού ελέγχου, το γραφείο ΙΤ, το γραφείο κίνησης και οι χώροι πινάκων, αποτελώντας το κέντρο ελέγχου και οργάνωσης του εργοστασίου.',
        stepName: 'Πρώτο',
        environmentId: 'packaging-env_0_1'
      },
      // {
      //   id: 'info_0_1_2',
      //   title: 'Ταινιόδρομος μεταφοράς ετοίμων προ παλετοποίηση',
      //   description: 'Ο ταινιόδρομος μεταφέρει τα έτοιμα προϊόντα πριν την παλετοποίηση, με δυνατότητα διαχείρισης έως και 1.000 σακιά την ώρα, καθιστώντας το εργοστάσιο ένα από τα μεγαλύτερα στην παραγωγή του κλάδου.',
      //   stepName: 'Πρώτο',
      //   environmentId: 'packaging-env_0_1'
      // },
      // {
      //   id: 'step_0_2',
      //   title: 'Παλετοποίηση',
      //   description: 'Εισαγωγή παλέτων προς τύλιξη.',
      //   stepName: 'Δεύτερο',
      //   environmentId: 'packaging-env_0_2'
      // },
      {
        id: 'step_0_2_vid',
        title: 'Εισαγωγή παλέτων προς τύλιξη',
        description: 'Εδώ οι παλέτες περνούν στη διαδικασία τύλιξης, με δυνατότητα παλετοποίησης έως 1.000 σακιών την ώρα — επίδοση που αναδεικνύει το εργοστάσιο ως ένα από τα ισχυρότερα του κλάδου.',
        stepName: 'Δεύτερο',
        environmentId: 'packaging-env_0_2_video'
      },
      // {
      //   id: 'step_0_3',
      //   title: 'Μηχάνημα συσκευασίας',
      //   description: '',
      //   stepName: 'Τρίτο',
      //   environmentId: 'packaging-env_0_3'
      // },
      {
        id: 'step_0_3_1_vid',
        title: 'Ταινιόδρομος μεταφοράς ετοίμων προ παλετοποίηση',
        description: 'Ο ταινιόδρομος μεταφέρει τα έτοιμα προϊόντα πριν την παλετοποίηση, με δυνατότητα διαχείρισης έως και 1.000 σακιά την ώρα, καθιστώντας το εργοστάσιο ένα από τα μεγαλύτερα στην παραγωγή του κλάδου.',
        stepName: 'Τρίτο',
        environmentId: 'packaging-env_0_3_1_video'
      },
      {
        id: 'step_0_3_vid',
        title: 'Συσκευαστική ξηρού κονιάματος',
        description: 'Στο τμήμα αυτό γίνεται η συσκευασία του τελικού προϊόντος με χρήση αερομεταφοράς. Ένας ρομποτικός βραχίονας αρπάζει τους χαρτόσακους, ανοίγει τη βαλβίδα τους και την εφαρμόζει στην παροχή της συσκευαστικής, ώστε να γεμίσουν με ακρίβεια και ταχύτητα.',
        stepName: 'Τρίτο',
        environmentId: 'packaging-env_0_3_video'
      },
      // {
      //   id: 'step_0_4',
      //   title: 'Εξωτερικός χώρος',
      //   description: '',
      //   stepName: 'Τέταρτο',
      //   environmentId: 'packaging-env_0_4'
      // },
      {
        id: 'info_0_4_1',
        title: 'Εξωτερικός Χώρος - Ράμπες Φόρτωσης',
        description: 'Στις ράμπες φόρτωσης ολοκληρώνεται ο κύκλος παραγωγής, με τα έτοιμα προϊόντα να φεύγουν οργανωμένα και με ταχύτητα προς την αγορά.',
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