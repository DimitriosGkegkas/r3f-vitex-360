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

  const restartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M1 4V10H7M19 16V10H13M13 10L19 4M7 10L1 16" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

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
