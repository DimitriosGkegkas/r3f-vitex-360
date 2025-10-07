import React, { useRef, useEffect, useState, useCallback } from 'react';
import './FloorVideoCard.css';

interface FloorVideoCardProps {
  floorIndex: number;
  onVideoEnd: () => void;
  isVisible: boolean;
  muted: boolean;
}

export const FloorVideoCard: React.FC<FloorVideoCardProps> = ({
  floorIndex,
  onVideoEnd,
  isVisible,
  muted
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);

  const videoSrc = `/floors-videos/floor-${floorIndex}.mp4`;

  const handleFadeOut = useCallback(() => {
    setIsFadingOut(true);
    // Wait for fade-out animation to complete before calling onVideoEnd
    setTimeout(() => {
      onVideoEnd();
    }, 400); // Match the CSS animation duration
  }, [onVideoEnd]);

  const handlePlayClick = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setNeedsUserInteraction(false);
    } catch (error) {
      console.error('Error playing video:', error);
      setHasError(true);
    }
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    // Only close if clicking on the overlay background, not on the video card itself
    if (e.target === e.currentTarget) {
      handleFadeOut();
    }
  }, [handleFadeOut]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    let isComponentMounted = true;
    let loadingTimeout: number;

    const handleLoadedData = () => {
      if (!isComponentMounted) return;
      console.log(`Video loaded successfully: ${videoSrc}`);
      setIsLoading(false);
      setHasError(false);
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };

    const handleError = (event?: Event) => {
      if (!isComponentMounted) return;
      console.error(`Failed to load video: ${videoSrc}`, event);
      setHasError(true);
      setIsLoading(false);
      if (loadingTimeout) clearTimeout(loadingTimeout);
      // Auto-close on error after a brief delay
      setTimeout(() => {
        if (isComponentMounted) {
          handleFadeOut();
        }
      }, 1500);
    };

    const handleEnded = () => {
      if (!isComponentMounted) return;
      console.log(`Video ended: ${videoSrc}`);
      handleFadeOut();
    };

    const handleCanPlay = () => {
      if (!isComponentMounted) return;
      // Try to play the video once it can play
      video.play().catch(error => {
        console.log('Autoplay prevented, user interaction required:', error);
        if (isComponentMounted) {
          setNeedsUserInteraction(true);
          setIsLoading(false);
        }
      });
    };

    const handlePlay = () => {
      if (!isComponentMounted) return;
      setNeedsUserInteraction(false);
    };

    const handlePause = () => {
      if (!isComponentMounted) return;
      // Video paused, but we don't need to track this state
    };

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Set a timeout to auto-close if video doesn't load within 10 seconds
    loadingTimeout = setTimeout(() => {
      if (isComponentMounted && isLoading) {
        console.warn(`Video loading timeout: ${videoSrc}`);
        handleError();
      }
    }, 10000);

    // Start loading the video
    video.load();

    return () => {
      isComponentMounted = false;
      if (loadingTimeout) clearTimeout(loadingTimeout);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      // Pause video when component unmounts to prevent AbortError
      video.pause();
    };
  }, [isVisible, videoSrc, handleFadeOut, isLoading]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`floor-video-card-overlay ${isFadingOut ? 'fade-out' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`floor-video-card ${isFadingOut ? 'fade-out' : ''}`}>
        <div className="floor-video-container">
          {isLoading && (
            <div className="floor-video-loading">
              <div className="loading-spinner"></div>
              <span>Φόρτωση βίντεο...</span>
            </div>
          )}
          
          {hasError && (
            <div className="floor-video-error">
              <span>Σφάλμα φόρτωσης βίντεο</span>
            </div>
          )}

          {needsUserInteraction && (
            <div className="floor-video-play-button" onClick={handlePlayClick}>
              <div className="play-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                </svg>
              </div>
              <span>Πατήστε για αναπαραγωγή</span>
            </div>
          )}
          
          <video
            ref={videoRef}
            className={`floor-video ${isLoading ? 'loading' : ''}`}
            muted={muted}
            controls={false}
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

        </div>
      </div>
    </div>
  );
};
