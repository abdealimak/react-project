import React, { useEffect, useRef, useState } from 'react';

// Keep global static animations for hover states, floating, and active press popping
const unifiedAnimationStyles = `
  @keyframes spideyFloat {
    0% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-6px) rotate(0.5deg); }
    66% { transform: translateY(-2px) rotate(-0.5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }

  .animate-spidey-float {
    animation: spideyFloat 8s ease-in-out infinite;
  }

  @keyframes popEffect {
    0% { transform: scale(1); }
    40% { transform: scale(0.92); }
    70% { transform: scale(1.08); }
    100% { transform: scale(1); }
  }

  .animate-pop {
    animation: popEffect 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
`;

export default function AboutSection() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const quoteRef = useRef(null);

  // References for the rows (lines) of cards
  const rowRefs = useRef([]);

  // Track dynamic scales for each section/line
  const [headerScale, setHeaderScale] = useState(0.85);
  const [headerOpacity, setHeaderOpacity] = useState(0.5);
  
  // Track scales for each row (Up to 8 rows maximum depending on screen size)
  const [rowScales, setRowScales] = useState([]);
  
  const [quoteScale, setQuoteScale] = useState(0.8);
  const [quoteOpacity, setQuoteOpacity] = useState(0.4);

  // State to manage button clicking / pop animation trigger
  const [isPopping, setIsPopping] = useState(false);

  const features = [
    {
      title: "Doctor specialty Search",
      desc: "Filter verified neighborhood professionals by exact medical category.",
      icon: ( <svg className="w-8 h-8 text-[#e21b1b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><path d="M11 8v6M8 11h6" /></svg> )
    },
    {
      title: "Calendar Booking",
      desc: "Schedule home consultations or video sessions on an interactive scheduling grid.",
      icon: ( <svg className="w-8 h-8 text-[#2b59c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> )
    },
    {
      title: "Patient Dashboard",
      desc: "Access your clinical history and charts in a secure private vault.",
      icon: ( <svg className="w-8 h-8 text-[#e21b1b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M21 12H3M9 12v9M15 12V3"/></svg> )
    },
    {
      title: "Doctor Availability",
      desc: "See immediate 'On-Duty' signaling lights of local doctors near your block.",
      icon: ( <svg className="w-8 h-8 text-[#2b59c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> )
    },
    {
      title: "Prescription View",
      desc: "Download official digitally signed prescription slips safely.",
      icon: ( <svg className="w-8 h-8 text-[#e21b1b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 12 15 15"></polyline></svg> )
    },
    {
      title: "Online Consultations",
      desc: "Launch high-definition video chat with super-speed data protection.",
      icon: ( <svg className="w-8 h-8 text-[#2b59c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg> )
    },
    {
      title: "Health Articles",
      desc: "acquire daily healthy lifestyle habits written directly by licensed heroes.",
      icon: ( <svg className="w-8 h-8 text-[#e21b1b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21V3M3.284 14.253a9.005 9.005 0 0 1 17.432 0" /></svg> )
    },
    {
      title: "Profile Management",
      desc: "Maintain conditions declarations, personal details, and insurance files.",
      icon: ( <svg className="w-8 h-8 text-[#2b59c3]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> )
    }
  ];

  // Group items dynamically based on current responsive state
  const [groupedFeatures, setGroupedFeatures] = useState([features]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let itemsPerRow = 4; // desktop

      if (width < 640) {
        itemsPerRow = 1; // mobile (sm)
      } else if (width < 1024) {
        itemsPerRow = 2; // tablet (lg)
      }

      // Chunk features array into row groups
      const rows = [];
      for (let i = 0; i < features.length; i += itemsPerRow) {
        rows.push(features.slice(i, i + itemsPerRow));
      }
      setGroupedFeatures(rows);
      setRowScales(new Array(rows.length).fill({ scale: 0.85, opacity: 0.5 }));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call initially on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const styleId = 'about-unified-style';
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.type = "text/css";
      styleSheet.innerText = unifiedAnimationStyles;
      document.head.appendChild(styleSheet);
    }

    const calculateScaleAndOpacity = (element) => {
      if (!element) return { scale: 0.85, opacity: 0.5 };
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      
      const viewportCenter = viewportHeight / 2;
      const distanceToCenter = Math.abs(viewportCenter - elementCenter);
      
      const activeRange = 500;
      const progress = Math.max(0, 1 - distanceToCenter / activeRange);
      
      const scale = 0.85 + progress * 0.20; 
      const opacity = 0.5 + progress * 0.5;

      return { scale, opacity };
    };

    const handleScroll = () => {
      // 1. Scale Header
      if (headerRef.current) {
        const { scale, opacity } = calculateScaleAndOpacity(headerRef.current);
        setHeaderScale(scale);
        setHeaderOpacity(opacity);
      }

      // 2. Scale rows (The entire line scales together!)
      const updatedRowScales = rowRefs.current.map((row) => {
        return calculateScaleAndOpacity(row);
      });
      setRowScales(updatedRowScales);

      // 3. Scale Bottom Quote
      if (quoteRef.current) {
        const { scale, opacity } = calculateScaleAndOpacity(quoteRef.current);
        setQuoteScale(scale);
        setQuoteOpacity(opacity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const styleSheet = document.getElementById(styleId);
      if (styleSheet) document.head.removeChild(styleSheet);
    };
  }, [groupedFeatures]); // Recalculate if grouping rows changes on screen resize

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsPopping(true);
    
    // Smoothly redirect after the visual "pop" animation finishes playing
    setTimeout(() => {
      setIsPopping(false);
      window.location.href = "/portal";
    }, 450);
  };

  return (
    <section 
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full bg-[#050911] text-white py-32 px-8 flex flex-col justify-center overflow-hidden border-t border-slate-800/80 shadow-[0_-30px_50px_rgba(5,9,17,0.9)]"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#e21b1b_1px,transparent_1px)] [background-size:32px_32px]"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Header Block */}
        <div 
          ref={headerRef}
          className="text-center mb-24 transition-all duration-300 ease-out origin-center"
          style={{
            transform: `scale(${headerScale})`,
            opacity: headerOpacity
          }}
        >
          <span className="text-xs font-bold tracking-[0.4em] text-[#e21b1b] uppercase">
            Platform Capabilities
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mt-4 text-white uppercase leading-[0.9] select-none">
            WEAVING A <span className="text-[#e21b1b] drop-shadow-[0_4px_0px_#2b59c3]">HEALTHCARE</span> NET
          </h2>
          <p className="text-slate-400 mt-6 max-w-2xl text-sm md:text-base font-medium mx-auto leading-relaxed opacity-90">
            Just like your friendly neighborhood hero, we are here to support, protect, and connect. No super-strength needed—just super-fast local medical care.
          </p>
        </div>

        {/* Feature Grid with Row wrapper groups */}
        <div className="flex flex-col gap-7 w-full relative mb-16">
          {groupedFeatures.map((rowItems, rowIndex) => {
            const rowState = rowScales[rowIndex] || { scale: 0.85, opacity: 0.5 };
            
            // Calculate grid configuration dynamically to preserve layout
            const gridColsClass = rowItems.length === 4 
              ? "grid-cols-4" 
              : rowItems.length === 2 
                ? "grid-cols-2" 
                : "grid-cols-1";

            return (
              <div
                key={rowIndex}
                ref={(el) => (rowRefs.current[rowIndex] = el)}
                className={`grid ${gridColsClass} gap-7 w-full transition-all duration-300 ease-out origin-center`}
                style={{
                  transform: `scale(${rowState.scale})`,
                  opacity: rowState.opacity,
                }}
              >
                {rowItems.map((item, itemIndex) => {
                  // Reconstruct flat-index for unique float delays
                  const flatIndex = rowIndex * (groupedFeatures[0]?.length || 4) + itemIndex;
                  
                  return (
                    <div 
                      key={itemIndex}
                      className="group interactive-card relative bg-[#0d1527]/80 backdrop-blur-sm border border-slate-800 p-7 rounded-xl transition-all duration-300 ease-out hover:border-[#e21b1b] hover:shadow-[0_0_30px_rgba(226,27,27,0.2)] animate-spidey-float"
                      style={{
                        animationDuration: `${10 + flatIndex * 0.5}s`,
                        animationDelay: `-${flatIndex * 1.2}s`, 
                      }}
                    >
                      {/* Visual Top Highlight Ribbon */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e21b1b] to-[#2b59c3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
                      
                      {/* Icon Box */}
                      <div className="mb-6 bg-[#090e17] w-14 h-14 rounded-lg flex items-center justify-center border border-slate-700/60 transition-all duration-300 group-hover:border-[#e21b1b]/50 group-hover:scale-105">
                        {item.icon}
                      </div>
                      
                      {/* Titles & Desc */}
                      <h3 className="text-xl font-black tracking-tight text-white mb-2 group-hover:text-[#e21b1b] transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Bottom Blockquote & CTA Button */}
        <div 
          ref={quoteRef}
          className="mt-20 text-center transition-all duration-300 ease-out origin-center flex flex-col items-center"
          style={{
            transform: `scale(${quoteScale})`,
            opacity: quoteOpacity
          }}
        >
          <blockquote className="text-xl md:text-4xl font-black italic text-[#e21b1b] uppercase tracking-wider drop-shadow-[0_2.5px_0px_#2b59c3]">
            "With Great Power, Comes Great Medical Responsibility."
          </blockquote>
          <p className="text-xs text-slate-500 mt-3 tracking-widest uppercase font-bold opacity-70 mb-12">
            Join the network today. Secure your local health web.
          </p>

          {/* Interactive 3D Red Button with active press pop effect */}
          <div className="relative group">
            {/* The 3D Depth Shadow Base */}
            <div className="absolute inset-0 translate-y-2 rounded-xl bg-[#931111] transition-all duration-200 group-hover:translate-y-2.5"></div>
            
            <button
              onClick={handleButtonClick}
              className={`relative z-10 block px-10 py-5 font-black text-white uppercase tracking-wider rounded-xl bg-[#e21b1b] border-2 border-[#b01414] select-none cursor-pointer transition-all duration-150 ease-out
                -translate-y-1 hover:-translate-y-2 active:translate-y-1
                [text-shadow:0_1.5px_0px_rgba(0,0,0,0.4)]
                shadow-[0_4px_12px_rgba(226,27,27,0.3)]
                hover:shadow-[0_8px_20px_rgba(226,27,27,0.5)]
                ${isPopping ? 'animate-pop' : ''}
              `}
            >
              <span className="flex items-center gap-3">
                <span className="text-sm md:text-base font-black tracking-[0.1em]">
                  Enter Healthcare Portal
                </span>
                <svg 
                  className="w-5 h-5 text-white transition-transform duration-300 transform group-hover:translate-x-1.5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}