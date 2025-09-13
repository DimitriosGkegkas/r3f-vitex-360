import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { getColorSpaceConfig } from '../../config/colorSpace';

interface VideoEnvironmentProps {
  src: string;
  quality?: 'low' | 'medium' | 'high'; // Quality preset
  onReady?: () => void;
}

const VideoEnvironment: React.FC<VideoEnvironmentProps> = React.memo(({
  src,
  quality = 'medium',
  onReady
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  // Quality presets for different performance levels
  const qualitySettings = {
    low: { resolution: 512, segments: [128, 64] },
    medium: { resolution: 1024, segments: [128, 64] },
    high: { resolution: 2048, segments: [128, 64] }
  };

  const settings = qualitySettings[quality];
  const colorSpaceConfig = getColorSpaceConfig();

  // Create video texture only when src changes
  const videoTex = useMemo(() => {
    console.log('🎥 VideoEnvironment: Creating video texture for src:', src);

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
    video.src = src;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('webkit-playsinline', 'true');

    // Store video reference for cleanup
    videoRef.current = video;

    // Add error handling
    video.onerror = (error) => {
      console.error('Video loading error:', error);
      console.error('Video src:', src);
      console.error('Video error details:', {
        networkState: video.networkState,
        readyState: video.readyState,
        error: video.error
      });
    };

    // Add ready event handlers
    video.oncanplay = () => {
      console.log('🎬 VideoEnvironment: Video can play, calling onReady');
      if (onReady) {
        onReady();
      }
    };

    video.onloadeddata = () => {
      console.log('🎬 VideoEnvironment: Video data loaded');
    };

    const t = new THREE.VideoTexture(video);
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;

    // Ensure proper color space handling for VR
    if (colorSpaceConfig.videoEnvironment.colorSpace === 'srgb') {
      t.colorSpace = THREE.SRGBColorSpace;
    } else if (colorSpaceConfig.videoEnvironment.colorSpace === 'srgb-linear') {
      t.colorSpace = THREE.LinearSRGBColorSpace;
    } else {
      t.colorSpace = colorSpaceConfig.videoEnvironment.colorSpace as any;
    }

    // Store texture reference for cleanup
    textureRef.current = t;

    videoRef.current.play();


    return t;
  }, [src]); // Only depend on src, not onError

  // Cleanup on unmount
  useEffect(() => {
    return () => {
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
    };
  }, []);

  return (
    <>
      <mesh ref={sphereRef} rotation={[0, Math.PI, 0]} scale={[1, 1, -1]}>
        <sphereGeometry args={[50, settings.segments[0], settings.segments[1]]} />
        <meshBasicMaterial
          map={videoTex}
          side={THREE.DoubleSide}
          toneMapped={colorSpaceConfig.videoEnvironment.toneMapped}
        />
      </mesh>
    </>
  );
});

VideoEnvironment.displayName = 'VideoEnvironment';

export default VideoEnvironment;
