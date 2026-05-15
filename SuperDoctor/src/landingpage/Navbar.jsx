import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const scrollToSection = (e, id) => {
    e.preventDefault();
    // For the "portal" link, we target the CTA section. 
    // Usually, the CTA section doesn't have an ID in your code, 
    // so ensure your CTASection.jsx <section> has id="cta".
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="relative flex items-center justify-between px-8 py-4 bg-[#050911]/95 backdrop-blur-md border-b border-slate-800/80 shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-50">
      
      {/* LEFT: BRAND LOGO */}
      <div 
        className="flex flex-col items-start cursor-pointer relative z-10" 
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


      <div>
        {/* SWINGING SPIDEY STICKER */}
        <img 
          src="https://media.giphy.com/media/0Awb0MITzU2efaxrS2/giphy.gif" 
          alt="Spider-Man Swinging" 
          className="absolute top-0 left-1/2 -translate-x-1/2 h-16 md:h-20 drop-shadow-[0_10px_15px_rgba(43,89,195,0.4)] pointer-events-none select-none"
        />
      </div>
      
      {/* RIGHT: NAVIGATION */}
      <div className="flex items-center space-x-6 md:space-x-8 text-xs font-semibold text-slate-300 relative z-10">
        <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-[#e21b1b] transition-all duration-200 tracking-wider uppercase">Features</a>
        <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')} className="hover:text-[#2b59c3] transition-all duration-200 tracking-wider uppercase">Reviews</a>
        <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-[#e21b1b] transition-all duration-200 tracking-wider uppercase">Support</a>
        
        {/* PORTAL LINK REDIRECTING TO CTA */}
        <button 
          onClick={() => navigate('/dashboard')} 
          className="px-4 py-1.5 border border-[#e21b1b] text-[#e21b1b] rounded-full hover:bg-[#e21b1b] hover:text-white transition-all duration-300 tracking-wider uppercase"
        >
          Portal
        </button>
      </div>
    </nav>
  );
}