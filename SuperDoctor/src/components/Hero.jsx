import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroHeader from './HeroHeader';
import AboutSection from './AboutSection';

export default function SuperDoctorPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Calculate shrink progress
      const shrinkRange = 500; 
      const progress = Math.min(currentScroll / shrinkRange, 1);
      setScrollProgress(progress);

      // Trigger Navbar
      const triggerHeight = window.innerHeight * 0.7;
      setShowNavbar(currentScroll >= triggerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 1 - scrollProgress * 0.25;
  const borderRadius = `${scrollProgress * 24}px`; 
  const opacity = 1 - scrollProgress * 0.2;

  return (
    <div className="block w-full min-h-screen bg-[#050911] text-white relative select-none overflow-x-hidden">
      
      {/* 1. Dynamic Slide-Down Navigation Bar */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Navbar />
      </div>

      {/* 2. Full Fit Iframe Canvas Container */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050911]">
        <div 
          className="w-full h-full transition-all duration-75 ease-out origin-center z-10"
          style={{
            transform: `scale(${scale})`,
            borderRadius: borderRadius,
            opacity: opacity,
            overflow: 'hidden', // This acts as the "mask"
            boxShadow: scrollProgress > 0.1 ? '0 40px 100px -20px rgba(0, 0, 0, 0.9)' : 'none',
          }}
        >
          {/* 
              The Magic: 
              1. Height is 110% to ensure the bottom 10% (where watermark lives) is outside the div.
              2. Object-fit and pointer-events ensure it behaves like a background.
          */}
          <iframe
            src="https://biggest-partners-756052.framer.app/"
            title="Framer Hero Section"
            className="w-full h-[110%] border-none pointer-events-auto"
            style={{
              marginTop: "-2%", // Slight offset to hide potential top bars
              height: "112%",   // Extra height to push the badge far down
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>

      {/* 3. Hero Header Component */}
      <div className="relative z-20">
         <HeroHeader />
      </div>

      {/* 4. The About Section */}
      <div className="relative z-20 bg-[#050911]">
        <AboutSection />
      </div>
    </div>
  );
}