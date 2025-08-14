import React from 'react';
import { Header } from '../Header';
import { WelcomeCard } from '../WelcomeCard';
import './LoadingPage.css';

interface LoadingPageProps {
  onStart?: () => void;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ onStart }) => {
  return (
    <div className="loading-page">
      <Header />
      <WelcomeCard onStart={onStart} />
    </div>
  );
};
