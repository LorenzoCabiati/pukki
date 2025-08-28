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

  // scroll con wheel (desktop)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return; // solo desktop
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0 && activeSection < sections.length - 1) {
        setActiveSection((prev) => prev + 1);
      } else if (e.deltaY < 0 && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection]);

  // scrollIntoView fluido solo su desktop
  useEffect(() => {
    if (window.innerWidth >= 768) {
      const section = document.getElementById(sections[activeSection]);
      section?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  return (
    <PlasmaBackground>
      {/* Navbar e indicatori collegati allo stato */}
      <Navbar sections={sections} activeSection={activeSection} goTo={setActiveSection} />
      <SectionIndicators sections={sections} activeSection={activeSection} goTo={setActiveSection} />
      <ScrollToTopButton activeSection={activeSection} goTo={setActiveSection} />

      {/* Wrapper principale scroll libero su mobile */}
      <div className="w-full h-auto">
        <Home />
        <MyMusic />
        <Bio />
        <Contact />
      </div>
    </PlasmaBackground>
  );
}
