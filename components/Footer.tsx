"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Footer() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

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

  return (
    <footer className="w-full border-t border-neutral-800 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        
        {/* Left: Copyright + social */}
        <div className="flex items-center gap-6">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://lorenzocabiati.github.io/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition font-medium"
            >
              Lorenzo Cabiati
            </a>
            . All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 text-lg">
            <a
              href="mailto:lollo.cabiatida04@gmail.com"
              className="hover:text-red-500 transition"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/lorenzo-cabiati/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right: Login / User info */}
        <div>
          {user ? (
            <span className="text-sm text-gray-400">
              Accesso effettuato come:{" "}
              <span className="font-medium text-white">{user.email}</span>
            </span>
          ) : (
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-red-500 transition font-medium"
            >
              Accedi all’area riservata
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
