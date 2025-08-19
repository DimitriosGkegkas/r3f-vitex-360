import React, { useState } from 'react';
import './VRToggle.css';

interface VRToggleProps {
  onToggle: (isVR: boolean) => void;
  isVRSupported: boolean;
}

export const VRToggle: React.FC<VRToggleProps> = ({ onToggle, isVRSupported }) => {
  const [isVRMode, setIsVRMode] = useState(false);

  const handleToggle = () => {
    if (isVRSupported) {
      const newMode = !isVRMode;
      setIsVRMode(newMode);
      onToggle(newMode);
    }
  };

  if (!isVRSupported) {
    return (
      <div className="vr-toggle-disabled">
        <span className="vr-icon">🥽</span>
        <span className="vr-text">VR Not Supported</span>
      </div>
    );
  }

  return (
    <div className="vr-toggle">
      <button
        className={`vr-toggle-button ${isVRMode ? 'vr-active' : ''}`}
        onClick={handleToggle}
        title={isVRMode ? 'Switch to Desktop Mode' : 'Switch to VR Mode'}
      >
        <span className="vr-icon">
          {isVRMode ? '🖥️' : '🥽'}
        </span>
        <span className="vr-text">
          {isVRMode ? 'Desktop' : 'VR'}
        </span>
      </button>
      
      {isVRMode && (
        <div className="vr-tooltip">
          <p>VR Mode Active</p>
          <p>Use your VR headset and controllers</p>
        </div>
      )}
    </div>
  );
};
