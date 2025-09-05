import React from 'react';
import { Header } from '../Header';
import { WelcomeCard } from '../WelcomeCard';
import { VideoBackground } from '../VideoBackground';
import './LoadingPage.css';

interface LoadingPageProps {
  onStart?: () => void;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ onStart }) => {
  return (
    <div className="loading-page">
      <VideoBackground 
        videoSrc="/video/intro_drone.mp4" 
        className="loading-page-bg"
        autoplay={true}
        muted={true}
        loop={true}
      />
      <Header />
      <WelcomeCard onStart={onStart} />
    </div>
  );
};
