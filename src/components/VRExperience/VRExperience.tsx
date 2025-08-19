import React, { useState, useEffect } from 'react';
import { XRStore } from '@react-three/xr';
import './VRExperience.css';

// Custom VR Button Component
export const CustomVRButton: React.FC<{ xrStore: XRStore }> = ({ xrStore }) => {
    const [isVRSupported, setIsVRSupported] = useState(false);
    const [isInVR, setIsInVR] = useState(false);

    useEffect(() => {
        // Check if WebXR is supported
        if ('xr' in navigator) {
            navigator.xr?.isSessionSupported('immersive-vr').then((supported) => {
                setIsVRSupported(supported);
            });
        }
    }, []);

    const handleVRButtonClick = async () => {
        if (isVRSupported && !isInVR) {
            try {
                await xrStore.enterVR();
                setIsInVR(true);
                console.log('VR session started successfully');
            } catch (error) {
                console.error('Failed to enter VR:', error);
                setIsInVR(false);
            }
        } else if (isInVR) {
            try {
                await xrStore.exitVR();
                setIsInVR(false);
                console.log('VR session ended');
            } catch (error) {
                console.error('Failed to exit VR:', error);
            }
        }
    };

    if (!isVRSupported) {
        return (
            <button className="vr-button-disabled" disabled>
                VR Not Supported
            </button>
        );
    }

    return (
        <button
            className="vr-button"
            onClick={handleVRButtonClick}
        >
            {isInVR ? 'Exit VR' : 'Enter VR'}
        </button>
    );
};

