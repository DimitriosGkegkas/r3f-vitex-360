import React, { useState } from 'react';
import { LoadingPage, Experience } from './components';
import Image360Viewer, { TestImage360Viewer } from './components/Image360Viewer/Image360Viewer';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'loading' | 'experience'>('loading');
  const [currentStateId, setCurrentStateId] = useState<string>('raw-materials');

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
          />

        </div>
      )}
    </div>
  );
};

export default App;
