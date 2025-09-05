import React, { useRef } from 'react';
import './VideoBackground.css';

interface VideoBackgroundProps {
  videoSrc: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  autoplay = true,
  muted = true,
  loop = true,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`video-background ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        playsInline
        className="video-background-video"
      />
    </div>
  );
};