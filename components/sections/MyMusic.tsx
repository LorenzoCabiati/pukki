"use client";

import { useState } from "react";
import TrackModal from "./TrackModal";

export default function MyMusic() {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  return (
    <section
      id="my-music"
      className="h-screen w-screen flex flex-col items-center justify-center px-6 md:px-16 relative"
    >
      <h2 className="text-4xl font-bold text-white mb-10">My Music</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            onClick={() => setSelectedTrack(i + 1)}
            className="cursor-pointer bg-neutral-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all"
          >
            <div className="h-40 bg-gradient-to-br from-red-600 to-red-800"></div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2">
                Track {i + 1}
              </h3>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedTrack && (
        <TrackModal trackId={selectedTrack} onClose={() => setSelectedTrack(null)} />
      )}
    </section>
  );
}
