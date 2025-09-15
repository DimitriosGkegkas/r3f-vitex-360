import { useCallback } from 'react';
import { floors } from '../config';
import { FloorVideoData } from './useAppState';

// Mapping from floor IDs to video indices
const floorVideoMapping: Record<string, number> = {
  'raw-materials': 5,
  'sorting': 4,
  'quantities': 3,
  'secrets': 2,
  'mixing': 1,
  'packaging': 0
};

interface UseFloorVideoProps {
  setShowFloorVideo: (show: boolean) => void;
  setFloorVideoData: (data: FloorVideoData | null) => void;
}

export const useFloorVideo = ({
  setShowFloorVideo,
  setFloorVideoData,
}: UseFloorVideoProps) => {
  
  const showFloorVideo = useCallback((floorId: string, isActualFloorChange = true) => {
    console.log(`🎬 Floor change request: ${floorId}, isActualFloorChange: ${isActualFloorChange}`);
    
    if (isActualFloorChange && floorVideoMapping[floorId] !== undefined) {
      const floor = floors[floorId];
      if (floor) {
        const videoIndex = floorVideoMapping[floorId];
        console.log(`🎬 Showing video for floor ${floorId}: floor-${videoIndex}.mp4`);
        
        setFloorVideoData({
          floorIndex: videoIndex,
          floorTitle: floor.title,
          floorNumber: floor.floorNumber
        });
        setShowFloorVideo(true);
      }
    }
  }, [setFloorVideoData, setShowFloorVideo]);

  const hideFloorVideo = useCallback(() => {
    setShowFloorVideo(false);
    setFloorVideoData(null);
  }, [setShowFloorVideo, setFloorVideoData]);

  return {
    showFloorVideo,
    hideFloorVideo,
    floorVideoMapping,
  };
};
