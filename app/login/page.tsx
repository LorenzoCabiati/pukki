"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Se l’utente è già loggato → redirect alla home
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.replace("/"); // puoi cambiare con "/dashboard" se preferisci
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md bg-neutral-800 p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Accedi all’area riservata
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="p-3 rounded-md bg-neutral-700 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="p-3 rounded-md bg-neutral-700 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}
