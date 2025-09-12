export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    letter: string;
    text: string;
  }[];
  correctAnswer: number; // Index of correct answer (0-3)
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  title: string;
  message: string;
  iconColor: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Στον 1ο όροφο (Αναμείξη), τι ρόλο έχει το μπλε μηχάνημα που φαίνεται δίπλα στο κεντρικό;",
    options: [
      { letter: "Α", text: "Είναι διακοσμητικό στοιχείο" },
      { letter: "Β", text: "Συμμετέχει στη διαδικασία ανάμειξης" },
      { letter: "Γ", text: "Αποθηκεύει έτοιμες παλέτες" },
      { letter: "Δ", text: "Χρησιμοποιείται για την ανακύκλωση" }
    ],
    correctAnswer: 1,
    explanation: "Μα καλά δεν είπαμε ότι το μπλε μηχάνημα είναι για να ανακατεύεσαι;"
  },
  {
    id: 2,
    question: "Στον 4ο όροφο (Διαλογή), ποιο μηχάνημα δέχεται τις ποσότητες των αρχικών υλικών;",
    options: [
      { letter: "Α", text: "Το γκρι μηχάνημα" },
      { letter: "Β", text: "Το κεντρικό μηχάνημα διαχείρισης" },
      { letter: "Γ", text: "Το μπλε μηχάνημα" },
      { letter: "Δ", text: "Η τουρμπίνα" }
    ],
    correctAnswer: 2,
    explanation: "Το μπλε μηχάνημα είναι αυτό που δέχεται και επεξεργάζεται τις ποσότητες των αρχικών υλικών."
  },
  {
    id: 3,
    question: "Στην κορυφή των σιλό, τι δείχνει η πρώτη φωτογραφία με τη σκάλα;",
    options: [
      { letter: "Α", text: "Τη διαδικασία παλετοποίησης" },
      { letter: "Β", text: "Τη σκάλα ανόρθωσης που φέρνει τις πρώτες ύλες στα σιλό" },
      { letter: "Γ", text: "Το σημείο ανακύκλωσης" },
      { letter: "Δ", text: "Τη λειτουργία του μηχανήματος ACCOM" }
    ],
    correctAnswer: 1,
    explanation: "Η σκάλα ανόρθωσης είναι το κρίσιμο στοιχείο που φέρνει τις πρώτες ύλες στα σιλό."
  },
  {
    id: 4,
    question: "Πόσα τσουβάλια παράγει την ημέρα το εργοστάσιο;",
    options: [
      { letter: "Α", text: "500" },
      { letter: "Β", text: "2.000" },
      { letter: "Γ", text: "5.000" },
      { letter: "Δ", text: "10.000" }
    ],
    correctAnswer: 2,
    explanation: "Το εργοστάσιο παράγει 5.000 τσουβάλια την ημέρα, μια εντυπωσιακή παραγωγή!"
  },
  {
    id: 5,
    question: "Ποιο είναι το κύριο προϊόν που παράγεται στο εργοστάσιο;",
    options: [
      { letter: "Α", text: "Πλαστικά περιτυλίγματα" },
      { letter: "Β", text: "Κόλλες για πλακάκια" },
      { letter: "Γ", text: "Χρώματα τοίχου" },
      { letter: "Δ", text: "Συσκευασίες" }
    ],
    correctAnswer: 1,
    explanation: "Το κύριο προϊόν της Vitex είναι οι κόλλες για πλακάκια, που χρησιμοποιούνται στην κατασκευή."
  }
];

export const getQuizResult = (score: number, totalQuestions: number): QuizResult => {
  const percentage = (score / totalQuestions) * 100;
  
  if (percentage === 100) {
    return {
      score,
      totalQuestions,
      title: "Σκόραρες 5 στα 5 σωστά!",
      message: "Φωτιά! Έτοιμος να κάνεις τις δικές σου ξεναγήσεις στο εργοστάσιο της Vitex.",
      iconColor: "#3197F2"
    };
  } else if (percentage >= 60) {
    return {
      score,
      totalQuestions,
      title: `Σκόραρες ${score} στα ${totalQuestions} σωστά!`,
      message: "Έδωσες προσοχή στην περιήγηση αλλά χάζεψες και λίγο. Πολύ καλά.",
      iconColor: "#196DB8"
    };
  } else {
    return {
      score,
      totalQuestions,
      title: `Σκόραρες ${score} στα ${totalQuestions} σωστά...`,
      message: "Θα μπορούσες και καλύτερα. Δεν πειράζει την επόμενη φορά. Πιστεύουμε σε σένα!",
      iconColor: "#696C80"
    };
  }
};
