import React from 'react';
import { Header } from '../Header';
import { WelcomeCard } from '../WelcomeCard';
import './LoadingPage.css';

interface LoadingPageProps {
  onStart?: () => void;
  isDissolving?: boolean;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ onStart, isDissolving = false }) => {
  return (
    <div className={`loading-page ${isDissolving ? 'dissolving' : ''}`}>
      <Header />
      <WelcomeCard onStart={onStart} />
    </div>
  );
};
