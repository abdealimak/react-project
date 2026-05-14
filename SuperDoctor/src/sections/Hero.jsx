import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import HeroHeader from './HeroHeader';
import AboutSection from './AboutSection';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import CTASection from './CTASection';
import Footer from './Footer';

export default function SuperDoctorPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollProgress(Math.min(currentScroll / 500, 1));
      setShowNavbar(currentScroll >= window.innerHeight * 0.7);
    };

    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="block w-full min-h-screen bg-[#050911] text-white relative select-none overflow-x-hidden">
      
      {/* REFINED SUBTLE GLOW */}
      <div 
        className="pointer-events-none fixed inset-0 z-[60] mix-blend-soft-light opacity-90"
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(43, 89, 195, 0.5) 0%, rgba(43, 89, 195, 0.1) 50%, transparent 100%)`
        }}
      />
      
      <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <Navbar />
      </div>

      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050911]">
        <div 
          className="w-full h-full transition-all duration-75 ease-out origin-center z-10"
          style={{ transform: `scale(${1 - scrollProgress * 0.25})`, opacity: 1 - scrollProgress * 0.2, borderRadius: `${scrollProgress * 24}px`, overflow: 'hidden' }}
        >
          <iframe src="https://biggest-partners-756052.framer.app/" className="w-full h-[112%] border-none" style={{ marginTop: "-2%" }} />
        </div>
      </div>

      <div id="home" className="relative z-20"><HeroHeader /></div>
      <div id="features" className="relative z-20 bg-[#050911]"><AboutSection /></div>
      <div id="reviews" className="relative z-20 bg-[#050911] border-t border-slate-800/50"><Testimonials /></div>
      {/* Section Divider */}
<div className="relative w-full flex justify-center py-12">
  <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent relative">
    {/* Central Glow Point */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#e21b1b] blur-[2px] opacity-50"></div>
  </div>
</div>
      <div id="faq" className="relative z-20 bg-[#050911]"><FAQ /></div>
      {/* Section Divider */}
<div className="relative w-full flex justify-center py-12">
  <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent relative">
    {/* Central Glow Point */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#e21b1b] blur-[2px] opacity-50"></div>
  </div>
</div>
      <div id="portal" className="relative z-20 bg-[#050911]"><CTASection /></div>
      <Footer />
    </div>
  );
}