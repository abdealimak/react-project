import React, { useEffect, useRef, useState } from 'react';

export default function CTASection() {
  const quoteRef = useRef(null);
  const [quoteScale, setQuoteScale] = useState(0.8);
  const [quoteOpacity, setQuoteOpacity] = useState(0.4);
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!quoteRef.current) return;
      const rect = quoteRef.current.getBoundingClientRect();
      const progress = Math.max(0, 1 - Math.abs((window.innerHeight / 2) - (rect.top + rect.height / 2)) / 500);
      setQuoteScale(0.8 + progress * 0.2);
      setQuoteOpacity(0.4 + progress * 0.6);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="cta" 
      className="relative py-40 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#2b59c3_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <div 
        ref={quoteRef}
        className="relative z-10 text-center transition-all duration-300 ease-out origin-center flex flex-col items-center"
        style={{ transform: `scale(${quoteScale})`, opacity: quoteOpacity }}
      >
        
        

        <blockquote className="text-3xl md:text-6xl font-black italic text-[#e21b1b] uppercase tracking-wider drop-shadow-[0_3.5px_0px_#2b59c3] px-4 max-w-5xl leading-none z-10">
          "With Great Power, Comes Great Medical Responsibility."
        </blockquote>
        
        <p className="text-xs text-slate-500 mt-6 tracking-widest uppercase font-bold opacity-70 mb-14">
          Join the network today. Secure your local health web.
        </p>

        <div className="relative group z-20">
          {/* Button Shadow/Depth */}
          <div className="absolute inset-0 translate-y-1.5 rounded-lg bg-[#931111] transition-all duration-200 group-hover:translate-y-2"></div>
          
          <button
            onClick={() => { 
              setIsPopping(true); 
              setTimeout(() => setIsPopping(false), 450); 
            }}
            className={`relative z-10 block px-8 py-3.5 font-black text-white uppercase tracking-wider rounded-lg bg-[#e21b1b] border-2 border-[#b01414] select-none cursor-pointer transition-all duration-150 ease-out -translate-y-1 hover:-translate-y-1.5 active:translate-y-1 shadow-[0_4px_10px_rgba(226,27,27,0.25)] ${isPopping ? 'animate-pop' : ''}`}
          >
            <span className="flex items-center gap-2.5 text-xs md:text-sm">
              Enter Healthcare Portal
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
        <br></br>
        <br></br>
        {/* NATURAL STICKER: Spider-Man hanging into the section */}
        <img 
          src="https://media.giphy.com/media/kIqoOwOEurUpArjFkn/giphy.gif" 
          alt="Spider-Man Hanging" 
          className="w-24 md:w-32 h-auto -mb-8 drop-shadow-[0_15px_20px_rgba(43,89,195,0.5)] pointer-events-none select-none z-20"
        />
      </div>
    </section>
  );
}