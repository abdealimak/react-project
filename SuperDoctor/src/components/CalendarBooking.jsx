import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Video, User, ChevronLeft, ChevronRight, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarBooking = ({ onSuccess }) => {
  const [selectedType, setSelectedType] = useState('physical');
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const days = [
    { id: 0, day: 'MON', date: '18' },
    { id: 1, day: 'TUE', date: '19' },
    { id: 2, day: 'WED', date: '20' },
    { id: 3, day: 'THU', date: '21' },
    { id: 4, day: 'FRI', date: '22' },
    { id: 5, day: 'SAT', date: '23' },
    { id: 6, day: 'SUN', date: '24' },
  ];

  const slots = selectedType === 'physical' 
    ? ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '04:00 PM', '04:30 PM']
    : ['02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '07:00 PM'];

  return (
    <div className="dashboard-container animate-in">
      {/* Header Info */}
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-[#1d1d1f] tracking-tight">Clinical Consultation</h2>
          <p className="text-sm font-medium text-[#86868b]">Schedule physical or virtual assessment sessions</p>
        </div>
        <div className="flex bg-black/5 p-1 rounded-[16px] backdrop-blur-md">
          <button 
            onClick={() => setSelectedType('physical')}
            className={`px-8 py-2.5 rounded-[12px] text-xs font-bold transition-all ${
              selectedType === 'physical' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            In-Person Visit
          </button>
          <button 
            onClick={() => setSelectedType('online')}
            className={`px-8 py-2.5 rounded-[12px] text-xs font-bold transition-all ${
              selectedType === 'online' ? 'bg-white text-[#1d1d1f] shadow-sm' : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            Video Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Main Selection Area */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Calendar Picker */}
          <div className="liquid-glass p-10">
            <div className="flex items-center justify-between mb-10 px-2">
              <h4 className="text-[11px] font-black text-[#86868b] uppercase tracking-[0.2em]">Select Evaluation Date</h4>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                <button className="p-2 hover:bg-black/5 rounded-full transition-colors"><ChevronRight size={20} /></button>
              </div>
            </div>
            
            <div className="flex justify-between gap-4">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`flex-1 p-6 rounded-[28px] border-2 transition-all flex flex-col items-center gap-3 group relative ${
                    selectedDay === day.id 
                      ? 'bg-white border-[#0071e3] shadow-2xl shadow-blue-100' 
                      : 'bg-transparent border-transparent text-[#86868b] hover:bg-black/5 hover:border-black/5'
                  }`}
                >
                  <span className={`text-[10px] font-bold tracking-[0.1em] uppercase ${selectedDay === day.id ? 'text-[#0071e3]' : ''}`}>{day.day}</span>
                  <span className={`text-2xl font-black ${selectedDay === day.id ? 'text-[#1d1d1f]' : ''}`}>{day.date}</span>
                  {selectedDay === day.id && (
                    <motion.div 
                      layoutId="activeDay"
                      className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-[#0071e3]" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Slot Picker */}
          <div className="liquid-glass p-10">
            <h4 className="text-[11px] font-black text-[#86868b] uppercase tracking-[0.2em] mb-10">Available Clinical Windows</h4>
            <div className="grid grid-cols-4 gap-4">
              {slots.map((slot, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-4 px-6 rounded-2xl border-2 font-bold text-xs transition-all ${
                    selectedSlot === slot 
                      ? 'bg-white border-[#0071e3] text-[#0071e3] shadow-md shadow-blue-50' 
                      : 'bg-transparent border-transparent text-[#86868b] hover:bg-black/5 hover:border-black/5'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Summary Area - No more overlap! */}
        <div className="col-span-12 lg:col-span-4 h-full">
          <div className="liquid-glass-dark p-10 flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex items-center justify-between mb-10">
                <div className="p-4 bg-white/10 rounded-2xl">
                  {selectedType === 'physical' ? <User size={32} /> : <Video size={32} />}
                </div>
                <div className="flex items-center gap-2 bg-[#ff3b30]/20 px-3 py-1 rounded-full">
                  <ShieldCheck size={14} className="text-[#ff3b30]" />
                  <span className="text-[9px] font-bold text-[#ff3b30] uppercase">Secure Link</span>
                </div>
              </div>
              
              <h3 className="text-3xl font-black mb-8 tracking-tight italic">Clinical<br />Summary</h3>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <CalendarIcon size={20} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-bold">{days[selectedDay].day}, MAY {days[selectedDay].date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Selected Window</p>
                    <p className="text-sm font-bold">{selectedSlot || 'Select a slot'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <button 
                disabled={!selectedSlot}
                onClick={onSuccess}
                className="mac-button w-full py-5 rounded-[20px] text-xs font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                Confirm Protocol
                <Check size={18} strokeWidth={3} />
              </button>
              <p className="text-[10px] text-white/30 font-bold text-center uppercase tracking-widest leading-loose">
                Validation required upon arrival <br /> at clinical node
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarBooking;
