import React, { useEffect, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VideoEnvironmentProps {
  src: string;
  background?: boolean;
  env?: boolean;
  updateHz?: number;
  onError?: () => void;
}

const VideoEnvironment: React.FC<VideoEnvironmentProps> = ({ 
  src, 
  background = true, 
  env = true, 
  updateHz = 10, 
  onError 
}) => {
  const { gl, scene } = useThree();
  const pmrem = useMemo(() => new THREE.PMREMGenerator(gl), [gl]);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  const videoTex = useMemo(() => {
    const video = document.createElement('video');
    video.src = src;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('webkit-playsinline', 'true');
    
    // Add error handling
    video.onerror = () => {
      console.error('Video loading error');
      onError?.();
    };
    
    const t = new THREE.VideoTexture(video);
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.colorSpace = THREE.SRGBColorSpace;
    
    // Start playing the video
    (async () => { 
      try { 
        await video.play(); 
        console.log('Video started playing successfully');
      } catch (error) {
        console.error('Video play error:', error);
        onError?.();
      }
    })();
    
    return t;
  }, [src, onError]);

  // Throttled PMREM update
  const lastRef = useRef(0);
  
  useEffect(() => () => pmrem.dispose(), [pmrem]);

  useFrame((_, dt) => {
    if (!env) return;
    lastRef.current += dt;
    if (lastRef.current >= 1 / updateHz) {
      lastRef.current = 0;
      // Recompute prefiltered env from current video frame
      const rt = pmrem.fromEquirectangular(videoTex);
      const envTex = rt.texture;
      // Assign to scene.environment (and optionally background)
      scene.environment = envTex;
      if (!background) {
        // If not using sphere background, you can set the background directly:
        scene.background = envTex;
      }
      // Release previous targets automatically; keep the latest one
    }
  });

  return background ? (
    <mesh ref={sphereRef} rotation={[0, Math.PI, 0]}>
      <sphereGeometry args={[50, 60, 40]} />
      <meshBasicMaterial map={videoTex} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  ) : null;
};

export default VideoEnvironment;
