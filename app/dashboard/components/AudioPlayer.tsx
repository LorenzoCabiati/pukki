"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface AudioPlayerProps {
  src: string;
  globalVolume: number;
}

export default function AudioPlayer({ src, globalVolume }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = globalVolume;

    const updateProgress = () => setProgress(audio.currentTime);
    audio.addEventListener("timeupdate", updateProgress);

    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [globalVolume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  };

  const handleSliderChange = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white"
      >
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <input
        type="range"
        min={0}
        max={audioRef.current?.duration || 100}
        value={progress}
        onChange={(e) => handleSliderChange(Number(e.target.value))}
        className="flex-1 h-1 rounded-lg accent-red-500"
      />
      <audio ref={audioRef} src={src} className="hidden" />
    </div>
  );
}
