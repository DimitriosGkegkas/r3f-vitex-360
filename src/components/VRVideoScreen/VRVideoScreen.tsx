import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface VRVideoScreenProps {
    floorIndex: number;
    onVideoEnd: () => void;
    isVisible: boolean;
    distance?: number; // Distance from user in VR
    width?: number; // Screen width in VR
    height?: number; // Screen height in VR
    curve?: number; // Curvature of the screen (0 = flat, higher = more curved)
}

export const VRVideoScreen: React.FC<VRVideoScreenProps> = ({
    floorIndex,
    onVideoEnd,
    isVisible,
    distance = 3, // 3 meters in front of user
    width = 4, // 4 meters wide
    height = 2.25, // 16:9 aspect ratio
    curve: _curve = 0.3 // Slight curve (unused for now)
}) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const textureRef = useRef<THREE.VideoTexture | null>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const cylinderMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
    const { camera } = useThree();
    
    const fadeMeshRef = useRef<THREE.Mesh>(null);

    // Fade animation state
    const [fadeOpacity, setFadeOpacity] = useState(0);
    const [shouldFadeIn, setShouldFadeIn] = useState(false);
    const [shouldFadeOut, setShouldFadeOut] = useState(false);


    // Track user position and rotation for screen positioning
    const updateScreenPosition = () => {
        if (!meshRef.current) return;

        // Ensure video texture updates
        if (videoTexture) {
            videoTexture.needsUpdate = true;
        }

        // Get camera position and orientation
        const headPosition = new THREE.Vector3();
        const headQuaternion = new THREE.Quaternion();

        camera.getWorldPosition(headPosition);
        camera.getWorldQuaternion(headQuaternion);

        // Forward vector (camera looking direction)
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(headQuaternion);
        forward.y = 0;
        forward.normalize();

        // Calculate screen position
        const screenPosition = headPosition.clone().add(forward.multiplyScalar(distance));

        // Apply position
        meshRef.current.position.copy(screenPosition);
        meshRef.current.lookAt(headPosition);
    };

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const videoSrc = `/floors-videos/floor-${floorIndex}.mp4`;

    // Handle fade in/out animation
    useFrame((_state, delta) => {
        if (shouldFadeIn && fadeOpacity < 1) {
            const newOpacity = Math.min(1, fadeOpacity + delta * 2); // 2 = fade speed
            setFadeOpacity(newOpacity);
            if (cylinderMaterialRef.current) {
                cylinderMaterialRef.current.opacity = newOpacity;
            }
        } else if (shouldFadeOut && fadeOpacity > 0) {
            const newOpacity = Math.max(0, fadeOpacity - delta * 2); // 2 = fade speed
            setFadeOpacity(newOpacity);
            if (cylinderMaterialRef.current) {
                cylinderMaterialRef.current.opacity = newOpacity;
            }
        }
        if (fadeMeshRef.current && fadeMeshRef.current.material) {
            (fadeMeshRef.current.material as THREE.MeshBasicMaterial).opacity = fadeOpacity;
        }
    });

    // Handle visibility changes
    useEffect(() => {
        if (isVisible) {
            setShouldFadeIn(true);
            setShouldFadeOut(false);
        } else {
            setShouldFadeIn(false);
            setShouldFadeOut(true);
        }
    }, [isVisible]);

    // Create video texture using VideoEnvironment pattern (without state updates)
    const videoTexture = useMemo(() => {
        if (!isVisible) return null;

        console.log('🎥 VRVideoScreen: Creating video texture for src:', videoSrc);

        // Clean up previous video and texture
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.removeAttribute('src');
            videoRef.current.load();
            videoRef.current = null;
        }
        if (textureRef.current) {
            textureRef.current.dispose();
            textureRef.current = null;
        }

        const video = document.createElement('video');
        video.src = videoSrc;
        video.crossOrigin = 'anonymous';
        video.loop = false; // Disable loop so video can end and auto-remove
        video.muted = false; // Enable audio
        video.playsInline = true;
        video.preload = 'auto';
        video.setAttribute('webkit-playsinline', 'true');

        // Store video reference for cleanup
        videoRef.current = video;

        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.colorSpace = THREE.SRGBColorSpace;

        // Store texture reference for cleanup
        textureRef.current = texture;

        return texture;
    }, [isVisible, videoSrc]);

    // Handle video events and state updates
    useEffect(() => {
        if (!videoRef.current || !isVisible) return;

        const video = videoRef.current;

        // Add error handling
        const handleError = (error: Event) => {
            console.error('VR Video loading error:', error);
            console.error('VR Video src:', videoSrc);
            console.error('VR Video error details:', {
                networkState: video.networkState,
                readyState: video.readyState,
                error: video.error
            });
            setHasError(true);
            setIsLoading(false);
        };

        // Add ready event handlers
        const handleCanPlay = () => {
            console.log('🎬 VRVideoScreen: Video can play');
            setIsLoading(false);
            setHasError(false);
        };

        const handleLoadedData = () => {
            console.log('🎬 VRVideoScreen: Video data loaded');
            console.log('Video dimensions:', video.videoWidth, 'x', video.videoHeight);
            console.log('Video duration:', video.duration);
        };

        const handleEnded = () => {
            console.log('🎬 VRVideoScreen: Video ended');
            onVideoEnd();
        };

        // Add event listeners
        video.addEventListener('error', handleError);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('ended', handleEnded);
        updateScreenPosition();
        // Start playing the video
        video.play().catch(error => {
            console.error('Error playing VR video:', error);
            setHasError(true);
            setIsLoading(false);
        });

        return () => {
            video.removeEventListener('error', handleError);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('ended', handleEnded);
        };
    }, [isVisible, videoSrc, onVideoEnd]);

    // Cleanup effect
    useEffect(() => {
        console.log('VRVideoScreen: Cleanup effect');
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
            if (textureRef.current) {
                textureRef.current.dispose();
            }
        };
    }, []);





    if (!isVisible) {
        return null;
    }

    return (
        <>
            <mesh ref={meshRef} > {/* Test position - 5 units in front */}
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial
                    ref={materialRef}
                    map={videoTexture || undefined}
                    transparent={true}
                    opacity={isLoading || hasError ? 0.5 : 1.0}
                    side={THREE.DoubleSide}
                    color={0xffffff} // Always white background
                />
            </mesh>
            <mesh ref={fadeMeshRef} position={[0, 1.6, 0]} scale={10}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="white" transparent opacity={0} side={THREE.DoubleSide} />
            </mesh>
        </>
    );
};

export default VRVideoScreen;
