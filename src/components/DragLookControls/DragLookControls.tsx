import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Floor, environments } from '../../config';

interface DragLookControlsProps {
  floor?: Floor;
  stepId?: string;
  isInVR?: boolean;
}

const DragLookControls: React.FC<DragLookControlsProps> = ({ floor, stepId, isInVR }) => {
  const { camera, gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const prevMouse = useRef({ x: 0, y: 0 });

  // store yaw/pitch separately
  const yaw = useRef(0);
  const pitch = useRef(0);

  // target yaw/pitch when state changes
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);

  const onPointerDown = useCallback((e: MouseEvent | TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    prevMouse.current = { x: clientX, y: clientY };
    
    // Prevent default touch behavior to avoid scrolling
    if ('touches' in e) {
      e.preventDefault();
    }
  }, []);

  const onPointerUp = useCallback(() => setIsDragging(false), []);

  const onPointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const deltaX = clientX - prevMouse.current.x;
      const deltaY = clientY - prevMouse.current.y;
      prevMouse.current = { x: clientX, y: clientY };

      const sensitivity = 0.002;

      targetYaw.current += deltaX * sensitivity; // left/right
      targetPitch.current += deltaY * sensitivity; // up/down

      // targetYaw.current = Math.PI/2;
      // targetPitch.current = 0

      // clamp target pitch
      const limit = Math.PI / 2 - 0.1;
      targetPitch.current = Math.max(-limit, Math.min(limit, targetPitch.current));
      
      // Prevent default touch behavior to avoid scrolling
      if ('touches' in e) {
        e.preventDefault();
      }
    },
    [isDragging]
  );

  const environmentId = useMemo(() => {
    if (floor && stepId) {
      const step = floor.steps.find(s => s.id === stepId);
      return step?.environmentId;
    }
    return null;
  }, [floor, stepId]);

  // Track previous environment ID to detect changes
  const prevEnvironmentId = useRef<string | null>(null);

  // When floor or step changes, set new target pitch and yaw
  useEffect(() => {
    if (environmentId) {
      const environment = environments[environmentId || ''];
      const environmentChanged = prevEnvironmentId.current !== environmentId;

      if (environmentChanged) {
        // Environment changed: use environment's default camera angles
        if (environment.cameraAngle !== undefined) {
          targetPitch.current = -(environment.cameraAngle * Math.PI) / 180;
          pitch.current = targetPitch.current;
        }
        if (environment.cameraYaw !== undefined) {
          targetYaw.current = Math.PI - (environment.cameraYaw * Math.PI) / 180;
          yaw.current = targetYaw.current;
        }
      } else {
        // Environment didn't change but step might have: look for keypoint with matching targetStep
        if (stepId) {
          const keypoint = environment.keypoints.find(kp => kp.targetStep === stepId);
          if (keypoint) {
            targetPitch.current = (keypoint.pitch * Math.PI) / 180;
            targetYaw.current = Math.PI - (keypoint.yaw * Math.PI) / 180;
          }
        }
      }

      // Update previous environment ID
      prevEnvironmentId.current = environmentId;
    }
  }, [environmentId, stepId]);

  // Apply smooth rotation every frame
  useFrame(() => {
    if (isInVR) return;
    // Lerp yaw and pitch towards targets if not dragging

    yaw.current = THREE.MathUtils.lerp(yaw.current, targetYaw.current, 0.05);
    pitch.current = THREE.MathUtils.lerp(pitch.current, targetPitch.current, 0.05);

    // build quaternion from yaw/pitch
    const q = new THREE.Quaternion();
    q.setFromEuler(new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ'));
    camera.quaternion.copy(q);
  });

  // Mouse and touch listeners
  useEffect(() => {
    const dom = gl.domElement;
    
    // Mouse events
    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('mouseleave', onPointerUp);
    dom.addEventListener('mousemove', onPointerMove);
    
    // Touch events
    dom.addEventListener('touchstart', onPointerDown, { passive: false });
    dom.addEventListener('touchend', onPointerUp);
    dom.addEventListener('touchcancel', onPointerUp);
    dom.addEventListener('touchmove', onPointerMove, { passive: false });
    
    return () => {
      // Mouse events
      dom.removeEventListener('mousedown', onPointerDown);
      dom.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('mouseleave', onPointerUp);
      dom.removeEventListener('mousemove', onPointerMove);
      
      // Touch events
      dom.removeEventListener('touchstart', onPointerDown);
      dom.removeEventListener('touchend', onPointerUp);
      dom.removeEventListener('touchcancel', onPointerUp);
      dom.removeEventListener('touchmove', onPointerMove);
    };
  }, [gl, onPointerDown, onPointerUp, onPointerMove]);

  return null;
};

export default DragLookControls;
