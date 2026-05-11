import React from 'react';

export default function SuperDoctorPage() {
  return (
    <div className="h-screen w-screen bg-[#07130e] text-white flex flex-col overflow-hidden">
      
      {/* 1. SEAMLESS NAVIGATION BAR MATCHED TO HERO COSTUME */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#0a1c14]/95 backdrop-blur-md border-b border-[#1b3d2d] shrink-0">
        
        {/* Brand Logo matching the armor colors */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#3be8b0] to-[#d1a153] bg-clip-text text-transparent">
            SUPER<span className="text-white">DOCTOR</span>
          </span>
        </div>
        
        {/* Navigation Links with armor-gold hover effect */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-300">
          <a href="#features" className="hover:text-[#3be8b0] transition-all duration-200">Services</a>
          <a href="#pricing" className="hover:text-[#3be8b0] transition-all duration-200">Doctors</a>
          <a href="#about" className="hover:text-[#3be8b0] transition-all duration-200">About</a>
        </div>
        
        {/* Booking Button styled like the emerald/gold chestplate */}
        <button className="bg-gradient-to-r from-[#1b3d2d] to-[#0a1c14] hover:from-[#275941] hover:to-[#132c20] border border-[#d1a153] text-[#d1a153] hover:text-white shadow-lg shadow-emerald-950/50 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95">
          Book Appointment
        </button>
      </nav>

      {/* 2. THE HERO SECTION FRAME (Watermark cut off from bottom-right) */}
      <div className="flex-grow w-full relative overflow-hidden bg-white">
        <iframe
          src="https://biggest-partners-756052.framer.app/"
          title="Framer Hero Section"
          className="w-full h-full border-none select-none"
          /* This clip-path cuts off the bottom-right corner where the badge floats */
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 90%, 90% 100%, 0% 100%)',
            width: '100%',
            height: '100%',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

    </div>
  );
}