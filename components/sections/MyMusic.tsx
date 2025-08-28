"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import TrackModal from "./TrackModal";
import { FaPlay } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MyMusic() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<any | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) console.error("Errore fetch tracks:", error.message);
      else setTracks(data || []);
    };
    fetchTracks();
  }, []);

  return (
    <section
      id="my-music"
      className="
      w-full h-auto px-4 pt-32 sm:pt-40 pb-20
      md:h-screen md:flex md:flex-col md:justify-center md:items-center
    "
    >
      {/* Titolo + descrizione */}
      <div className="text-center mb-10 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          My Music
        </h2>
        <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
          Una selezione di <span className="text-red-500 font-semibold">produzioni</span> e <span className="text-red-500 font-semibold">progetti</span> che raccontano il mio percorso musicale.
        </p>
      </div>

      {/* Griglia tracce */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl auto-rows-fr">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => setSelectedTrack(track)}
            className="cursor-pointer rounded-2xl overflow-hidden group"
          >
            {/* MOBILE */}
            <div className="flex md:hidden items-center justify-center p-3 bg-gradient-to-br from-red-600 to-red-800 min-h-[8rem]">
              <h3 className="text-white text-sm sm:text-base font-semibold text-center">
                {track.title}
              </h3>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex flex-col bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-red-500/30 hover:scale-105 transition">
              <div className="relative h-40 bg-neutral-800 flex items-center justify-center">
                {track.artwork_url ? (
                  <img
                    src={track.artwork_url}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaPlay className="text-white text-2xl opacity-80 group-hover:opacity-100 transition" />
                )}
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {track.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {track.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTrack && (
        <TrackModal track={selectedTrack} onClose={() => setSelectedTrack(null)} />
      )}
    </section>
  );

}
