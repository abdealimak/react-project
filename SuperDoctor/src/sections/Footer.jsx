import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#03060a] border-t border-slate-800 py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        
        {/* CONSISTENT BRANDING */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center space-x-3 mb-4">
            <svg 
              className="w-7 h-7 text-[#e21b1b]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M8 3 L3 8 M16 3 L21 8 M3 16 L8 21 M21 16 L16 21" stroke="#2b59c3" strokeWidth="1" opacity="0.6" />
              <circle cx="12" cy="12" r="3" stroke="#e21b1b" strokeWidth="2" />
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" />
            </svg>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
              Super<span className="text-[#e21b1b]">Doc</span>
            </span>
          </div>
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] leading-loose max-w-xs">
            © 2026 SUPERDOC MEDICAL NETWORK.<br /> 
            WITH GREAT POWER, COMES GREAT MEDICAL RESPONSIBILITY.
          </p>
        </div>
        
        {/* SECONDARY LINKS */}
        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <a href="#home" className="hover:text-[#e21b1b] transition-colors">Privacy Shield</a>
          <a href="#home" className="hover:text-[#2b59c3] transition-colors">Liability Terms</a>
          <a href="#home" className="hover:text-white transition-colors">Contact The Web</a>
        </div>
      </div>
    </footer>
  );
}