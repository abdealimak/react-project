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
      
      // 1. Calculate shrink progress for the iframe (completes over 500px of scroll)
      const shrinkRange = 500; 
      const progress = Math.min(currentScroll / shrinkRange, 1);
      setScrollProgress(progress);

      // 2. Trigger Navbar visibility once user scrolls past 70% of the viewport height
      const triggerHeight = window.innerHeight * 0.7;
      if (currentScroll >= triggerHeight) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interpolated visual values for the shrinking iframe container
  const scale = 1 - scrollProgress * 0.25; // Scales down from 1 to 0.75
  const borderRadius = `${scrollProgress * 24}px`; 
  const opacity = 1 - scrollProgress * 0.2; // Subtle blending fade

  return (
    <div className="block w-full min-h-screen bg-[#050911] text-white relative select-none overflow-x-hidden">
      
      {/* 1. Dynamic Slide-Down Navigation Bar (Appears when scrolling to About Section) */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Navbar />
      </div>

      {/* 2. Brand New Hero Header Component (At the very top) */}
      <HeroHeader />

      {/* 3. Minimizing Iframe Canvas - Dynamic Height Calculation */}
      <div className="relative w-full h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden bg-[#050911]">
        <div 
          className="w-full h-full transition-all duration-75 ease-out origin-center z-10"
          style={{
            transform: `scale(${scale})`,
            borderRadius: borderRadius,
            opacity: opacity,
            overflow: 'hidden',
            boxShadow: scrollProgress > 0.1 ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : 'none',
          }}
        >
          <iframe
            src="https://biggest-partners-756052.framer.app/"
            title="Framer Hero Section"
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>

      {/* 4. The About Section */}
      <div className="relative z-20 bg-[#050911]">
        <AboutSection />
      </div>
    </div>
  );
}