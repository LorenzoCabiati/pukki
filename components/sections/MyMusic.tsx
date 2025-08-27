"use client";

import { useState } from "react";
import TrackModal from "./TrackModal";

export default function MyMusic() {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  return (
    <section
      id="my-music"
      className="h-auto min-h-screen w-screen flex flex-col items-center justify-center px-4 md:px-16 py-10 relative"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-10">
        My Music
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            onClick={() => setSelectedTrack(i + 1)}
            className="cursor-pointer relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            {/* MOBILE: solo nome centrato */}
            <div className="flex items-center justify-center h-32 sm:h-40 md:hidden bg-gradient-to-br from-red-600 to-red-800">
              <h3 className="text-lg font-semibold text-white">
                Track {i + 1}
              </h3>
            </div>

            {/* DESKTOP: layout originale */}
            <div className="hidden md:block bg-neutral-800 rounded-2xl overflow-hidden">
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
          </div>
        ))}
      </div>

      {selectedTrack && (
        <TrackModal trackId={selectedTrack} onClose={() => setSelectedTrack(null)} />
      )}
    </section>
  );
}
