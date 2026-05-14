import React, { useEffect } from 'react';

export default function HeroHeader() {
  useEffect(() => {
    // Dynamic styles for smooth marquee transitions with matching speeds
    // Added .group-hover rules to pause the animations on hover
    const styleId = 'clean-marquee-style';
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.type = "text/css";
      styleSheet.innerText = `
        @keyframes scrollLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes scrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-scroll-left {
          display: flex;
          width: max-content;
          animation: scrollLeft 30s linear infinite;
        }
        .animate-scroll-right {
          display: flex;
          width: max-content;
          animation: scrollRight 30s linear infinite;
        }
        /* Pauses the animation smoothly whenever any marquee line is hovered */
        .marquee-row:hover .animate-scroll-left,
        .marquee-row:hover .animate-scroll-right {
          animation-play-state: paused;
          cursor: pointer;
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const textPhrase = "YOUR FRIENDLY NEIGHBOURHOOD SUPERDOC +";

  return (
    <div className="w-full bg-[#050911] py-3 border-b border-slate-800/80 overflow-hidden select-none flex flex-col gap-1.5 relative z-30">
      
      {/* Row 1: Left to Right Marquee */}
      <div className="marquee-row w-full overflow-hidden flex whitespace-nowrap">
        <div className="animate-scroll-right text-xl md:text-3xl font-black tracking-widest text-[#e21b1b] uppercase leading-none">
          <span className="mr-4">{textPhrase}</span>
          <span className="mr-4">{textPhrase}</span>
          <span className="mr-4">{textPhrase}</span>
          <span className="mr-4">{textPhrase}</span>
        </div>
      </div>

      {/* Row 2: Right to Left Marquee */}
      <div className="marquee-row w-full overflow-hidden flex whitespace-nowrap">
        <div className="animate-scroll-left text-xl md:text-3xl font-black tracking-widest text-white uppercase leading-none">
          <span className="mr-4">{textPhrase}</span>
          <span className="mr-4">{textPhrase}</span>
          <span className="mr-4">{textPhrase}</span>
          <span className="mr-4">{textPhrase}</span>
        </div>
      </div>

    </div>
  );
}