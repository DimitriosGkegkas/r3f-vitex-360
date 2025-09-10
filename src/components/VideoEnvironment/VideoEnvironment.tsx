import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { getColorSpaceConfig } from '../../config/colorSpace';

interface VideoEnvironmentProps {
  src: string;
  quality?: 'low' | 'medium' | 'high'; // Quality preset
}

const VideoEnvironment: React.FC<VideoEnvironmentProps> = React.memo(({ 
  src, 
  quality = 'medium'
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.VideoTexture | null>(null);
  
  // Quality presets for different performance levels
  const qualitySettings = {
    low: { resolution: 512, segments: [32, 16] },
    medium: { resolution: 1024, segments: [64, 32] },
    high: { resolution: 2048, segments: [128, 64] }
  };
  
  const settings = qualitySettings[quality];
  const colorSpaceConfig = getColorSpaceConfig();
  
  // Create video texture only when src changes
  const videoTex = useMemo(() => {
    // Clean up previous video and texture
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current.load();
    }
    if (textureRef.current) {
      textureRef.current.dispose();
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
    video.onerror = () => {
      console.error('Video loading error');
    };
    
    const t = new THREE.VideoTexture(video);
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.colorSpace = colorSpaceConfig.videoEnvironment.colorSpace as any;
    t.encoding = colorSpaceConfig.videoEnvironment.encoding as any;
    
    // Store texture reference for cleanup
    textureRef.current = t;
    
    // Start playing the video
    (async () => { 
      try { 
        await video.play(); 
        console.log('Video started playing successfully');
      } catch (error) {
        console.error('Video play error:', error);
      }
    })();
    
    return t;
  }, [src]); // Only depend on src, not onError
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, []);

  return (
    <mesh ref={sphereRef} rotation={[0, Math.PI, 0]}>
      <sphereGeometry args={[50, settings.segments[0], settings.segments[1]]} />
      <meshBasicMaterial 
        map={videoTex} 
        side={THREE.FrontSide} 
        toneMapped={colorSpaceConfig.videoEnvironment.toneMapped}
        colorSpace={colorSpaceConfig.videoEnvironment.colorSpace}
      />
    </mesh>
  );
});

VideoEnvironment.displayName = 'VideoEnvironment';

export default VideoEnvironment;
