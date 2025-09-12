import React from 'react';
import { AnimatedIcon } from '../AnimatedIcon';
import { FilledButton } from '../FilledButton';
import { QuizQuestion } from '../QuizQuestion';
import { QuizQuestion as QuizQuestionType } from '../../config/quizData';
import './QuizCard.css';

interface QuizCardProps {
  question: QuizQuestionType;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer?: number;
  correctAnswer?: number;
  onAnswerSelect: (answerIndex: number) => void;
  showResult: boolean;
  onNext?: () => void;
  onRestart?: () => void;
  isLastQuestion?: boolean;
  autoNextDelay?: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  correctAnswer,
  onAnswerSelect,
  showResult,
  onNext,
  onRestart,
  isLastQuestion = false,
  autoNextDelay = 5000
}) => {
  const quizIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#1088F4"/>
      <path d="M19 15L20.09 19.26L24 20L20.09 20.74L19 25L17.91 20.74L14 20L17.91 19.26L19 15Z" fill="#1088F4"/>
      <path d="M5 15L6.09 19.26L10 20L6.09 20.74L5 25L3.91 20.74L0 20L3.91 19.26L5 15Z" fill="#1088F4"/>
    </svg>
  );

  const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15 5L5 15M5 5L15 15" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const restartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
  <path d="M17 7.99999C17.0002 9.97178 16.2239 11.8643 14.8391 13.268C13.4543 14.6716 11.5724 15.4735 9.60078 15.5H9.5C7.58456 15.5048 5.74085 14.7718 4.35156 13.4531C4.2919 13.3967 4.24394 13.3291 4.21042 13.2541C4.17689 13.1791 4.15846 13.0983 4.15618 13.0162C4.15389 12.9341 4.1678 12.8524 4.1971 12.7757C4.2264 12.699 4.27053 12.6288 4.32695 12.5691C4.38338 12.5095 4.45101 12.4615 4.52597 12.428C4.60093 12.3945 4.68176 12.376 4.76385 12.3737C4.84593 12.3715 4.92767 12.3854 5.00438 12.4147C5.08109 12.444 5.15128 12.4881 5.21094 12.5445C6.10453 13.3872 7.22663 13.948 8.43705 14.1567C9.64748 14.3654 10.8926 14.2128 12.0168 13.718C13.141 13.2232 14.0945 12.4081 14.7582 11.3746C15.4218 10.341 15.7663 9.13482 15.7484 7.90666C15.7305 6.6785 15.3512 5.48283 14.6577 4.46902C13.9642 3.45521 12.9874 2.6682 11.8493 2.20632C10.7112 1.74443 9.46216 1.62814 8.25832 1.87198C7.05447 2.11582 5.94916 2.70897 5.08047 3.57733C5.07409 3.58424 5.0673 3.59076 5.06016 3.59686L2.98359 5.49999H5.125C5.29076 5.49999 5.44973 5.56584 5.56694 5.68305C5.68415 5.80026 5.75 5.95923 5.75 6.12499C5.75 6.29075 5.68415 6.44972 5.56694 6.56693C5.44973 6.68414 5.29076 6.74999 5.125 6.74999H1.375C1.20924 6.74999 1.05027 6.68414 0.933058 6.56693C0.815848 6.44972 0.75 6.29075 0.75 6.12499V2.37499C0.75 2.20923 0.815848 2.05026 0.933058 1.93305C1.05027 1.81584 1.20924 1.74999 1.375 1.74999C1.54076 1.74999 1.69973 1.81584 1.81694 1.93305C1.93415 2.05026 2 2.20923 2 2.37499V4.70311L4.20703 2.68749C5.25702 1.64158 6.59333 0.930198 8.04729 0.643138C9.50124 0.356078 11.0077 0.506213 12.3764 1.07459C13.7451 1.64296 14.9147 2.6041 15.7376 3.83667C16.5605 5.06923 16.9998 6.51797 17 7.99999Z" fill="#1A1A1A"/>
</svg>;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <AnimatedIcon>
          {quizIcon}
        </AnimatedIcon>
        <div className="close-button" onClick={onRestart}>
          {closeIcon}
        </div>
      </div>
      
      <QuizQuestion
        question={question}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        selectedAnswer={selectedAnswer}
        correctAnswer={correctAnswer}
        onAnswerSelect={onAnswerSelect}
        showResult={showResult}
        onAutoNext={!isLastQuestion ? onNext : undefined}
        autoNextDelay={autoNextDelay}
      />
      
      {showResult && (
        <div className="quiz-actions">
          {isLastQuestion && (
            <FilledButton
              text="Πάμε ξανά"
              onClick={onRestart}
              icon={restartIcon}
            />
          )}
        </div>
      )}
    </div>
  );
};
