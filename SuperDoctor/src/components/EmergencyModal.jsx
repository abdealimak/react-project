import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, HeartPulse, ShieldAlert, Navigation } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

const EmergencyModal = ({ isOpen, onClose }) => {
  const { activeProfile } = useProfile();

  if (!isOpen) return null;

  const traumaCenters = [
    { name: 'City General Trauma', dist: '1.2 KM', eta: '4 Mins', address: 'Bandra West, Mumbai' },
    { name: 'Metropolis Hospital', dist: '2.8 KM', eta: '9 Mins', address: 'Andheri East, Mumbai' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-white/90 backdrop-blur-2xl rounded-[48px] shadow-2xl border border-white overflow-hidden"
        >
          <div className="bg-red-600 p-8 flex items-center justify-between text-white">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-white/20 rounded-2xl animate-pulse">
                <ShieldAlert size={32} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Emergency Alpha</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-10 space-y-8">
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Patient</p>
                <h3 className="text-xl font-black text-slate-900">{activeProfile.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Blood Type</p>
                <p className="text-xl font-black text-red-600">{activeProfile.bloodGroup}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Nearest Response Units</p>
              {traumaCenters.map((center, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-50 rounded-3xl hover:bg-red-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all">
                      <Navigation size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{center.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{center.dist} • {center.eta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-slate-900 hover:bg-slate-800 py-6 rounded-[24px] flex items-center justify-center gap-4 transition-all shadow-xl shadow-slate-200">
              <HeartPulse className="text-red-500 animate-bounce" size={24} />
              <span className="text-lg font-black text-white uppercase tracking-widest">Request Response</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmergencyModal;
