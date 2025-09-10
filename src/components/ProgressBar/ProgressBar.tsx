import React from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
  percentage: number;
  currentItem?: string;
  loaded: number;
  total: number;
  failed?: number;
  showDetails?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  currentItem,
  loaded,
  total,
  failed = 0,
  showDetails = true
}) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-header">
        <h3 className="progress-title">Φόρτωση περιβάλλοντος...</h3>
        {showDetails && (
          <div className="progress-stats">
            <span className="progress-count">{loaded}/{total}</span>
            {failed > 0 && (
              <span className="progress-failed">({failed} απέτυχαν)</span>
            )}
          </div>
        )}
      </div>
      
      <div className="progress-bar-wrapper">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
        <div className="progress-bar-bg" />
      </div>
      
      <div className="progress-percentage">
        {percentage}%
      </div>
      
      {currentItem && (
        <div className="progress-current-item">
          <span className="progress-current-label">Φορτώνει:</span>
          <span className="progress-current-text">{currentItem}</span>
        </div>
      )}
      
      {showDetails && (
        <div className="progress-details">
          <div className="progress-detail-item">
            <span className="progress-detail-label">Επιτυχημένα:</span>
            <span className="progress-detail-value success">{loaded}</span>
          </div>
          {failed > 0 && (
            <div className="progress-detail-item">
              <span className="progress-detail-label">Απέτυχαν:</span>
              <span className="progress-detail-value error">{failed}</span>
            </div>
          )}
          <div className="progress-detail-item">
            <span className="progress-detail-label">Συνολικά:</span>
            <span className="progress-detail-value">{total}</span>
          </div>
        </div>
      )}
    </div>
  );
};
