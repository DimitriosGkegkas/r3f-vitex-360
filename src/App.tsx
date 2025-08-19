import React, { useState } from 'react';
import { LoadingPage, Experience, Tooltip } from './components';
import './App.css';

interface TooltipData {
  title: string;
  isVisible: boolean;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'loading' | 'experience'>('loading');
  const [currentStateId, setCurrentStateId] = useState<string>('raw-materials');
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const handleStart = () => {
    console.log('Starting the experience...');
    setCurrentPage('experience');
  };

  const handleStateChange = (newStateId: string) => {
    setCurrentStateId(newStateId);
  };

  return (
    <div className="App">
      {currentPage === 'loading' ? (
        <LoadingPage onStart={handleStart} />
      ) : (
        <div className="experience-container">
          <Experience
            currentStateId={currentStateId}
            onStateChange={handleStateChange}
            onTooltipChange={setTooltip}
          />

          {/* Render tooltip outside the canvas */}

          <Tooltip
            title={tooltip?.title}
            isVisible={tooltip?.isVisible}
          />

        </div>
      )}
    </div>
  );
};

export default App;
