import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import SuperDoctorPage from './landingpage/Hero'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Activity, Zap, Shield, Cpu, ChevronRight, User, Bell, Phone, 
  LayoutDashboard, Archive, Users, Newspaper, Settings, Search, Clock, 
  Calendar, MapPin, Plus, ArrowUpRight, CheckCircle2, AlertCircle, 
  Download, Filter, MoreHorizontal, Send, Sparkles, LogOut, Moon, Sun, 
  ShieldCheck, Smartphone, Eye, EyeOff, Menu, X, ChevronLeft, DollarSign,
  Stethoscope, Brain, Thermometer, Baby, FileText, Home, Video, BookOpen, Star,
  Smile, Frown, Loader2, CreditCard, Clipboard, PlayCircle, Dumbbell, Quote,
  Navigation, ShieldAlert, Siren, Map as MapIcon, Microscope, Locate, Check, Truck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- DATA ---
const profilesData = {
  '01': {
    name: "Alex Johnson",
    role: "Active Patient",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    stats: { heartRate: 72, oxygen: 98, mental: "Healthy" },
    history: [
      { time: '00:00', heartRate: 65, oxygen: 98 },
      { time: '04:00', heartRate: 62, oxygen: 99 },
      { time: '08:00', heartRate: 75, oxygen: 98 },
      { time: '12:00', heartRate: 82, oxygen: 97 },
      { time: '16:00', heartRate: 78, oxygen: 98 },
      { time: '20:00', heartRate: 70, oxygen: 99 },
    ]
  },
  '02': {
    name: "Sarah Johnson",
    role: "Wellness Profile",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    stats: { heartRate: 68, oxygen: 99, mental: "Stable" },
    history: [
      { time: '00:00', heartRate: 60, oxygen: 99 },
      { time: '08:00', heartRate: 65, oxygen: 99 },
      { time: '16:00', heartRate: 70, oxygen: 98 },
    ]
  },
  '03': {
    name: "Leo Johnson",
    role: "Child Profile",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    stats: { heartRate: 95, oxygen: 97, mental: "Energetic" },
    history: [
      { time: '00:00', heartRate: 85, oxygen: 97 },
      { time: '08:00', heartRate: 92, oxygen: 98 },
      { time: '16:00', heartRate: 100, oxygen: 97 },
    ]
  }
};

const medicalExperts = [
  { id: 1, name: "Dr. Jane Cooper", specialty: "Cardiology", price: 150, rating: 4.9, reviews: 124, clinic: "Heart Care Center, Block A", img: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=200&q=80", status: 'online', bio: "Expert in cardiovascular health and preventative heart care.", url: "https://www.mayoclinic.org/diseases-conditions/heart-disease/symptoms-causes/syc-20353118", dist: "0.8 km" },
  { id: 2, name: "Dr. Kristin Watson", specialty: "Neurology", price: 200, rating: 4.8, reviews: 89, clinic: "Brain & Spine Clinic", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80", status: 'online', bio: "Specializes in headache management and cognitive health.", url: "https://www.webmd.com/brain/default.htm", dist: "1.2 km" },
  { id: 3, name: "Dr. Guy Hawkins", specialty: "General Medicine", price: 100, rating: 4.7, reviews: 210, clinic: "City General Hospital", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80", status: 'offline', bio: "General practitioner with over 15 years of experience.", url: "https://www.nhs.uk/conditions/", dist: "2.5 km" },
  { id: 4, name: "Dr. Leo Core", specialty: "Pediatrics", price: 120, rating: 4.9, reviews: 156, clinic: "Children's Health Plaza", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80", status: 'online', bio: "Dedicated to compassionate care for children.", url: "https://www.healthline.com/health/childrens-health", dist: "3.1 km" },
];

const healthTips = [
  { id: 1, title: "Cardiovascular Health Management", category: "Heart Care", excerpt: "Essential guide to maintaining a healthy heart through lifestyle and diet.", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80", url: "https://www.mayoclinic.org/diseases-conditions/heart-disease/symptoms-causes/syc-20353118" },
  { id: 2, title: "Neurological Wellness & Sleep", category: "Neurology", excerpt: "How quality rest impacts brain function and long-term cognitive health.", img: "https://images.unsplash.com/photo-1511293853672-438fa521529a?auto=format&fit=crop&w=800&q=80", url: "https://www.sleepfoundation.org/sleep-hygiene/healthy-sleep-tips" },
  { id: 3, title: "Managing Type 2 Diabetes", category: "Endocrinology", excerpt: "Strategic steps for blood sugar control and insulin management.", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80", url: "https://www.webmd.com/diabetes/type-2-diabetes" },
  { id: 4, title: "Pediatric Growth Milestones", category: "Pediatrics", excerpt: "A comprehensive timeline of physical and cognitive development in children.", img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80", url: "https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/index.html" },
  { id: 5, title: "Combatting Chronic Inflammation", category: "General Health", excerpt: "The role of nutrition in reducing systemic inflammation and pain.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", url: "https://www.healthline.com/nutrition/anti-inflammatory-diet-101" },
  { id: 6, title: "Postural Correction Exercises", category: "Physiotherapy", excerpt: "Daily habits to improve spinal alignment and reduce back discomfort.", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80", url: "https://www.medicalnewstoday.com/articles/posture-exercises" },
  { id: 7, title: "Boosting Immune Resilience", category: "Immunology", excerpt: "Scientifically proven methods to strengthen your body's natural defenses.", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80", url: "https://www.webmd.com/cold-and-flu/ss/slideshow-immune-system" },
  { id: 8, title: "Hypertension Control Guide", category: "Cardiology", excerpt: "Effective techniques for lower blood pressure without medication.", img: "https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?auto=format&fit=crop&w=800&q=80", url: "https://www.heart.org/en/health-topics/high-blood-pressure" },
  { id: 9, title: "Understanding Seasonal Allergies", category: "Allergy", excerpt: "How to identify triggers and find lasting relief from hay fever.", img: "https://images.unsplash.com/photo-1508967566542-f350ee5dbfa9?auto=format&fit=crop&w=800&q=80", url: "https://www.aaaai.org/conditions-treatments/allergies/seasonal-allergies" },
  { id: 10, title: "Skin Health & UV Protection", category: "Dermatology", excerpt: "The latest clinical recommendations for melanoma prevention.", img: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=800&q=80", url: "https://www.aad.org/public/everyday-care/sun-protection" },
  { id: 11, title: "Nutrition for Eye Longevity", category: "Ophthalmology", excerpt: "Vitamins and minerals that protect your vision from macular degeneration.", img: "https://images.unsplash.com/photo-1557124816-e9b7d5440de2?auto=format&fit=crop&w=800&q=80", url: "https://www.aao.org/eye-health/tips-prevention/diet-nutrition" },
  { id: 12, title: "Mental Resilience Protocols", category: "Psychiatry", excerpt: "Clinical strategies for managing anxiety and high-pressure environments.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", url: "https://www.apa.org/topics/resilience" },
];

const motivationalQuotes = [
  "Health is wealth.",
  "Your body is your temple.",
  "Believe you can.",
  "Small steps daily.",
  "Consistency is key.",
  "Never give up.",
  "Mind over matter.",
  "Stay focused.",
  "Eat for fuel.",
  "Move your body.",
  "Sleep is recovery.",
  "Mental health matters.",
  "Success takes time.",
  "Keep pushing forward.",
  "You are stronger than you think.",
  "Start today.",
  "Good things take time.",
  "Discipline beats motivation.",
  "Take the lead.",
  "Your health is an investment.",
  "Future you will thank you.",
  "Action over words.",
  "Energy flows where focus goes.",
  "Stronger every day.",
  "Hard work pays off.",
  "Be the best version of you.",
  "Dream big, work hard.",
  "Focus on the goal.",
  "Excellence is a habit.",
  "Progress not perfection.",
  "Keep the fire burning.",
  "You've got this.",
  "Commit to fit.",
  "Body in motion.",
  "Mindset is everything.",
  "Challenge yourself.",
  "Win the day.",
  "No excuses.",
  "Fuel your ambition.",
  "Rise and grind.",
  "Stay hungry.",
  "Fear is a liar.",
  "Strength is earned.",
  "Embrace the struggle.",
  "Pain is temporary.",
  "Legacy is built daily.",
  "Don't stop.",
  "Get it done.",
  "Make it happen.",
  "Push your limits."
];

// --- UTILS ---
const downloadMedicalFile = (type, name, patientName) => {
  const content = `
-----------------------------------------------------------
SUPERDOC MEDICAL PORTAL - OFFICIAL REPORT
-----------------------------------------------------------
PATIENT: ${patientName}
DATE: ${new Date().toLocaleDateString()}
TYPE: ${type}
REF: ${Math.random().toString(36).substring(7).toUpperCase()}

SUMMARY:
This is a verified digital copy of your medical record.
The results indicate stable physiological nodes.

Authorized by: SuperDoc Clinical System
-----------------------------------------------------------
  `;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/\s+/g, '_')}_Report.txt`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// --- COMPONENTS ---
const SimpleCard = ({ children, className = "", title, icon: Icon, action }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[32px] p-6 flex flex-col ${className}`}>
    <div className="flex items-center justify-between mb-6">
       <div className="flex items-center gap-3">
          {Icon && <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Icon size={16} /></div>}
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{title}</span>
       </div>
       {action && action}
    </div>
    {children}
  </motion.div>
);

const ViewWrapper = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full h-full">
    {children}
  </motion.div>
);

const Logo = ({ size = "8" }) => (
  <div className="flex items-center space-x-3">
    <svg className={`w-${size} h-${size} text-[#e21b1b]`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" stroke="#e21b1b" strokeWidth="2" fill="#050911" />
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" />
    </svg>
    <span className="text-xl font-black tracking-tighter text-white uppercase italic font-syne text-glow">Super<span className="text-[#e21b1b]">Doc</span></span>
  </div>
);

const QuoteMarquee = () => {
  // ULTRA-DENSE quote stream - no gaps
  const duplicatedQuotes = [...motivationalQuotes, ...motivationalQuotes, ...motivationalQuotes, ...motivationalQuotes, ...motivationalQuotes, ...motivationalQuotes, ...motivationalQuotes, ...motivationalQuotes];
  return (
    <div className="overflow-hidden whitespace-nowrap bg-white/5 border-y border-white/5 py-4 relative">
       <motion.div 
         className="inline-flex gap-4 items-center"
         animate={{ x: ["-50%", "0%"] }}
         transition={{ 
           repeat: Infinity, 
           duration: 40, 
           ease: "linear"
         }}
         style={{ width: 'max-content' }}
       >
          {duplicatedQuotes.map((q, i) => (
            <div key={i} className="flex items-center gap-2 px-1">
               <Quote size={10} className="text-[#e21b1b] shrink-0" />
               <span className="text-[10px] font-black font-syne italic text-white tracking-tight uppercase">{q}</span>
            </div>
          ))}
       </motion.div>
       <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10" />
       <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10" />
    </div>
  );
};

// --- VIEWS ---

const PatientDashboard = ({ currentProfile }) => {
  const navigate = useNavigate();
  const data = profilesData[currentProfile] || profilesData['01'];
  
  return (
    <div className="grid grid-cols-12 gap-6 p-10 max-w-[1600px] mx-auto">
      <SimpleCard className="col-span-12 lg:col-span-8 row-span-4" title={`${data.name}'s Health Summary`}>
         <div className="flex flex-col gap-3 mb-8">
            <h1 className="text-5xl lg:text-6xl font-black italic tracking-tighter font-syne text-white leading-none">Welcome Back.</h1>
            <p className="text-lg text-white/40 max-w-lg font-medium leading-relaxed">Health indicators for {data.name} are currently stable.</p>
         </div>
         <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.history}><Area type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.1} fill="#3b82f6" /><Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} /></AreaChart>
            </ResponsiveContainer>
         </div>
      </SimpleCard>

      <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-6">
        <SimpleCard className="row-span-1" title="Heart Rate"><div className="flex items-center justify-between"><div className="flex flex-col gap-1"><span className="text-5xl font-bold italic font-syne">{data.stats.heartRate}</span><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">BPM</span></div><Heart className="text-[#e21b1b] animate-pulse" size={40} /></div></SimpleCard>
        <SimpleCard className="row-span-1" title="Blood Oxygen"><div className="flex items-center justify-between"><div className="flex flex-col gap-1"><span className="text-5xl font-bold italic font-syne">{data.stats.oxygen}%</span><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Normal</span></div><Activity className="text-blue-500" size={40} /></div></SimpleCard>
        <SimpleCard className="row-span-1" title="Mental Health Status"><div className="flex items-center justify-between"><div className="flex flex-col gap-1"><span className="text-3xl font-bold italic font-syne uppercase">{data.stats.mental}</span><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Daily Mood</span></div><Smile className="text-green-500" size={40} /></div></SimpleCard>
      </div>

      <div className="col-span-12 mb-2">
         <QuoteMarquee />
      </div>

      <SimpleCard className="col-span-12 lg:col-span-4 row-span-3" title="Recent Prescriptions" action={<button onClick={() => navigate('/dashboard/vault')} className="text-blue-500 hover:underline text-[10px] font-bold uppercase tracking-widest">See Records</button>}>
         <div className="space-y-3">
            {['Cough Syrup V1', 'Health Vitamins'].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                 <div className="flex items-center gap-3"><FileText size={16} className="text-[#e21b1b]" /><div><p className="text-xs font-bold font-syne italic text-white">{p}</p><p className="text-[8px] text-white/40 uppercase tracking-widest">Ready for Pickup</p></div></div>
                 <button onClick={() => downloadMedicalFile('Prescription', p, data.name)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-white transition-all"><Download size={14} /></button>
              </div>
            ))}
         </div>
      </SimpleCard>

      <SimpleCard className="col-span-12 lg:col-span-4 row-span-3 bg-[#e21b1b]/10 border-[#e21b1b]/20" title="Check Symptoms">
         <h3 className="text-2xl font-black italic mb-3 font-syne text-white">How are you feeling?</h3>
         <p className="text-xs text-white/60 mb-6 leading-relaxed font-jakarta">Tell us your symptoms and we'll suggest the best specialist for you.</p>
         <button onClick={() => navigate('/dashboard/diagnostics')} className="w-full py-4 bg-[#e21b1b] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c01616] transition-all text-white shadow-lg shadow-[#e21b1b]/20">Start Health Check</button>
      </SimpleCard>

      <SimpleCard className="col-span-12 lg:col-span-4 row-span-3" title="Daily Health Tips">
         <div className="space-y-4">
            {healthTips.slice(0, 4).map((tip, i) => (
              <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-all" onClick={() => window.open(tip.url, '_blank')}>
                 <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0"><img src={tip.img} className="w-full h-full object-cover" /></div>
                 <div><p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest mb-1">{tip.category}</p><p className="text-xs font-bold font-syne italic text-white leading-tight">{tip.title}</p></div>
              </div>
            ))}
         </div>
      </SimpleCard>
    </div>
  );
};

const MentalHealthView = () => {
  const [step, setStep] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const questions = [
    { q: "How would you describe your mood today?", options: [{ label: 'Very Positive', val: 'Healthy' }, { label: 'Neutral', val: 'Stable' }, { label: 'Stressed', val: 'Stressed' }, { label: 'A bit low', val: 'Tired' }] },
    { q: "How was your sleep quality last night?", options: [{ label: 'Perfect Sleep', val: 'Healthy' }, { label: 'Good enough', val: 'Stable' }, { label: 'Restless', val: 'Stressed' }, { label: 'Hardly slept', val: 'Acute' }] },
    { q: "How are your energy levels?", options: [{ label: 'Full of Energy', val: 'Healthy' }, { label: 'Regular', val: 'Stable' }, { label: 'Low Energy', val: 'Tired' }] }
  ];
  const handleSelect = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else { setIsEvaluating(true); setTimeout(() => setIsEvaluating(false), 2000); setStep(step + 1); }
  };
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
       <div className="flex flex-col gap-2 text-center mb-10">
          <div className="flex items-center justify-center gap-3"><span className="text-[9px] font-black uppercase tracking-widest text-[#e21b1b]">Mental Health Check</span></div>
          <h1 className="text-5xl font-black italic tracking-tighter font-syne text-white leading-none">Mind & Wellness.</h1>
       </div>
       <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div key={step} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900/60 p-12 rounded-[56px] border border-white/5 shadow-2xl">
               <h2 className="text-3xl font-bold font-syne italic text-white text-center mb-10">{questions[step].q}</h2>
               <div className="grid grid-cols-2 gap-4">
                  {questions[step].options.map((opt, i) => (
                    <button key={i} onClick={handleSelect} className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col items-center gap-4 hover:bg-[#e21b1b] group transition-all">
                       <span className="text-xs font-black uppercase tracking-widest text-white">{opt.label}</span>
                    </button>
                  ))}
               </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10">
               {isEvaluating ? ( <div className="py-20 flex flex-col items-center"><Activity size={60} className="text-green-500 animate-pulse mb-6" /><p className="text-lg font-bold italic font-syne text-white/60 uppercase tracking-widest">Evaluating your wellness...</p></div> ) : ( <div className="bg-[#e21b1b] p-12 rounded-[64px] text-white space-y-8 shadow-2xl"> <Smile size={64} className="mx-auto" /> <h2 className="text-4xl font-black italic font-syne uppercase">Wellness Secure</h2> <p className="text-lg text-white/80 max-w-md mx-auto font-jakarta">Your mood has been logged. We recommend 10 minutes of meditation today.</p> <button onClick={() => setStep(0)} className="px-10 py-4 bg-white/20 text-white rounded-full text-xs font-black uppercase tracking-widest">Start Over</button> </div> )}
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

const SymptomChecker = () => {
  const [step, setStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const questions = [
    { q: "Where is the main area of discomfort?", options: [{ label: 'Chest / Lungs', val: 'chest' }, { label: 'Head / Neck', val: 'head' }, { label: 'Stomach / Body', val: 'body' }, { label: 'General / Fever', val: 'general' }] },
    { q: "How strong is the feeling?", options: [{ label: 'Just a little', val: 'mild' }, { label: 'Uncomfortable', val: 'moderate' }, { label: 'Painful', val: 'acute' }, { label: 'Very Severe', val: 'severe' }] },
    { q: "How long has this been happening?", options: [{ label: 'Just today', val: 'recent' }, { label: 'A few days', val: 'few_days' }, { label: 'More than a week', val: 'chronic' }] }
  ];
  const handleSelect = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else { setIsAnalyzing(true); setTimeout(() => setIsAnalyzing(false), 2000); setStep(step + 1); }
  };
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
       <div className="flex flex-col gap-2 text-center mb-10">
          <div className="flex items-center justify-center gap-3"><button onClick={() => step > 0 && setStep(step - 1)} className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white ${step === 0 ? 'opacity-0' : ''}`}><ChevronLeft size={16} /></button><span className="text-[9px] font-black uppercase tracking-widest text-[#e21b1b]">Health Check Step {step + 1}</span></div>
          <h1 className="text-5xl font-black italic tracking-tighter font-syne text-white leading-none">Symptom Checker.</h1>
       </div>
       <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div key={step} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-slate-900/60 p-12 rounded-[56px] border border-white/5 shadow-2xl">
               <h2 className="text-3xl font-bold font-syne italic text-white text-center mb-10">{questions[step].q}</h2>
               <div className="grid grid-cols-2 gap-4">
                  {questions[step].options.map((opt, i) => (
                    <button key={i} onClick={handleSelect} className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col items-center gap-4 hover:bg-[#e21b1b] group transition-all">
                       <span className="text-xs font-black uppercase tracking-widest text-white">{opt.label}</span>
                    </button>
                  ))}
               </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10">
               {isAnalyzing ? ( <div className="py-20 flex flex-col items-center"><Activity size={60} className="text-[#e21b1b] animate-pulse mb-6" /><p className="text-lg font-bold italic font-syne text-white/60 uppercase tracking-widest">ANALYZING YOUR ANSWERS...</p></div> ) : ( <div className="bg-[#e21b1b] p-12 rounded-[64px] text-white space-y-8 shadow-2xl"> <CheckCircle2 size={64} className="mx-auto" /> <h2 className="text-4xl font-black italic font-syne uppercase">Recommendation</h2> <p className="text-lg text-white/80 max-w-md mx-auto font-jakarta">We recommend booking an <span className="font-black underline">Online Consultation</span> with a General Medicine specialist today.</p> <button onClick={() => setStep(0)} className="px-10 py-4 bg-white/20 text-white rounded-full text-xs font-black uppercase tracking-widest">Start Over</button> </div> )}
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

const DiagnosticsHub = () => {
  const [view, setView] = useState('menu');
  return (
    <div className="max-w-[1400px] mx-auto py-12 px-12">
       {view === 'menu' ? (
         <div className="space-y-12">
            <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">Medical Triage</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Diagnostic Hub.</h1></div>
            <div className="grid grid-cols-2 gap-10">
               <button onClick={() => setView('physical')} className="bg-slate-900/60 p-16 rounded-[64px] border border-white/5 flex flex-col items-center gap-8 hover:bg-[#e21b1b] group transition-all shadow-2xl">
                  <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-[#e21b1b] group-hover:bg-white/20 group-hover:text-white transition-all"><Stethoscope size={48} /></div>
                  <div className="text-center">
                     <h3 className="text-3xl font-black italic font-syne text-white mb-2 uppercase">Physical Check</h3>
                     <p className="text-xs text-white/40 group-hover:text-white/80 font-jakarta uppercase tracking-widest">Symptom & Vitals Analysis</p>
                  </div>
               </button>
               <button onClick={() => setView('mental')} className="bg-slate-900/60 p-16 rounded-[64px] border border-white/5 flex flex-col items-center gap-8 hover:bg-[#e21b1b] group transition-all shadow-2xl">
                  <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-[#e21b1b] group-hover:bg-white/20 group-hover:text-white transition-all"><Brain size={48} /></div>
                  <div className="text-center">
                     <h3 className="text-3xl font-black italic font-syne text-white mb-2 uppercase">Mental Check</h3>
                     <p className="text-xs text-white/40 group-hover:text-white/80 font-jakarta uppercase tracking-widest">Mood & Cognitive Triage</p>
                  </div>
               </button>
            </div>
         </div>
       ) : (
         <div>
            <button onClick={() => setView('menu')} className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase text-white/40 hover:text-white tracking-widest"><ChevronLeft size={14} /> Back to Hub</button>
            {view === 'physical' ? <SymptomChecker /> : <MentalHealthView />}
         </div>
       )}
    </div>
  );
};

const WellnessHub = () => {
  const [tab, setTab] = useState('training');
  return (
    <div className="max-w-[1400px] mx-auto py-12 px-12 space-y-12">
       <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">Center for Excellence</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Wellness & Intel.</h1></div>
       <div className="flex gap-4 p-2 bg-white/5 rounded-full w-fit border border-white/10">
          <button onClick={() => setTab('training')} className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'training' ? 'bg-[#e21b1b] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>Training Videos</button>
          <button onClick={() => setTab('articles')} className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'articles' ? 'bg-[#e21b1b] text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>Health Articles</button>
       </div>
       <AnimatePresence mode="wait">
          {tab === 'training' ? (
            <motion.div key="training" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
                  {trainingVideos.map(video => (
                    <TrainingCard key={video.id} video={video} />
                  ))}
               </div>
            </motion.div>
          ) : (
            <motion.div key="articles" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
               <div className="grid grid-cols-3 gap-8 pb-20">
                  {healthTips.map(tip => (
                    <ArticleCard key={tip.id} tip={tip} />
                  ))}
               </div>
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

const TrainingCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="bg-slate-900/60 border border-white/5 rounded-[48px] overflow-hidden group hover:bg-white/5 transition-all relative shadow-2xl">
       <div className="h-48 overflow-hidden relative">
          {isHovered ? (
            <iframe className="w-full h-full pointer-events-none scale-110" src={`https://www.youtube.com/embed/${video.ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.ytId}`} frameBorder="0" allow="autoplay" />
          ) : (
            <img src={video.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
          )}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer" onClick={() => window.open(`https://www.youtube.com/watch?v=${video.ytId}`, '_blank')}>
            <PlayCircle size={60} className="text-white drop-shadow-2xl" />
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 rounded-lg text-[10px] font-bold text-white font-jakarta">{video.duration}</div>
       </div>
       <div className="p-8 space-y-4">
          <span className="text-[10px] font-black text-[#e21b1b] uppercase tracking-widest">{video.category}</span>
          <h3 className="text-xl font-black italic font-syne text-white leading-tight">{video.title}</h3>
          <button onClick={() => window.open(`https://www.youtube.com/watch?v=${video.ytId}`, '_blank')} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-[#e21b1b] hover:border-[#e21b1b] transition-all flex items-center justify-center gap-2 tracking-widest">Watch Full Workout <ArrowUpRight size={14} /></button>
       </div>
    </div>
  );
};

const ArticleCard = ({ tip }) => (
  <div className="bg-slate-900/60 border border-white/5 rounded-[48px] overflow-hidden group hover:bg-white/5 transition-all shadow-2xl flex flex-col">
     <div className="h-56 overflow-hidden relative shrink-0"><img src={tip.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" /></div>
     <div className="p-8 space-y-6 flex-1 flex flex-col justify-between"> 
        <div>
           <span className="text-[10px] font-black text-[#e21b1b] uppercase tracking-widest">{tip.category}</span> 
           <h3 className="text-xl font-black italic font-syne text-white leading-tight mt-2">{tip.title}</h3> 
           <p className="text-xs text-white/50 leading-relaxed font-jakarta mt-3">{tip.excerpt}</p> 
        </div>
        <button onClick={() => window.open(tip.url, '_blank')} className="text-xs font-black uppercase text-white hover:text-[#e21b1b] flex items-center gap-2 transition-all tracking-widest mt-6">Read Full Article <ChevronRight size={14} /></button> 
     </div>
  </div>
);

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState(null);
  const [visitType, setVisitType] = useState('online'); 
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [{ id: 'card', name: 'Cardiology', icon: Heart }, { id: 'neuro', name: 'Neurology', icon: Brain }, { id: 'gen', name: 'General Medicine', icon: Stethoscope }, { id: 'peds', name: 'Pediatrics', icon: Baby }];
  const days = Array.from({ length: 14 }, (_, i) => ({ date: new Date().getDate() + i, day: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][(new Date().getDay() + i) % 7] }));
  const resetBooking = () => { setIsBookingOpen(false); setBookingStep(1); setSelectedCat(null); setIsProcessing(false); };
  
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingStep(4);
    }, 3000);
  };

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-12 relative">
       <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">Appointments Hub</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Book a Doctor.</h1></div>
          <button onClick={() => setIsBookingOpen(true)} className="px-8 py-4 bg-[#e21b1b] rounded-full text-xs font-black uppercase hover:bg-[#c01616] transition-all text-white shadow-xl shadow-[#e21b1b]/20 tracking-widest flex items-center gap-2"><Plus size={16} /> New Appointment</button>
       </div>

       <div className="grid grid-cols-12 gap-8 mb-12">
          <SimpleCard className="col-span-12 lg:col-span-8" title="Real-Time Queue Status" icon={Clock}>
             <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                   <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2">My Position</p>
                   <span className="text-4xl font-black italic font-syne text-[#e21b1b]">#04</span>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                   <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2">Est. Wait Time</p>
                   <span className="text-4xl font-black italic font-syne text-white">12m</span>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                   <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2">Active Doctors</p>
                   <span className="text-4xl font-black italic font-syne text-white">08</span>
                </div>
             </div>
             <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <Loader2 size={14} className="text-blue-500 animate-spin" />
                <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-widest">Queue is moving faster than usual. Please stay near the clinic.</p>
             </div>
          </SimpleCard>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 justify-center">
             <button onClick={() => setVisitType('online')} className={`w-full py-5 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${visitType === 'online' ? 'bg-[#e21b1b] text-white shadow-xl shadow-[#e21b1b]/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>Online Consultations</button>
             <button onClick={() => setVisitType('physical')} className={`w-full py-5 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${visitType === 'physical' ? 'bg-[#e21b1b] text-white shadow-xl shadow-[#e21b1b]/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>Physical Visits</button>
          </div>
       </div>

       <AnimatePresence>
          {isBookingOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#050911]/98 backdrop-blur-2xl z-[2000] flex items-center justify-center p-6">
               <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-slate-900 border border-white/10 w-full max-w-5xl rounded-[64px] p-12 relative shadow-2xl overflow-y-auto max-h-[90vh]">
                  <button onClick={resetBooking} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40"><X size={24} /></button>
                  
                  {isProcessing ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-8">
                       <Loader2 size={80} className="text-[#e21b1b] animate-spin" />
                       <h2 className="text-4xl font-black italic font-syne text-white uppercase tracking-tight">Processing Secure Payment...</h2>
                       <p className="text-lg text-white/40 font-jakarta">Please do not refresh the page.</p>
                    </div>
                  ) : bookingStep === 1 ? (
                    <div className="space-y-12">
                       <h2 className="text-4xl font-black italic font-syne text-white text-center tracking-tight">Which specialist do you need?</h2>
                       <div className="grid grid-cols-4 gap-6">
                          {categories.map(cat => (
                            <button key={cat.id} onClick={() => { setSelectedCat(cat.name); setBookingStep(2); }} className="bg-white/5 border border-white/10 p-10 rounded-[48px] flex flex-col items-center gap-6 hover:bg-[#e21b1b] group transition-all">
                               <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/20 group-hover:text-white transition-all"><cat.icon size={32} /></div>
                               <span className="text-xs font-black uppercase tracking-widest text-white">{cat.name}</span>
                            </button>
                          ))}
                       </div>
                    </div>
                  ) : bookingStep === 2 ? (
                    <div className="space-y-12">
                       <div className="flex items-center gap-4"><button onClick={() => setBookingStep(1)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40"><ChevronLeft size={20} /></button><h2 className="text-4xl font-black italic font-syne text-white tracking-tight">Doctors in {selectedCat}</h2></div>
                       <div className="grid grid-cols-2 gap-6">
                          {medicalExperts.filter(d => d.specialty === selectedCat || !selectedCat).map(doc => (
                            <button key={doc.id} onClick={() => setBookingStep(3)} className="bg-white/5 border border-white/10 p-8 rounded-[48px] flex items-center gap-8 hover:bg-white/10 transition-all text-left relative overflow-hidden group">
                               <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 border-2 border-transparent group-hover:border-[#e21b1b] transition-all shadow-2xl"><img src={doc.img} className="w-full h-full object-cover" /></div>
                               <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between"><h3 className="text-2xl font-bold font-syne italic text-white leading-none">{doc.name}</h3><div className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor" /><span className="text-xs font-bold">{doc.rating}</span></div></div>
                                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">{doc.clinic}</p>
                                  <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-jakarta">{doc.bio}</p>
                                  <div className="flex items-center gap-4 pt-4"><div className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-full font-jakarta">{doc.reviews} Reviews</div><div className="text-lg font-black text-[#e21b1b] italic font-syne">${doc.price}</div></div>
                               </div>
                            </button>
                          ))}
                       </div>
                    </div>
                  ) : bookingStep === 3 ? (
                    <div className="space-y-12 max-w-xl mx-auto">
                       <h2 className="text-4xl font-black italic font-syne text-white text-center tracking-tight">Complete Payment</h2>
                       <div className="bg-white/5 border border-white/10 p-10 rounded-[48px] space-y-8 shadow-2xl">
                          <div className="flex items-center justify-between"><p className="text-lg text-white/60 font-jakarta">Consultation Fee</p><p className="text-3xl font-black italic font-syne text-white">$150.00</p></div>
                          <div className="space-y-4">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Payment Method</label>
                             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between">
                                <div className="flex items-center gap-4"><CreditCard className="text-[#e21b1b]" /><span className="text-sm font-bold text-white font-jakarta">Visa ending in 4242</span></div>
                                <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Change</span>
                             </div>
                          </div>
                          <button onClick={handlePayment} className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white shadow-2xl shadow-[#e21b1b]/30 tracking-widest">Pay & Confirm Appointment</button>
                       </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 space-y-10"> <CheckCircle2 size={80} className="text-green-500 mx-auto drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" /> <h2 className="text-5xl font-black italic font-syne text-white uppercase italic tracking-tight">Payment Successful</h2> <p className="text-lg text-white/50 font-jakarta">Your appointment is confirmed. Check your email for the visit details.</p> <button onClick={resetBooking} className="px-12 py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white shadow-2xl shadow-[#e21b1b]/30 tracking-widest">Back to Dashboard</button> </div>
                  )}
               </motion.div>
            </motion.div>
          )}
       </AnimatePresence>

       <div className="grid grid-cols-12 gap-10 pb-20">
          <div className="col-span-12 lg:col-span-5"><div className="bg-slate-900/60 backdrop-blur-3xl border border-white/5 p-10 rounded-[48px] shadow-2xl"><div className="grid grid-cols-7 gap-3">{days.map((d, i) => ( <button key={i} onClick={() => setSelectedDate(d.date)} className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${selectedDate === d.date ? 'bg-[#e21b1b] text-white shadow-xl shadow-[#e21b1b]/20' : 'hover:bg-white/5 text-white/40'}`}><span className="text-[8px] font-black uppercase tracking-tighter font-jakarta">{d.day}</span><span className="text-lg font-bold font-syne italic">{d.date}</span></button> ))}</div></div></div>
          <div className="col-span-12 lg:col-span-7 space-y-4">{['Dr. Jane Cooper', 'Dr. Guy Hawkins'].map((app, i) => ( <div key={i} className="bg-slate-900/60 p-6 rounded-[32px] border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all shadow-xl"><div className="flex items-center gap-6"><div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e21b1b]"><Clock size={20} /></div><div><h3 className="text-lg font-bold font-syne italic text-white leading-none mb-1">{app}</h3><p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Scheduled Appointment</p></div></div><div className="text-right"><p className="text-sm font-bold text-white mb-1 font-jakarta">10:00 AM</p><span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 tracking-widest">Confirmed</span></div></div> ))}</div>
       </div>
    </div>
  );
};

const MedicalRecords = ({ currentProfile }) => {
  const data = profilesData[currentProfile] || profilesData['01'];
  return (
    <div className="max-w-[1400px] mx-auto py-12 px-12 space-y-10">
       <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">My Digital Vault</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Medical Records.</h1></div>
       <div className="grid grid-cols-4 gap-6 pb-20">
          {['Blood Test Result', 'MRI Scan Report', 'Doctor Prescription', 'Health History'].map((file, i) => (
            <div key={i} className="bg-slate-900/60 p-8 rounded-[40px] border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden shadow-2xl">
               <div className="w-12 h-12 bg-[#e21b1b]/10 rounded-xl flex items-center justify-center text-[#e21b1b] mb-6"><FileText size={20} /></div>
               <h3 className="text-lg font-bold font-syne italic mb-1 text-white">{file}</h3>
               <button onClick={() => downloadMedicalFile('Comprehensive Report', file, data.name)} className="w-full py-3 bg-[#e21b1b] rounded-2xl text-[9px] font-black uppercase text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 mt-4 tracking-widest">Download PDF</button>
            </div>
          ))}
       </div>
    </div>
  );
};

const HomeVisitView = () => {
  const [view, setView] = useState('neighborhood'); 
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [position, setPosition] = useState({ x: 5, y: 5 });
  const [isArrived, setIsArrived] = useState(false);
  
  useEffect(() => {
    if (view === 'tracking') {
      const interval = setInterval(() => {
        setPosition(prev => {
          if (prev.x >= 80 && prev.y >= 80) {
             setIsArrived(true);
             clearInterval(interval);
             return prev;
          }
          return {
            x: prev.x + 0.5,
            y: prev.y + 0.5
          };
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [view]);

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-12 space-y-12 h-full">
       <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">Home Visit Utility</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Smart Visit.</h1></div>
       
       <AnimatePresence mode="wait">
          {view === 'neighborhood' ? (
            <motion.div key="neigh" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="grid grid-cols-12 gap-8 h-full">
               <div className="col-span-12 lg:col-span-4 space-y-6 overflow-y-auto max-h-[700px] pr-4 custom-scrollbar">
                  <h3 className="text-2xl font-black italic font-syne text-white mb-6 uppercase">Doctors Nearby</h3>
                  {medicalExperts.map(doc => (
                    <button key={doc.id} onClick={() => { setSelectedDoc(doc); setView('profile'); }} className="w-full bg-slate-900/60 p-6 rounded-[32px] border border-white/5 flex items-center gap-6 hover:bg-[#e21b1b] group transition-all text-left">
                       <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0"><img src={doc.img} className="w-full h-full object-cover" /></div>
                       <div>
                          <h4 className="text-lg font-bold font-syne italic text-white leading-none mb-1">{doc.name}</h4>
                          <p className="text-[9px] font-black text-white/40 group-hover:text-white/80 uppercase tracking-widest mb-2">{doc.specialty}</p>
                          <div className="flex items-center gap-2 text-white/30 group-hover:text-white/60"><Locate size={10} /><span className="text-[9px] font-bold">{doc.dist} away</span></div>
                       </div>
                    </button>
                  ))}
               </div>
               <div className="col-span-12 lg:col-span-8 bg-slate-900/60 rounded-[64px] border border-white/5 relative overflow-hidden h-[600px] shadow-2xl">
                  {/* HIGH-DETAIL CITY STREET GRID */}
                  <div className="absolute inset-0 bg-[#0a0f18]">
                     <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
                        <defs>
                           <pattern id="street-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                              <rect width="100" height="100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2"/>
                              <circle cx="50" cy="50" r="1.5" fill="white" opacity="0.1" />
                           </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#street-pattern)" />
                        {/* Urban Blocks/Buildings */}
                        <rect x="150" y="150" width="100" height="100" fill="rgba(255,255,255,0.03)" rx="8" />
                        <rect x="350" y="150" width="100" height="100" fill="rgba(255,255,255,0.03)" rx="8" />
                        <rect x="550" y="150" width="100" height="100" fill="rgba(255,255,255,0.03)" rx="8" />
                        <rect x="750" y="150" width="100" height="100" fill="rgba(255,255,255,0.03)" rx="8" />
                        
                        <rect x="150" y="350" width="100" height="100" fill="rgba(255,255,255,0.03)" rx="8" />
                        <rect x="350" y="350" width="100" height="100" fill="rgba(255,255,255,0.03)" rx="8" />
                        <rect x="550" y="350" width="100" height="100" fill="rgba(255,255,255,0.03)" rx="8" />
                        <rect x="750" y="350" width="100" height="100" fill="rgba(255,255,255,0.03)" rx="8" />

                        {/* Street Label Simulations */}
                        <text x="20" y="90" fill="rgba(255,255,255,0.1)" fontSize="10" fontWeight="900" fontStyle="italic">LEXINGTON AVE</text>
                        <text x="20" y="290" fill="rgba(255,255,255,0.1)" fontSize="10" fontWeight="900" fontStyle="italic">BROADWAY</text>
                     </svg>
                     <img src="https://images.unsplash.com/photo-1541339907198-e08759df9923?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale brightness-200 contrast-150 mix-blend-screen" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="p-8 bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[40px] text-center max-w-sm shadow-2xl">
                        <MapPin size={40} className="text-[#e21b1b] mx-auto mb-4" />
                        <h3 className="text-xl font-black italic font-syne text-white uppercase mb-2">Street View Active</h3>
                        <p className="text-xs text-white/40 font-jakarta">Showing detailed local city grid for emergency clinical dispatch.</p>
                     </div>
                  </div>
               </div>
            </motion.div>
          ) : view === 'profile' ? (
            <motion.div key="prof" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-4xl mx-auto">
               <button onClick={() => setView('neighborhood')} className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase text-white/40 hover:text-white tracking-widest"><ChevronLeft size={14} /> Back to Map</button>
               <div className="bg-slate-900/60 p-12 rounded-[64px] border border-white/5 flex gap-12 items-center shadow-2xl">
                  <div className="w-56 h-56 rounded-[48px] overflow-hidden border-4 border-white/5 shadow-2xl shrink-0"><img src={selectedDoc?.img} className="w-full h-full object-cover" /></div>
                  <div className="space-y-6">
                     <div>
                        <span className="text-[10px] font-black text-[#e21b1b] uppercase tracking-widest">{selectedDoc?.specialty}</span>
                        <h2 className="text-4xl font-black italic font-syne text-white uppercase mt-1">{selectedDoc?.name}</h2>
                     </div>
                     <p className="text-lg text-white/50 leading-relaxed font-jakarta italic">"{selectedDoc?.bio}"</p>
                     <div className="flex gap-8 items-center border-y border-white/5 py-6">
                        <div><p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Rating</p><p className="text-xl font-bold font-syne italic text-white">{selectedDoc?.rating} / 5.0</p></div>
                        <div><p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Fee</p><p className="text-xl font-bold font-syne italic text-white">${selectedDoc?.price}</p></div>
                        <div><p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Distance</p><p className="text-xl font-bold font-syne italic text-white">{selectedDoc?.dist}</p></div>
                     </div>
                     <button onClick={() => setView('tracking')} className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white shadow-2xl shadow-[#e21b1b]/30 tracking-widest">Confirm & Request Home Visit</button>
                  </div>
               </div>
            </motion.div>
          ) : (
            <motion.div key="track" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-12 gap-8 h-full relative">
               <div className="col-span-12 lg:col-span-8 bg-slate-900/60 rounded-[64px] border border-white/5 h-[600px] relative overflow-hidden shadow-2xl p-4">
                  {/* ZOOMED URBAN STREET DISPATCH MAP */}
                  <div className="absolute inset-0 bg-[#060a10]">
                     <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
                        <defs>
                           <pattern id="zoom-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                              <rect width="100" height="100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
                           </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#zoom-grid)" />
                        {/* City Corridors */}
                        <path d="M0,100 L1000,100 M0,300 L1000,300 M0,500 L1000,500 M0,700 L1000,700" stroke="rgba(255,255,255,0.08)" strokeWidth="30" fill="none" />
                        <path d="M100,0 L100,1000 M400,0 L400,1000 M700,0 L700,1000" stroke="rgba(255,255,255,0.08)" strokeWidth="30" fill="none" />
                        {/* ACTUAL DISPATCH ROUTE */}
                        <path d="M100,100 L400,100 L400,500 L700,500 L700,800" stroke="#e21b1b" strokeWidth="6" strokeDasharray="15,15" fill="none" className="drop-shadow-[0_0_20px_rgba(226,27,27,1)]" />
                        <text x="120" y="90" fill="rgba(255,255,255,0.2)" fontSize="12" fontWeight="900" fontStyle="italic">DISPATCH CENTER</text>
                        <text x="720" y="790" fill="rgba(255,255,255,0.2)" fontSize="12" fontWeight="900" fontStyle="italic">PATIENT HUB</text>
                     </svg>
                     <img src="https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale brightness-200 mix-blend-screen" />
                  </div>
                  
                  <motion.div className="absolute z-20 flex flex-col items-center" animate={{ left: `${position.x}%`, top: `${position.y}%` }} transition={{ duration: 0.1, ease: "linear" }}>
                     <div className="bg-[#e21b1b] p-3 rounded-2xl shadow-[0_0_60px_rgba(226,27,27,1)] relative border-2 border-white/20">
                        <Truck size={32} className="text-white" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-[#e21b1b] animate-ping" />
                     </div>
                     <div className="mt-3 px-4 py-2 bg-slate-900 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl"><p className="text-[10px] font-black text-white uppercase tracking-widest">{selectedDoc?.name}</p></div>
                  </motion.div>

                  <div className="absolute left-[80%] top-[80%] z-10 flex flex-col items-center">
                     <div className="bg-blue-600 p-5 rounded-3xl shadow-[0_0_80px_rgba(37,99,235,1)] border-2 border-white/20"><Home size={32} className="text-white" /></div>
                     <div className="mt-4 px-5 py-2.5 bg-slate-900 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl"><p className="text-[11px] font-black text-white uppercase tracking-widest">RESIDENCE</p></div>
                  </div>

                  <div className="absolute top-10 left-10 p-8 bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[48px] max-w-[320px] z-30 shadow-2xl">
                     <div className="flex items-center gap-3 mb-4"><div className="w-2.5 h-2.5 bg-[#e21b1b] rounded-full animate-ping" /><p className="text-[11px] font-black text-[#e21b1b] uppercase tracking-widest">Active Urban Dispatch</p></div>
                     <h3 className="text-2xl font-black italic font-syne text-white mb-3 leading-tight">Live Route Tracking</h3>
                     <p className="text-xs text-white/40 font-jakarta mb-6">Clinical specialist is currently navigating primary urban corridors to reach your location at priority speed.</p>
                     <div className="flex items-center gap-2 text-white/60"><Clock size={16} /><span className="text-[12px] font-black tracking-widest uppercase text-white">{isArrived ? 'STATUS: REACHED' : 'EST: 02m 45s'}</span></div>
                  </div>

                  <AnimatePresence>
                     {isArrived && (
                        <motion.div initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 z-[2000] flex items-center justify-center bg-[#050911]/98 backdrop-blur-3xl p-10">
                           <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#e21b1b] p-24 rounded-[80px] text-center shadow-[0_0_250px_rgba(226,27,27,1)] border-8 border-white/20 max-w-2xl relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-full h-4 bg-white/20 animate-pulse" />
                              <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center mx-auto mb-14 shadow-[0_0_60px_rgba(255,255,255,0.4)] animate-bounce">
                                 <Check size={100} className="text-[#e21b1b]" strokeWidth={6} />
                              </div>
                              <h2 className="text-8xl font-black italic font-syne text-white uppercase tracking-tighter mb-8 leading-none">DOCTOR REACHED</h2>
                              <p className="text-3xl text-white font-jakarta font-black mb-16 leading-relaxed uppercase tracking-[0.2em]">SPECIALIST HAS REACHED YOUR LOCATION. OPEN MAIN ENTRANCE NOW.</p>
                              <button onClick={() => { setView('neighborhood'); setIsArrived(false); setPosition({x:5, y:5}); }} className="w-full py-10 bg-white text-[#e21b1b] rounded-full text-2xl font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-slate-100 transition-all active:scale-95">ACKNOWLEDGE ARRIVAL</button>
                           </motion.div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
               <div className="col-span-12 lg:col-span-4 space-y-6">
                  <SimpleCard title="Clinical Hub" icon={ShieldCheck}>
                     <div className="flex items-center gap-6 mb-6">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-xl"><img src={selectedDoc?.img} className="w-full h-full object-cover" /></div>
                        <div><h3 className="text-xl font-bold font-syne italic text-white leading-none mb-1">{selectedDoc?.name}</h3><p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest">{selectedDoc?.specialty}</p></div>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                        <div className="flex items-center gap-3"><Phone size={14} className="text-white/40" /><span className="text-xs font-bold text-white font-jakarta">+1 234 567 890</span></div>
                        <button className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20"><Send size={14} /></button>
                     </div>
                  </SimpleCard>
                  <div className="p-10 bg-slate-900/60 border-4 border-[#e21b1b] rounded-[48px] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all"><Siren size={150} className="text-[#e21b1b]" /></div>
                     <div className="relative z-10">
                        <p className="text-[12px] font-black text-[#e21b1b] uppercase tracking-[0.4em] mb-8">URGENT PATIENT ALERT</p>
                        <p className="text-lg text-white font-jakarta font-black leading-snug uppercase tracking-wide">Specialist arrival is IMMINENT. Ensure all clinical identifiers are ready and clear the path to the primary residence HUB immediately.</p>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

const FamilySync = ({ onSwitch }) => (
  <div className="max-w-[1400px] mx-auto py-12 px-12 space-y-12">
     <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">Manage Profiles</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Family Members.</h1></div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {Object.keys(profilesData).map((id) => (
          <div key={id} className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 flex flex-col items-center text-center group shadow-2xl">
             <div className="w-28 h-28 rounded-[36px] overflow-hidden border-4 border-white/10 mb-6 group-hover:border-[#e21b1b] transition-all shadow-xl"><img src={profilesData[id].img} className="w-full h-full object-cover" /></div>
             <h3 className="text-2xl font-black italic font-syne mb-2 text-white">{profilesData[id].name}</h3>
             <p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest mb-6">{profilesData[id].role}</p>
             <button onClick={() => onSwitch(id)} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-[#e21b1b] hover:border-[#e21b1b] transition-all tracking-widest">Switch to this Profile</button>
          </div>
        ))}
     </div>
  </div>
);

const ProfileSettings = () => (
  <div className="max-w-[1200px] mx-auto py-12 px-12 space-y-12">
     <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">My Account</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Settings.</h1></div>
     <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 max-w-xl shadow-2xl"><h3 className="text-2xl font-black italic font-syne text-white mb-8 leading-none">Profile Information</h3><div className="space-y-4 mb-8"><label className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Full Name</label><input defaultValue="Alex Johnson" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#e21b1b] transition-all font-medium text-white font-jakarta" /></div><button className="w-full py-4 bg-[#e21b1b] rounded-full text-[10px] font-black uppercase text-white tracking-widest">Save Changes</button></div>
  </div>
);

// --- MAIN LAYOUT ---

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [sosStep, setSosStep] = useState(1);
  const [currentProfile, setCurrentProfile] = useState('01');

  const handleSwitchProfile = (id) => {
    setCurrentProfile(id);
    setIsProfileOpen(false);
    navigate('/dashboard');
  };

  const triggerSOS = () => {
    setIsSOSOpen(true);
    setSosStep(1);
  };

  const menu = [
    { id: 'dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'diagnostics', icon: Microscope, path: '/dashboard/diagnostics' },
    { id: 'appointments', icon: Calendar, path: '/dashboard/appointments' },
    { id: 'homevisit', icon: MapIcon, path: '/dashboard/homevisit' },
    { id: 'wellness', icon: Heart, path: '/dashboard/wellness' },
    { id: 'vault', icon: Shield, path: '/dashboard/vault' },
    { id: 'family', icon: Users, path: '/dashboard/family' },
    { id: 'settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const currentPath = location.pathname;
  const isHome = currentPath === '/dashboard' || currentPath === '/dashboard/';
  const data = profilesData[currentProfile];

  return (
    <div className="min-h-screen bg-[#050911] text-white selection:bg-[#e21b1b]/30 overflow-x-hidden font-jakarta">
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3 bg-slate-900/80 backdrop-blur-3xl border border-white/5 rounded-[32px] z-[1000] shadow-2xl">
         {menu.map(item => {
           const isActive = (item.id === 'dashboard' && isHome) || (item.id !== 'dashboard' && currentPath.includes(item.id));
           return (
             <button key={item.id} onClick={() => { navigate(item.path); setIsProfileOpen(false); setIsNotifyOpen(false); }} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all relative group ${isActive ? 'bg-[#e21b1b] text-white shadow-[0_0_20px_rgba(226,27,27,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
             </button>
           );
         })}
         <div className="w-8 h-px bg-white/5 mx-auto my-2" />
         <button onClick={() => navigate('/')} className="w-12 h-12 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-all"><LogOut size={20} /></button>
      </nav>

      <main className="pl-28 pr-6 lg:pr-10 py-10 min-h-screen relative">
         <header className="flex items-center justify-between mb-12 relative z-[100]">
            <div className="flex items-center gap-6"><Logo size="9" /></div>
            <div className="flex items-center gap-6">
               <button onClick={triggerSOS} className="px-6 py-2.5 bg-[#e21b1b] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#c01616] transition-all shadow-xl shadow-[#e21b1b]/20 animate-pulse text-glow">
                  <ShieldAlert size={14} /> Emergency SOS
               </button>
               <div className="relative">
                  <button onClick={() => { setIsNotifyOpen(!isNotifyOpen); setIsProfileOpen(false); }} className={`w-10 h-10 rounded-xl bg-white/5 border flex items-center justify-center transition-all relative ${isNotifyOpen ? 'border-[#e21b1b] text-white shadow-[0_0_15px_rgba(226,27,27,0.3)]' : 'border-white/10 text-white/30 hover:text-white'}`}><Bell size={18} /><span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#e21b1b] rounded-full" /></button>
                  <AnimatePresence>{isNotifyOpen && ( <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute right-0 mt-4 w-80 bg-slate-900 border border-white/10 rounded-[32px] p-6 shadow-2xl z-[200]"> <p className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b] mb-6 font-jakarta">Recent Alerts</p> <div className="space-y-4"> <div className="flex gap-4"><div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 shrink-0"><CheckCircle2 size={14} /></div><p className="text-xs text-white/60 leading-relaxed font-jakarta">Your heart rate history was updated successfully.</p></div> </div> </motion.div> )}</AnimatePresence>
               </div>
               <div className="relative">
                  <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifyOpen(false); }} className={`flex items-center gap-3 pl-6 border-l border-white/10 transition-all ${isProfileOpen ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}>
                     <div className="text-right hidden sm:block"><p className="text-xs font-bold font-syne italic text-white leading-none mb-1">{data.name}</p><p className="text-[8px] font-black text-[#e21b1b] uppercase tracking-widest tracking-tighter">{data.role}</p></div>
                     <div className="w-10 h-10 rounded-xl bg-white/10 overflow-hidden border border-white/10"><img src={data.img} className="w-full h-full object-cover" /></div>
                  </button>
                  <AnimatePresence>{isProfileOpen && ( <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute right-0 mt-4 w-72 bg-slate-900 border border-white/10 rounded-[32px] p-6 shadow-2xl z-[200]"> <p className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b] mb-6 font-jakarta">Family Profiles</p> <div className="space-y-3"> {Object.keys(profilesData).map(pid => ( <button key={pid} onClick={() => handleSwitchProfile(pid)} className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left ${pid === currentProfile ? 'bg-[#e21b1b]/10 border border-[#e21b1b]/20' : 'hover:bg-white/5 border border-transparent'}`}> <img src={profilesData[pid].img} className="w-8 h-8 rounded-lg object-cover" /> <p className="text-xs font-bold font-syne italic text-white">{profilesData[pid].name}</p> </button> ))} </div> </motion.div> )}</AnimatePresence>
               </div>
            </div>
         </header>

         {/* Emergency Modal */}
         <AnimatePresence>
            {isSOSOpen && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#050911]/98 backdrop-blur-3xl z-[3000] flex items-center justify-center p-6">
                  <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-slate-900 border-4 border-[#e21b1b] w-full max-w-4xl rounded-[64px] p-12 relative shadow-[0_0_100px_rgba(226,27,27,0.3)] text-center overflow-hidden">
                     <button onClick={() => setIsSOSOpen(false)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40"><X size={24} /></button>
                     
                     <AnimatePresence mode="wait">
                        {sosStep === 1 ? (
                           <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                              <Siren size={80} className="text-[#e21b1b] mx-auto animate-bounce" />
                              <h2 className="text-6xl font-black italic font-syne text-white uppercase tracking-tighter">Emergency Mode</h2>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <button onClick={() => setSosStep(2)} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-[#e21b1b] transition-all group">
                                    <MapIcon size={32} className="mx-auto mb-4 text-[#e21b1b] group-hover:text-white" />
                                    <span className="text-xs font-black uppercase tracking-widest text-white">Nearest Hospital</span>
                                 </button>
                                 <button onClick={() => setSosStep(2)} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-[#e21b1b] transition-all group">
                                    <Navigation size={32} className="mx-auto mb-4 text-[#e21b1b] group-hover:text-white" />
                                    <span className="text-xs font-black uppercase tracking-widest text-white">Alert Family</span>
                                 </button>
                                 <button onClick={() => setSosStep(2)} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-[#e21b1b] transition-all group">
                                    <Home size={32} className="mx-auto mb-4 text-[#e21b1b] group-hover:text-white" />
                                    <span className="text-xs font-black uppercase tracking-widest text-white">Request Visit</span>
                                 </button>
                              </div>
                           </motion.div>
                        ) : (
                           <motion.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12 py-10">
                              <CheckCircle2 size={100} className="text-green-500 mx-auto drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                              <h2 className="text-5xl font-black italic font-syne text-white uppercase tracking-tight">Protocols Initiated</h2>
                              <div className="max-w-md mx-auto space-y-4">
                                 <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-4 text-left border border-white/5">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                                    <p className="text-xs font-bold text-white/60 font-jakarta uppercase tracking-widest">Emergency services dispatched</p>
                                 </div>
                                 <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-4 text-left border border-white/5">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                                    <p className="text-xs font-bold text-white/60 font-jakarta uppercase tracking-widest">Family contacts alerted</p>
                                 </div>
                              </div>
                              <button onClick={() => setIsSOSOpen(false)} className="px-12 py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white shadow-2xl shadow-[#e21b1b]/30 tracking-widest">Acknowledge</button>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

         <AnimatePresence mode="wait" initial={false}>
            <Routes>
               <Route index element={<ViewWrapper><PatientDashboard currentProfile={currentProfile} /></ViewWrapper>} />
               <Route path="diagnostics" element={<ViewWrapper><DiagnosticsHub /></ViewWrapper>} />
               <Route path="appointments" element={<ViewWrapper><Appointments /></ViewWrapper>} />
               <Route path="homevisit" element={<ViewWrapper><HomeVisitView /></ViewWrapper>} />
               <Route path="wellness" element={<ViewWrapper><WellnessHub /></ViewWrapper>} />
               <Route path="vault" element={<ViewWrapper><MedicalRecords currentProfile={currentProfile} /></ViewWrapper>} />
               <Route path="family" element={<ViewWrapper><FamilySync onSwitch={handleSwitchProfile} /></ViewWrapper>} />
               <Route path="settings" element={<ViewWrapper><ProfileSettings /></ViewWrapper>} />
               <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
         </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuperDoctorPage />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;