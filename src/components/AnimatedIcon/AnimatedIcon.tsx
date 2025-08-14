import React, { useEffect, useState } from 'react';
import './AnimatedIcon.css';

interface AnimatedIconProps {
  children: React.ReactNode;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect (() => {
    setIsAnimating(true);
   }, [])


  return (
    <div className="animated-icon">
      <div className={`icon-background ${isAnimating ? 'animate' : ''}`}></div>
      <div className="icon-overlay">
        <div className="icon-content">
          {children}
        </div>
      </div>
    </div>
  );
};
