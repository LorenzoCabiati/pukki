"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import TracksTable from "./components/TracksTable";

interface Track {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  audioUrl: string;
  author: string;
  genres: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [globalVolume, setGlobalVolume] = useState(1);

  const pageCount = Math.ceil(tracks.length / rowsPerPage);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.replace("/login");
      else setUser(user);
    };
    checkUser();
  }, [router, supabase]);

  useEffect(() => {
    const fetchTracks = async () => {
      const { data, error } = await supabase
        .from("tracks")
        .select("id, title, description, artwork_url, audio_url, author");

      if (error) return console.error(error);

      setTracks(
        data?.map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          coverUrl: t.artwork_url,
          audioUrl: t.audio_url,
          author: t.author,
          genres: "",
        })) || []
      );
    };
    fetchTracks();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar
          user={user}
          globalVolume={globalVolume}
          setGlobalVolume={setGlobalVolume}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 overflow-auto space-y-6">
          <TracksTable
            tracks={tracks}
            globalVolume={globalVolume}
            currentPage={currentPage}
            pageCount={pageCount}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
