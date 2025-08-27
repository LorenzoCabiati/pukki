"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaTimes, FaVolumeUp } from "react-icons/fa";

type Props = {
  trackId: number;
  onClose: () => void;
};

export default function TrackModal({ trackId, onClose }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setVolume(70);
    if (audioRef.current) audioRef.current.volume = 0.7;
  }, [trackId]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    audioRef.current.currentTime = (newProgress / 100) * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
      ></div>

      <div className="fixed inset-10 md:inset-40 bg-neutral-900 rounded-2xl shadow-2xl z-[70] flex flex-col max-w-4xl mx-auto h-auto">
        {/* Header */}
        <div className="relative p-4">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            aria-label="Chiudi dettaglio traccia"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Contenuto principale */}
        <div className="flex flex-col md:flex-row p-6 gap-6">
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square bg-gray-700 rounded-2xl flex items-center justify-center text-gray-400 text-xl">
              Placeholder Image
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-center gap-3 text-gray-300">
            <h3 className="text-2xl font-bold text-white">Track {trackId}</h3>
            <p className="text-sm text-gray-400">Autore: Pukki</p>

            <div className="flex gap-2 flex-wrap">
              {["Electronic", "Synthwave"].map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 text-xs rounded-full bg-neutral-800 text-gray-300 border border-neutral-600"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-gray-300">
              Questa è una descrizione di esempio per la traccia {trackId}. Qui
              puoi aggiungere dettagli sul brano, crediti, strumenti usati,
              note di produzione o il concept dietro al pezzo.
            </p>
          </div>
        </div>

        {/* Barra comandi */}
        <div className="p-4 border-t border-neutral-700 mt-auto">
          <div className="max-w-5xl mx-auto flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="bg-red-600 hover:bg-red-500 text-white p-3 rounded-full"
              aria-label={isPlaying ? "Pausa" : "Riproduci"}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            {/* Barra progresso */}
            <div className="flex-1 flex items-center gap-3">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime((progress / 100) * duration)}
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={handleProgressChange}
                className="w-full"
                aria-label="Avanzamento traccia"
              />
              <span className="text-xs text-gray-400 w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 w-36">
              <FaVolumeUp />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
                className="w-full"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>

        {/* Audio player invisibile */}
        <audio
          ref={audioRef}
          src={`/tracks/track${trackId}.mp3`}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) =>
            setProgress(
              (e.currentTarget.currentTime / e.currentTarget.duration) * 100
            )
          }
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </>
  );
}
