import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: "Peter P.",
    role: "Daily Bugle Photographer",
    quote: "Usually, I'm the one saving people, but when I caught that flu, SuperDoc got a medic to my door faster than I could swing across Queens.",
    color: "#e21b1b"
  },
  {
    name: "Mary Jane",
    role: "Actress",
    quote: "The Real-Time Queue status is a lifesaver. I can finish my rehearsals and walk into the clinic right as they call my name.",
    color: "#2b59c3"
  },
  {
    name: "Harry O.",
    role: "CEO, Oscorp",
    quote: "The Secure Health Vault is top-tier. Managing my family’s medical history has never been this organized or secure.",
    color: "#e21b1b"
  },
  {
    name: "Gwen S.",
    role: "Researcher",
    quote: "Smart Symptom Triage actually understands medical nuance. It routed me to a specialist immediately. Very impressive tech.",
    color: "#2b59c3"
  }
];

export default function Testimonials() {
  const [scale, setScale] = useState(0.85);
  const [opacity, setOpacity] = useState(0.5);
  const containerRef = useRef(null);

  useEffect(() => {
    const styleId = 'testimonial-loop-style';
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.type = "text/css";
      styleSheet.innerText = `
        @keyframes marqueeLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marqueeLoop 40s linear infinite;
        }
        .testimonial-track:hover .animate-marquee-infinite {
          animation-play-state: paused;
        }
      `;
      document.head.appendChild(styleSheet);
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - elementCenter);
      
      const progress = Math.max(0, 1 - distance / 700);
      setScale(0.85 + progress * 0.15);
      setOpacity(0.5 + progress * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section 
      ref={containerRef}
      id="reviews"
      className="py-24 bg-[#050911] overflow-hidden transition-all duration-500 ease-out origin-center"
      style={{ transform: `scale(${scale})`, opacity: opacity }}
    >
      <div className="max-w-7xl mx-auto px-8 mb-16 text-center md:text-left">
        <span className="text-xs font-bold tracking-[0.4em] text-[#2b59c3] uppercase">
          Community Feedback
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mt-4 text-white uppercase leading-none">
          VOICES FROM THE <span className="text-[#e21b1b]">WEB</span>
        </h2>
      </div>

      {/* FIX: Added py-12 to the track container to prevent vertical cutting.
          Added overflow-visible to the child div so the shadows can bleed into the padding.
      */}
      <div className="testimonial-track relative w-full flex overflow-hidden group py-12">
        <div className="animate-marquee-infinite gap-8 px-4 overflow-visible">
          {doubledTestimonials.map((t, i) => (
            <div 
              key={i}
              className="w-[320px] md:w-[450px] relative group/card cursor-pointer shrink-0 overflow-visible"
            >
              {/* Outer Glow */}
              <div 
                className="absolute -inset-1 rounded-2xl opacity-10 group-hover/card:opacity-60 transition duration-500 blur-lg"
                style={{ backgroundColor: t.color }}
              ></div>
              
              <div className="relative bg-[#0d1527]/90 backdrop-blur-md border border-slate-800 p-8 rounded-2xl h-full flex flex-col justify-between transition-all duration-300 group-hover/card:border-slate-600 group-hover/card:-translate-y-2">
                <div>
                  <div className="text-5xl font-serif text-slate-700 mb-2" style={{ color: `${t.color}44` }}>“</div>
                  <p className="text-slate-300 text-base md:text-lg font-medium italic leading-relaxed">
                    {t.quote}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-tight text-sm">{t.name}</h4>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}