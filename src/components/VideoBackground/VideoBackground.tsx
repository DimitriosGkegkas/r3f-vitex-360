import React, { useRef, useState, useEffect } from 'react';
import './VideoBackground.css';

interface VideoBackgroundProps {
  videoSrc: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  onVideoEnd?: () => void;
  onSkip?: () => void;
  showSkipButton?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  autoplay = true,
  muted = true,
  loop = true,
  className = '',
  onVideoEnd,
  onSkip,
  showSkipButton = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isDissolving, setIsDissolving] = useState(false);

  const handleVideoEnd = () => {
    if (!loop) {
      setIsDissolving(true);
      setTimeout(() => {
        setIsVisible(false);
        onVideoEnd?.();
      }, 1000); // 1 second dissolve animation
    }
  };

  const handleSkip = () => {
    setIsDissolving(true);
    setTimeout(() => {
      setIsVisible(false);
      onSkip?.();
    }, 1000); // 1 second dissolve animation
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`video-background ${className} ${isDissolving ? 'dissolving' : ''}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        playsInline
        className="video-background-video"
      />
      {showSkipButton && (
        <button 
          className="skip-button"
          onClick={handleSkip}
          aria-label="Skip video"
        >
          Skip
        </button>
      )}
    </div>
  );
};