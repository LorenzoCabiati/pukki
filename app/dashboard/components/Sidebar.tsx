"use client";

import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="w-64 p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start">Gestisci Tracce</Button>
      </nav>
    </aside>
  );
}
