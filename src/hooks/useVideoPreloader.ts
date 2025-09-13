// useVideoPreloader.ts
import { useEffect } from "react";

export function useVideoPreloader() {
  useEffect(() => {
    const videos: HTMLVideoElement[] = [];

    for (let i = 5; i >= 0; i--) {
      const video = document.createElement("video");
      video.src = `/floors-videos/floor-${i}.mp4`;
      video.preload = "auto"; // fully preload
      videos.push(video);
    }

    return () => {
      // optional: clear references
      videos.forEach(v => {
        v.removeAttribute("src");
        v.load();
      });
    };
  }, []);
}
