import { useRef, useState, useCallback, useEffect } from "react";

export function useBGM(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => setIsLoaded(true));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  const fadeIn = useCallback((duration = 1500) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
    const step = 0.3 / (duration / 50);
    const interval = setInterval(() => {
      if (!audioRef.current) return clearInterval(interval);
      if (audio.volume < 0.3) audio.volume = Math.min(0.3, audio.volume + step);
      else clearInterval(interval);
    }, 50);
  }, []);

  const fadeOut = useCallback((duration = 1000) => {
    const audio = audioRef.current;
    if (!audio) return;
    const step = audio.volume / (duration / 50);
    const interval = setInterval(() => {
      if (!audioRef.current) return clearInterval(interval);
      if (audio.volume > 0) audio.volume = Math.max(0, audio.volume - step);
      else {
        audio.pause();
        clearInterval(interval);
      }
    }, 50);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) fadeIn();
      else fadeOut();
      return next;
    });
  }, [fadeIn, fadeOut]);

  return { isPlaying, isLoaded, toggle };
}
