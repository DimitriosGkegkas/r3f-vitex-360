import React, { useState, useEffect } from 'react';
import { AnimatedIcon } from '../AnimatedIcon';
import { BulletPoint } from '../BulletPoint';
import { FilledButton } from '../FilledButton';
import { QuizCard } from '../QuizCard';
import { QuizResult } from '../QuizResult';
import { QUIZ_QUESTIONS, getQuizResult } from '../../config/quizData';
import './ScoreCard.css';

interface ScoreCardProps {
  visitedCount: number;
  totalPossibleSteps: number;
  dailyProduction: number;
  onRestart: () => void;
  quizTimerSeconds?: number;
  autoNextDelay?: number;
}


type QuizState = 'score' | 'quiz' | 'result';

export const ScoreCard: React.FC<ScoreCardProps> = ({
  visitedCount,
  totalPossibleSteps,
  dailyProduction,
  onRestart,
  quizTimerSeconds = 10,
  autoNextDelay = 5000
}) => {
  const [currentState, setCurrentState] = useState<QuizState>('score');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const bulletPoints = [
    `Αξιοποίησες ${visitedCount} από τα ${totalPossibleSteps} κρυφά μυστικά της Vitex και θα μπορούσες να παράξεις ${dailyProduction.toLocaleString()} σακιά την ημέρα.`,
    'Το νέο εργοστάσιο της Vitex μπορεί μέχρι και τα 5.000.000 σακιά τον χρόνο.'
  ];

  const trophyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 9H4.5C4.10217 9 3.72064 8.84196 3.43934 8.56066C3.15804 8.27936 3 7.89783 3 7.5V6C3 5.60217 3.15804 5.22064 3.43934 4.93934C3.72064 4.65804 4.10217 4.5 4.5 4.5H6M18 9H19.5C19.8978 9 20.2794 8.84196 20.5607 8.56066C20.842 8.27936 21 7.89783 21 7.5V6C21 5.60217 20.842 5.22064 20.5607 4.93934C20.2794 4.65804 19.8978 4.5 19.5 4.5H18M12 9V12M12 12L14 14M12 12L10 14M12 12V15M12 15C12 15.5523 11.5523 16 11 16H10C9.44772 16 9 15.5523 9 15V14H7V15C7 16.6569 8.34315 18 10 18H11C12.6569 18 14 16.6569 14 15V14H16V15C16 15.5523 15.5523 16 15 16H14C13.4477 16 13 15.5523 13 15V12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V15" stroke="#1088F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );


  const restartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
    <path d="M17 7.99999C17.0002 9.97178 16.2239 11.8643 14.8391 13.268C13.4543 14.6716 11.5724 15.4735 9.60078 15.5H9.5C7.58456 15.5048 5.74085 14.7718 4.35156 13.4531C4.2919 13.3967 4.24394 13.3291 4.21042 13.2541C4.17689 13.1791 4.15846 13.0983 4.15618 13.0162C4.15389 12.9341 4.1678 12.8524 4.1971 12.7757C4.2264 12.699 4.27053 12.6288 4.32695 12.5691C4.38338 12.5095 4.45101 12.4615 4.52597 12.428C4.60093 12.3945 4.68176 12.376 4.76385 12.3737C4.84593 12.3715 4.92767 12.3854 5.00438 12.4147C5.08109 12.444 5.15128 12.4881 5.21094 12.5445C6.10453 13.3872 7.22663 13.948 8.43705 14.1567C9.64748 14.3654 10.8926 14.2128 12.0168 13.718C13.141 13.2232 14.0945 12.4081 14.7582 11.3746C15.4218 10.341 15.7663 9.13482 15.7484 7.90666C15.7305 6.6785 15.3512 5.48283 14.6577 4.46902C13.9642 3.45521 12.9874 2.6682 11.8493 2.20632C10.7112 1.74443 9.46216 1.62814 8.25832 1.87198C7.05447 2.11582 5.94916 2.70897 5.08047 3.57733C5.07409 3.58424 5.0673 3.59076 5.06016 3.59686L2.98359 5.49999H5.125C5.29076 5.49999 5.44973 5.56584 5.56694 5.68305C5.68415 5.80026 5.75 5.95923 5.75 6.12499C5.75 6.29075 5.68415 6.44972 5.56694 6.56693C5.44973 6.68414 5.29076 6.74999 5.125 6.74999H1.375C1.20924 6.74999 1.05027 6.68414 0.933058 6.56693C0.815848 6.44972 0.75 6.29075 0.75 6.12499V2.37499C0.75 2.20923 0.815848 2.05026 0.933058 1.93305C1.05027 1.81584 1.20924 1.74999 1.375 1.74999C1.54076 1.74999 1.69973 1.81584 1.81694 1.93305C1.93415 2.05026 2 2.20923 2 2.37499V4.70311L4.20703 2.68749C5.25702 1.64158 6.59333 0.930198 8.04729 0.643138C9.50124 0.356078 11.0077 0.506213 12.3764 1.07459C13.7451 1.64296 14.9147 2.6041 15.7376 3.83667C16.5605 5.06923 16.9998 6.51797 17 7.99999Z" fill="#1A1A1A" />
  </svg>;

  // Timer effect for quiz button
  useEffect(() => {
    if (currentState === 'score') {
      const interval = setInterval(() => {
        setLoadingPercentage(prev => {
          if (prev >= 100) {
            setCurrentState('quiz');
            return 100;
          }
          return prev + (100 / (quizTimerSeconds * 10));
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentState, quizTimerSeconds]);

  const handleQuizStart = () => {
    console.log('🚀 Starting quiz with questions:', QUIZ_QUESTIONS.map(q => ({ id: q.id, text: q.question.substring(0, 30) + '...' })));
    setCurrentState('quiz');
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setLoadingPercentage(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    console.log('🔄 Next question clicked. Current index:', currentQuestionIndex, 'Total questions:', QUIZ_QUESTIONS.length);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => {
        console.log('➡️ Moving to question index:', prev + 1);
        return prev + 1;
      });
      setShowResult(false);
    } else {
      console.log('🏁 Quiz completed, moving to result state');
      // Quiz completed
      setCurrentState('result');
    }
  };

  const handleQuizRestart = () => {
    setCurrentState('score');
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setLoadingPercentage(0);
  };

  const calculateQuizScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === QUIZ_QUESTIONS[index].correctAnswer ? 1 : 0);
    }, 0);
  };
  console.log(currentState)

  if (currentState === 'quiz') {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;

    console.log('📝 Rendering quiz question:', {
      currentQuestionIndex,
      questionId: currentQuestion?.id,
      questionText: currentQuestion?.question?.substring(0, 50) + '...',
      totalQuestions: QUIZ_QUESTIONS.length,
      isLastQuestion
    });

    return (
      <QuizCard
        question={currentQuestion}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={QUIZ_QUESTIONS.length}
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        correctAnswer={currentQuestion.correctAnswer}
        onAnswerSelect={handleAnswerSelect}
        showResult={showResult}
        onNext={handleNextQuestion}
        onRestart={handleQuizRestart}
        isLastQuestion={isLastQuestion}
        autoNextDelay={autoNextDelay}
      />
    );
  }

  if (currentState === 'result') {
    const score = calculateQuizScore();
    const result = getQuizResult(score, QUIZ_QUESTIONS.length);

    return (
      <QuizResult
        result={result}
        onRestart={handleQuizRestart}
      />
    );
  }

  // Score state (default)
  return (
    <div className="score-card">
      <AnimatedIcon>
        {trophyIcon}
      </AnimatedIcon>
      <h1 className="score-title">
        Καταπληκτική δουλειά στο εργοστάσιο!
      </h1>
      <div className="bullet-points">
        {bulletPoints.map((point, index) => (
          <BulletPoint key={index} text={point} />
        ))}
      </div>
      <FilledButton
        text="Προχωράμε στο κουίζ"
        onClick={handleQuizStart}
        loadingPercentage={loadingPercentage}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM10 16.875C8.64026 16.875 7.31105 16.4718 6.18046 15.7164C5.04987 14.9609 4.16868 13.8872 3.64833 12.6309C3.12798 11.3747 2.99183 9.99237 3.2571 8.65875C3.52238 7.32513 4.17716 6.10013 5.13864 5.13864C6.10013 4.17716 7.32514 3.52237 8.65876 3.2571C9.99238 2.99183 11.3747 3.12798 12.631 3.64833C13.8872 4.16868 14.9609 5.04987 15.7164 6.18045C16.4718 7.31104 16.875 8.64025 16.875 10C16.8729 11.8227 16.1479 13.5702 14.8591 14.8591C13.5702 16.1479 11.8227 16.8729 10 16.875ZM13.5672 9.55781C13.6253 9.61586 13.6714 9.68479 13.7029 9.76066C13.7343 9.83654 13.7505 9.91787 13.7505 10C13.7505 10.0821 13.7343 10.1635 13.7029 10.2393C13.6714 10.3152 13.6253 10.3841 13.5672 10.4422L11.0672 12.9422C10.9499 13.0595 10.7909 13.1253 10.625 13.1253C10.4592 13.1253 10.3001 13.0595 10.1828 12.9422C10.0655 12.8249 9.99966 12.6659 9.99966 12.5C9.99966 12.3341 10.0655 12.1751 10.1828 12.0578L11.6164 10.625H6.875C6.70924 10.625 6.55027 10.5592 6.43306 10.4419C6.31585 10.3247 6.25 10.1658 6.25 10C6.25 9.83424 6.31585 9.67527 6.43306 9.55806C6.55027 9.44085 6.70924 9.375 6.875 9.375H11.6164L10.1828 7.94219C10.0655 7.82491 9.99966 7.66585 9.99966 7.5C9.99966 7.33415 10.0655 7.17509 10.1828 7.05781C10.3001 6.94054 10.4592 6.87465 10.625 6.87465C10.7909 6.87465 10.9499 6.94054 11.0672 7.05781L13.5672 9.55781Z" fill="#1A1A1A" />
          </svg>
        }
      />
      <FilledButton
        text="Πάμε ξανά"
        onClick={onRestart}
        variant="secondary"
        icon={restartIcon}
      />
    </div>
  );
};
