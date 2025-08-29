"use client";

import { useState, useEffect, useRef } from "react";
import { FaInstagram, FaSpotify, FaSoundcloud } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Props = {
  sections: string[];
  activeSection: number;
  goTo: (i: number) => void;
};

export default function Navbar({ sections, activeSection, goTo }: Props) {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
   const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
  };

  const userInitial =
    user?.email?.[0]?.toUpperCase() ?? "";

  return (
    <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-4 z-50 text-lg">
      <div className="grid grid-cols-3 items-center w-full">
        {/* Colonna sinistra: Icona utente */}
        <div className="flex items-center" ref={menuRef}>
          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white font-bold"
              >
                {userInitial}
              </button>

              {menuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-neutral-800 rounded-lg shadow-lg overflow-hidden border border-neutral-700 z-50">
                  <div className="px-4 py-2 text-xs text-gray-400 border-b border-neutral-700">
                    Accesso effettuato come <br />
                    <span className="text-gray-200">{user.email}</span>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700"
                    onClick={() => router.push("/dashboard")}
                  >
                    Accedi all’area protetta
                  </button>
                  <hr className="border-neutral-700" />
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600/20"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Colonna centrale: Section buttons */}
        <div className="hidden md:flex justify-center gap-10">
          {sections.slice(1).map((sec, i) => (
            <button
              key={sec}
              onClick={() => goTo(i + 1)}
              className={`uppercase tracking-wide font-medium transition-colors ${
                activeSection === i + 1
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-400"
              }`}
            >
              {sec.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Colonna destra: Social icons */}
        <div className="flex justify-end gap-4 text-xl">
          <a
            href="https://www.instagram.com/el_nicopukki/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://open.spotify.com/intl-it/artist/6pwPSVxioPenL7Bw5ibuwx"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-green-500 transition-colors"
          >
            <FaSpotify />
          </a>
          <a
            href="https://soundcloud.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            <FaSoundcloud />
          </a>
        </div>
      </div>
    </nav>
  );
}
