import React from 'react';
import { Header } from '../Header';
import { WelcomeCard } from '../WelcomeCard';
import { ProgressBar } from '../ProgressBar';
import { ImageLoadResult } from '../../utils/imagePreloader';
import './LoadingPage.css';

interface LoadingPageProps {
  onStart?: () => void;
  isDissolving?: boolean;
  isPreloading?: boolean;
  preloadResults?: ImageLoadResult[];
  preloadProgress?: { loaded: number; total: number; percentage: number; currentImage?: string };
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  onStart, 
  isDissolving = false,
  isPreloading = false,
  preloadResults = [],
  preloadProgress
}) => {
  // Handle start button click
  const handleStart = () => {
    console.log('🎯 LoadingPage: Start button clicked');
    if (onStart) {
      onStart();
    }
  };

  // Use real-time progress if available, otherwise calculate from results
  const getProgressStats = () => {
    if (preloadProgress) {
      // Use real-time progress data
      const failed = preloadResults.length > 0 ? preloadResults.filter(r => !r.loaded).length : 0;
      return {
        loaded: preloadProgress.loaded,
        total: preloadProgress.total,
        failed,
        percentage: preloadProgress.percentage,
        currentImage: preloadProgress.currentImage
      };
    }
    
    // Fallback to calculating from preload results
    if (!preloadResults.length) {
      return { loaded: 0, total: 0, failed: 0, percentage: 0 };
    }
    
    const loaded = preloadResults.filter(r => r.loaded).length;
    const failed = preloadResults.filter(r => !r.loaded).length;
    const total = preloadResults.length;
    const percentage = total > 0 ? Math.round((loaded / total) * 100) : 0;
    
    return { loaded, total, failed, percentage };
  };

  const progressStats = getProgressStats();

  return (
    <div className={`loading-page ${isDissolving ? 'dissolving' : ''}`}>
      <Header />
      {/* Always show welcome card */}
      <WelcomeCard onStart={handleStart} loadingPercentage={progressStats.percentage} />
    </div>
  );
};
