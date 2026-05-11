import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-8 py-4 bg-[#050911]/95 backdrop-blur-md border-b border-slate-800/80 shrink-0 gap-4 md:gap-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      
      {/* Brand Logo & Spidey Tagline */}
      <div className="flex flex-col items-center md:items-start space-y-1">
        <div className="flex items-center space-x-3">
          
          {/* Custom Medical Plus + Superhero Spider Logo */}
          <svg 
            className="w-8 h-8 text-[#e21b1b] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* The Outer Web-Shield connecting the corners */}
            <path d="M8 3 L3 8 M16 3 L21 8 M3 16 L8 21 M21 16 L16 21" stroke="#2b59c3" strokeWidth="1" opacity="0.6" />
            <path d="M12 5 L5 12 L12 19 L19 12 Z" stroke="#2b59c3" strokeWidth="1" opacity="0.4" />
            
            {/* The Medical Plus Sign */}
            <path 
              d="M10 3 H14 V8 H19 V12 H14 V17 H10 V12 H5 V8 H10 Z" 
              fill="#e21b1b" 
              stroke="#0d1527" 
              strokeWidth="1"
            />
            
            {/* Stylized Spider Hourglass */}
            <path d="M12 5 V17" stroke="#ffffff" strokeWidth="1.2" />
            <path d="M7 10 H17" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="12" cy="10" r="1.5" fill="#ffffff" />
          </svg>

          {/* SUPERDOC Typography - Styled with identical Drop Shadows from the Header */}
          <span className="text-3xl font-black tracking-tighter text-[#e21b1b] drop-shadow-[0_2.5px_0px_#2b59c3] select-none font-sans">
            SUPER<span className="text-white">DOC</span>
          </span>
        </div>

        {/* Brand Tagline */}
        <span className="text-[10px] md:text-xs font-semibold text-slate-400 italic tracking-wide">
          "Your Friendly Neighbourhood SuperDoc"
        </span>
      </div>
      
      {/* Healthcare Portal Navigation Links */}
      <div className="flex space-x-6 lg:space-x-8 text-xs lg:text-sm font-semibold text-slate-300">
        <a href="#find-doctors" className="hover:text-[#e21b1b] transition-all duration-200 tracking-wider uppercase">
          Find Doctors
        </a>
        <a href="#services" className="hover:text-[#2b59c3] transition-all duration-200 tracking-wider uppercase">
          Services
        </a>
        <a href="#virtual-care" className="hover:text-[#e21b1b] transition-all duration-200 tracking-wider uppercase">
          Virtual Care
        </a>
        <a href="#how-it-works" className="hover:text-[#2b59c3] transition-all duration-200 tracking-wider uppercase">
          How It Works
        </a>
      </div>
      
      {/* Spidey Red Action Button */}
      <button className="relative overflow-hidden bg-gradient-to-r from-[#e21b1b] to-[#b11313] hover:from-[#2b59c3] hover:to-[#1e4193] text-white font-black tracking-wider uppercase px-6 py-2.5 rounded-md text-sm border-b-4 border-black/30 hover:border-black/50 shadow-[0_4px_14px_rgba(226,27,27,0.4)] active:translate-y-0.5 active:border-b-2 transition-all duration-200">
        Book Appointment
      </button>
    </nav>
  );
}