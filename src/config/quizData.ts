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
    question: "Πόσα σιλό αποθήκευσης Α’ υλών διαθέτει το εργοστάσιο;",
    options: [
      { letter: "Α", text: "8" },
      { letter: "Β", text: "11" },
      { letter: "Γ", text: "15" },
      { letter: "Δ", text: "20" }
    ],
    correctAnswer: 1,
    explanation: "Με 15 σιλό, η Vitex έχει τεράστια δυναμικότητα αποθήκευσης, που δίνει τεράστια ευελιξία στην παραγωγή."
  },
  {
    id: 2,
    question: "Με ποιον ρυθμό μπορεί να γίνει η παλετοποίηση στο εργοστάσιο;",
    options: [
      { letter: "Α", text: "2000 σακιά/ώρα" },
      { letter: "Β", text: "4000 σακιά/ώρα" },
      { letter: "Γ", text: "6.400 σακιά/ώρα" },
      { letter: "Δ", text: "Η τουρμπίνα" }
    ],
    correctAnswer: 2,
    explanation: "1.000 σακιά την ώρα! Ένας ρυθμός που κατατάσσει το εργοστάσιο ανάμεσα στα μεγαλύτερα της κατηγορίας του."
  },
  {
    id: 3,
    question: "Τι ρόλο έχουν οι καδοζυγοί στη διαδικασία;",
    options: [
      { letter: "Α", text: "Μεταφέρουν τα big bags" },
      { letter: "Β", text: "Ζυγίζουν και δοσομετρούν με ακρίβεια τις πρώτες ύλες" },
      { letter: "Γ", text: "Αποθηκεύουν τα έτοιμα προϊόντα" },
      { letter: "Δ", text: "Αποκονιώνουν τον αέρα" }
    ],
    correctAnswer: 1,
    explanation: "Οι καδοζυγοί δίνουν απόλυτη ακρίβεια στις ποσότητες — και η ακρίβεια είναι το μυστικό για κορυφαία ποιότητα προϊόντος."
  },
  {
    id: 4,
    question: "Πόσα Big Bag Stations λειτουργούν συνολικά στο εργοστάσιο;",
    options: [
      { letter: "Α", text: "6" },
      { letter: "Β", text: "8" },
      { letter: "Γ", text: "10" },
      { letter: "Δ", text: "12" }
    ],
    correctAnswer: 3,
    explanation: "12 Big Bag Stations σημαίνει ταχύτητα και συνεχής ροή — τίποτα δεν σταματάει την παραγωγή."
  },
  {
    id: 5,
    question: "Ποιο είναι το σήμα κατατεθέν του εργοστασίου που ξεχωρίζει και εξωτερικά;",
    options: [
      { letter: "Α", text: "Οι σωλήνες αερομεταφοράς" },
      { letter: "Β", text: "Ο Χρωμοπύργος με τα χαρακτηριστικά χρώματα" },
      { letter: "Γ", text: "Οι ράμπες φόρτωσης" },
      { letter: "Δ", text: "Οι καδοζυγοί" }
    ],
    correctAnswer: 1,
    explanation: "Ο Χρωμοπύργος με τα χρώματά του είναι το νέο τοπόσημο της περιοχής — σύμβολο παράδοσης και καινοτομίας μαζί."
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
