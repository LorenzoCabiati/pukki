"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import SectionIndicators from "@/components/SectionIndicators";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import PlasmaBackground from "@/components/PlasmaBackground";

import Home from "@/components/sections/Home";
import Bio from "@/components/sections/Bio";
import MyMusic from "@/components/sections/MyMusic";
import Contact from "@/components/sections/Contact";

const sections = ["home", "my-music", "bio", "contact"];

export default function Page() {
  const [activeSection, setActiveSection] = useState(0);
  const isScrolling = useRef(false);
  const touchStartY = useRef<number | null>(null);

  // scroll con wheel (desktop)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0 && activeSection < sections.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 500); // tempo leggermente più breve per scroll più fluido
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection]);

  // scroll con swipe (mobile)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) < 50) return;

      if (diff > 0 && activeSection < sections.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (diff < 0 && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
      }

      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection]);

  // scrollIntoView fluido
  useEffect(() => {
    const section = document.getElementById(sections[activeSection]);
    section?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeSection]);

  return (
    <PlasmaBackground>
      <Navbar sections={sections} activeSection={activeSection} goTo={setActiveSection} />
      <SectionIndicators sections={sections} activeSection={activeSection} goTo={setActiveSection} />
      <ScrollToTopButton activeSection={activeSection} goTo={setActiveSection} />

      {/* h-screen + overflow-hidden per evitare scroll extra su mobile */}
      <div className="w-screen h-screen overflow-hidden md:h-screen md:overflow-hidden">
        <Home />
        <MyMusic />
        <Bio />
        <Contact />
      </div>
    </PlasmaBackground>
  );
}
