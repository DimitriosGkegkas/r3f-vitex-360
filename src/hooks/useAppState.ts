import { useState, useCallback } from 'react';
import { ImageLoadResult } from '../utils/imagePreloader';

export interface TooltipData {
  title: string;
  isVisible: boolean;
}

export interface VisitedStep {
  floorId: string;
  stepId: string;
}

export interface FloorVideoData {
  floorIndex: number;
  floorTitle: string;
  floorNumber: string;
}

export interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
  currentImage?: string;
}

export const useAppState = () => {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'experience' | 'completion'>('welcome');
  const [currentFloorId, setCurrentFloorId] = useState<string>('raw-materials');
  const [currentStepId, setCurrentStepId] = useState<string>('step_5_1');
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [visitedSteps, setVisitedSteps] = useState<VisitedStep[]>([]);
  const [isWelcomeDissolving, setIsWelcomeDissolving] = useState(false);
  const [preloadResults, setPreloadResults] = useState<ImageLoadResult[]>([]);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState<PreloadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0
  });
  const [showScoreCard, setShowScoreCard] = useState(false);
  const [showFloorVideo, setShowFloorVideo] = useState(false);
  const [floorVideoData, setFloorVideoData] = useState<FloorVideoData | null>(null);

  const handlePreloadProgress = useCallback((progress: PreloadProgress) => {
    console.log('📊 App: Preload progress update', progress);
    setPreloadProgress(progress);
  }, []);

  const handlePreloadComplete = useCallback((results: ImageLoadResult[]) => {
    console.log('🎉 App: Preload completed with results:', results);
    setPreloadResults(results);
    setImagesPreloaded(true);
    setIsPreloading(false);

    // Log detailed preload statistics
    const loaded = results.filter(r => r.loaded).length;
    const failed = results.filter(r => !r.loaded).length;
    const total = results.length;

    console.log(`📈 App: Preload Statistics - ${loaded}/${total} loaded, ${failed} failed`);

    // Log failed images for debugging
    if (failed > 0) {
      console.warn('⚠️ App: Failed to preload images:', results.filter(r => !r.loaded));
    }

    // Expose preload results to window for debugging
    (window as any).preloadResults = results;
    (window as any).imagesPreloaded = true;
    console.log('🔧 Debug: Preload results available at window.preloadResults');
  }, []);

  return {
    // State
    currentPage,
    currentFloorId,
    currentStepId,
    tooltip,
    visitedSteps,
    isWelcomeDissolving,
    preloadResults,
    imagesPreloaded,
    isPreloading,
    preloadProgress,
    showScoreCard,
    showFloorVideo,
    floorVideoData,

    // Setters
    setCurrentPage,
    setCurrentFloorId,
    setCurrentStepId,
    setTooltip,
    setVisitedSteps,
    setIsWelcomeDissolving,
    setShowScoreCard,
    setShowFloorVideo,
    setFloorVideoData,

    // Handlers
    handlePreloadProgress,
    handlePreloadComplete,
  };
};
