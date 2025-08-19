import React, { useEffect, useState } from 'react';
import './Tooltip.css';

interface TooltipProps {
  title?: string;
  isVisible?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ title, isVisible }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position when tooltip is visible
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };


    document.addEventListener('mousemove', handleMouseMove);


    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  // if (!isVisible) return null;

  return (
    <div
      className="tooltip"
      style={{
        left: mousePosition.x + 15,
        top: mousePosition.y - 10,
        display: isVisible ? 'block' : 'none'
      }}
    >
      {title}
    </div>
  );
};

export default Tooltip;
