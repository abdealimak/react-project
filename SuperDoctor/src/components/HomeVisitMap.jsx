import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, User, Phone, Signal } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeVisitMap = () => {
  const [eta, setEta] = useState(24);
  const [distance, setDistance] = useState(4.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => {
        const trafficSurge = Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0;
        const reduction = 0.05;
        const next = prev - reduction + trafficSurge;
        return next > 5 ? parseFloat(next.toFixed(1)) : 5;
      });
      setDistance(prev => (prev > 0.5 ? parseFloat((prev - 0.03).toFixed(2)) : 0.5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Home Visit Tracking</h2>
          <p className="text-slate-400 font-medium mt-1">Live dispatch logistics & doctor ETA</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-100 px-4 py-2 rounded-full flex items-center gap-2">
            <Signal size={14} className="text-green-500" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">GPS Connection: Strong</span>
          </div>
        </div>
      </div>

      <div className="flex-1 premium-card overflow-hidden relative min-h-[500px] border-4 border-white shadow-2xl shadow-slate-200">
        <div className="absolute inset-0 bg-[#f1f5f9]">
          {/* Mock Map Grid */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
          
          {/* Doctor Marker */}
          <motion.div animate={{ x: [100, 200, 150, 250], y: [150, 180, 250, 220] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
              <div className="bg-blue-600 p-3 rounded-full border-4 border-white shadow-xl relative">
                <Navigation size={20} className="text-white rotate-45" />
              </div>
            </div>
          </motion.div>

          {/* User Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-slate-900/5 p-16 rounded-full animate-ping absolute -inset-8" />
            <div className="bg-white p-4 rounded-full border-4 border-slate-900 shadow-2xl relative">
              <MapPin size={28} className="text-slate-900" />
            </div>
          </div>
        </div>

        {/* Map Overlay Stats */}
        <div className="absolute bottom-10 left-10 flex gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-slate-400/20 border border-slate-50 flex items-center gap-6">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Distance</p>
              <p className="text-2xl font-black text-slate-900">{distance} <span className="text-sm">KM</span></p>
            </div>
            <div className="w-[1px] h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Arrival In</p>
              <p className="text-2xl font-black text-blue-600">{Math.floor(eta)} <span className="text-sm">MIN</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="premium-card p-8 bg-white flex items-center justify-between border border-slate-100">
        <div className="flex items-center gap-8">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80" 
              alt="Doctor" 
              className="w-20 h-20 rounded-3xl object-cover border-4 border-slate-50 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-sm" />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h4 className="text-xl font-black text-slate-900 tracking-tight">Dr. Arvind Mehta</h4>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Verified Specialist</span>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">General Physician • 12 yrs exp</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <Phone size={24} />
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 px-10 py-4 rounded-2xl font-bold text-white text-sm uppercase tracking-widest shadow-xl shadow-slate-200 transition-all">
            Contact Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeVisitMap;
