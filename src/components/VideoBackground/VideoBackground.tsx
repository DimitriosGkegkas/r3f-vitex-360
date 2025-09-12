import React, { useRef, useState, useEffect } from 'react';
import './VideoBackground.css';

interface VideoBackgroundProps {
  videoSrc: string;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  onVideoEnd?: () => void;
  onSkip?: () => void;
  showVideo?: boolean;
  showSkipButton?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  muted = true,
  loop = true,
  className = '',
  onVideoEnd,
  onSkip,
  showVideo,
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

  // Effect to handle showVideo prop changes
  useEffect(() => {
    const video = videoRef.current;
    if (video && showVideo) {
      // When showVideo becomes true, start playing the video
      console.log('🎬 VideoBackground: Starting video playback');
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    } else if (video && !showVideo) {
      // When showVideo becomes false, pause the video
      console.log('🎬 VideoBackground: Pausing video playback');
      video.pause();
    }
  }, [showVideo]);
  if (!isVisible) {
    return null;
  }

  return (
    <div className={`video-background ${className} ${isDissolving ? 'dissolving' : ''}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={false}
        muted={muted}
        loop={loop}
        playsInline
        className="video-background-video"
      />
      {showSkipButton && (
        <div
          className="skip-button"
          onClick={handleSkip}
          aria-label="Skip video"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSkip();
            }
          }}
        >
          <div className="skip-button-content">
            <div className="skip-button-icon">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.625 0.5C12.4592 0.5 12.3003 0.565848 12.1831 0.683058C12.0658 0.800269 12 0.95924 12 1.125V6.53359L2.65859 0.691406C2.47047 0.573311 2.2542 0.507647 2.03217 0.501214C1.81014 0.49478 1.59043 0.547811 1.39579 0.654815C1.20114 0.761819 1.03863 0.918906 0.925089 1.10981C0.811547 1.30072 0.751098 1.51851 0.75 1.74063V14.2594C0.752335 14.481 0.81355 14.698 0.927374 14.8882C1.0412 15.0783 1.20354 15.2348 1.39776 15.3416C1.59197 15.4484 1.81109 15.5016 2.03264 15.4958C2.2542 15.49 2.47023 15.4254 2.65859 15.3086L12 9.46641V14.875C12 15.0408 12.0658 15.1997 12.1831 15.3169C12.3003 15.4342 12.4592 15.5 12.625 15.5C12.7908 15.5 12.9497 15.4342 13.0669 15.3169C13.1842 15.1997 13.25 15.0408 13.25 14.875V1.125C13.25 0.95924 13.1842 0.800269 13.0669 0.683058C12.9497 0.565848 12.7908 0.5 12.625 0.5ZM2 14.2445V1.75391L11.9875 8.00391L2 14.2445Z" fill="#1A1A1A" />
              </svg>

            </div>
            <div className="skip-button-text">Παράλειψη</div>
          </div>
        </div>
      )}
    </div>
  );
};