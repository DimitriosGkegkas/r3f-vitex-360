import React from 'react';
import './FilledButton.css';

interface FilledButtonProps {
  onClick?: () => void;
  text: string;
  loadingPercentage?: number;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export const FilledButton: React.FC<FilledButtonProps> = ({ 
  onClick, 
  text, 
  loadingPercentage = 0, 
  disabled = false,
  variant = 'primary',
  icon 
}) => {
  return (
    <div 
      className={`filled-button ${variant} ${disabled ? 'disabled' : ''}`} 
      onClick={disabled ? undefined : onClick}
    >
      <div 
        className="button-fill" 
        style={{ width: `${loadingPercentage}%` }}
      />
      <div className="button-content">
        <span className="button-text">{text}</span>
        {icon && <div className="button-icon">{icon}</div>}
      </div>
    </div>
  );
};
