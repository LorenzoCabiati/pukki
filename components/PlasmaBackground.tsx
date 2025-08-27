"use client";

import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function PlasmaBackground({ children }: Props) {
  const [plasma, setPlasma] = useState({
    x: 50,
    y: 50,
    x2: 30,
    y2: 70,
    x3: 70,
    y3: 30,
  });

  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 0.01;
      setPlasma({
        x: 50 + 15 * Math.cos(angle * 0.7),
        y: 50 + 15 * Math.sin(angle * 1.1),
        x2: 30 + 10 * Math.sin(angle * 1.3),
        y2: 70 + 10 * Math.cos(angle * 0.8),
        x3: 70 + 12 * Math.cos(angle * 1.5),
        y3: 30 + 12 * Math.sin(angle * 0.9),
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const plasmaStyle: React.CSSProperties = {
    background: `
      radial-gradient(circle at ${plasma.x}% ${plasma.y}%, rgba(239,68,68,0.18), transparent 60%),
      radial-gradient(circle at ${plasma.x2}% ${plasma.y2}%, rgba(220,50,50,0.12), transparent 55%),
      radial-gradient(circle at ${plasma.x3}% ${plasma.y3}%, rgba(200,30,30,0.10), transparent 60%),
      #070707
    `,
    transition: "background 0.8s ease-out",
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans text-gray-200" style={plasmaStyle}>
      {children}
    </div>
  );
}
