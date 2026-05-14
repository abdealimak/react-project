import React, { useState, useEffect, useRef } from 'react';

const faqsLeft = [
  { q: "How fast is a SuperDoc response?", a: "Our average dispatch time for home visits is under 22 minutes. We use real-time GPS routing to ensure the closest available doctor swings by your location." },
  { q: "Is my medical data safe?", a: "Absolutely. We use AES-256 military-grade encryption. Your data is decentralized, meaning only you hold the keys to your medical history." },
  { q: "Do you handle major emergencies?", a: "The 'Emergency Protocol' button stabilizes you while simultaneously alerting the nearest trauma center and your emergency contacts." }
];

const faqsRight = [
  { q: "How does the Real-Time Queue work?", a: "Once you book, your app turns into a live tracker. You can see your position in line and receive a 'Leave Now' notification based on traffic." },
  { q: "Can I manage my family's health?", a: "Yes. The Family Health Hub allows you to add dependents. You can switch profiles to book appointments for children or elderly parents easily." },
  { q: "Are there video consultations?", a: "Yes, for follow-ups and non-urgent advice, you can connect with verified specialists via high-definition encrypted video calls instantly." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);
  const [scrollScale, setScrollScale] = useState(0.85);
  const [scrollOpacity, setScrollOpacity] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const distanceToCenter = Math.abs((window.innerHeight / 2) - (rect.top + rect.height / 2));
      const progress = Math.max(0, 1 - distanceToCenter / 600);
      setScrollScale(0.85 + progress * 0.15);
      setScrollOpacity(0.5 + progress * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderFaqItem = (faq, i, side) => {
    const index = `${side}-${i}`;
    const isOpen = openIndex === index;
    return (
      <div key={index} className={`border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 mb-4 ${isOpen ? 'bg-[#0d1527] border-[#2b59c3]/50' : 'bg-transparent'}`}>
        <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-5 text-left group">
          <span className={`text-sm font-bold uppercase tracking-tight transition-colors ${isOpen ? 'text-[#e21b1b]' : 'text-white group-hover:text-[#2b59c3]'}`}>{faq.q}</span>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="px-5 pb-5 text-slate-400 text-xs md:text-sm leading-relaxed border-t border-slate-800/50 pt-3">{faq.a}</p>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="py-32 px-8 max-w-7xl mx-auto transition-all duration-300 ease-out origin-center"
      style={{ transform: `scale(${scrollScale})`, opacity: scrollOpacity }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
        <div className="text-center md:text-right">
          <span className="text-xs font-bold tracking-[0.4em] text-[#2b59c3] uppercase italic">Information Center</span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mt-4">
            COMMON <span className="text-[#e21b1b]">QUESTIONS</span>
          </h2>
        </div>
        
        {/* NATURAL GIF PLACEMENT */}
        <img 
          src="https://media.giphy.com/media/vKhKsyEFVK4IuEKzWY/giphy.gif" 
          alt="Spider-Man Pointing" 
          className="h-20 md:h-28 drop-shadow-[0_0_15px_rgba(226,27,27,0.3)] pointer-events-none"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-x-8">
        <div>{faqsLeft.map((faq, i) => renderFaqItem(faq, i, 'left'))}</div>
        <div>{faqsRight.map((faq, i) => renderFaqItem(faq, i, 'right'))}</div>
      </div>
    </section>
  );
}