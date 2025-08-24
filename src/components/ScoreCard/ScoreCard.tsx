import React from 'react';
import { AnimatedIcon } from '../AnimatedIcon';
import { BulletPoint } from '../BulletPoint';
import { StartButton } from '../StartButton';
import './ScoreCard.css';

interface ScoreCardProps {
  visitedCount: number;
  totalPossibleSteps: number;
  dailyProduction: number;
  onRestart: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ 
  visitedCount, 
  totalPossibleSteps, 
  dailyProduction, 
  onRestart 
}) => {
  const scorePercentage = Math.round((visitedCount / totalPossibleSteps) * 100);
  
  const bulletPoints = [
    `Αξιοποίησες ${visitedCount} από τα ${totalPossibleSteps} κρυφά μυστικά της Vitex και θα μπορούσες να παράξεις ${dailyProduction.toLocaleString()} σακιά την ημέρα.`,
    'Το νέο εργοστάσιο της Vitex μπορεί μέχρι και τα 5.000.000 σακιά τον χρόνο.',
    `Συνολική επίδοση: ${scorePercentage}%`
  ];

  const trophyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 9H4.5C4.10217 9 3.72064 8.84196 3.43934 8.56066C3.15804 8.27936 3 7.89783 3 7.5V6C3 5.60217 3.15804 5.22064 3.43934 4.93934C3.72064 4.65804 4.10217 4.5 4.5 4.5H6M18 9H19.5C19.8978 9 20.2794 8.84196 20.5607 8.56066C20.842 8.27936 21 7.89783 21 7.5V6C21 5.60217 20.842 5.22064 20.5607 4.93934C20.2794 4.65804 19.8978 4.5 19.5 4.5H18M12 9V12M12 12L14 14M12 12L10 14M12 12V15M12 15C12 15.5523 11.5523 16 11 16H10C9.44772 16 9 15.5523 9 15V14H7V15C7 16.6569 8.34315 18 10 18H11C12.6569 18 14 16.6569 14 15V14H16V15C16 15.5523 15.5523 16 15 16H14C13.4477 16 13 15.5523 13 15V12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V15" stroke="#1088F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

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
      <StartButton onClick={onRestart} text="Πάμε ξανά" />
    </div>
  );
};
