import React from 'react';

export default function Navbar() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#050911]/95 backdrop-blur-md border-b border-slate-800/80 shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      
      {/* LEFT: BRAND LOGO */}
      <div 
        className="flex flex-col items-start cursor-pointer" 
        onClick={(e) => scrollToSection(e, 'home')}
      >
        <div className="flex items-center space-x-3">
          <svg 
            className="w-8 h-8 text-[#e21b1b] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-110" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M8 3 L3 8 M16 3 L21 8 M3 16 L8 21 M21 16 L16 21" stroke="#2b59c3" strokeWidth="1" opacity="0.6" />
            <circle cx="12" cy="12" r="3" stroke="#e21b1b" strokeWidth="2" fill="#050911" />
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" />
          </svg>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            Super<span className="text-[#e21b1b]">Doc</span>
          </span>
        </div>
      </div>

      {/* CENTER: BRAND QUOTE */}
      <div className="hidden lg:block">
        <span className="text-[10px] md:text-xs font-bold text-slate-500 italic tracking-[0.2em] uppercase opacity-70">
          "Your Friendly Neighbourhood SuperDoc"
        </span>
      </div>
      
      {/* RIGHT: NAVIGATION */}
      <div className="flex items-center space-x-8 text-xs font-semibold text-slate-300">
        <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-[#e21b1b] transition-all duration-200 tracking-wider uppercase">Features</a>
        <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')} className="hover:text-[#2b59c3] transition-all duration-200 tracking-wider uppercase">Reviews</a>
        <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-[#e21b1b] transition-all duration-200 tracking-wider uppercase">FAQ</a>
        <a href="#portal" onClick={(e) => scrollToSection(e, 'portal')} className="hover:text-[#2b59c3] transition-all duration-200 tracking-wider uppercase">Portal</a>
      </div>
      
    </nav>
  );
}