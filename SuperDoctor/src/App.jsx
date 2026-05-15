import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import SuperDoctorPage from './landingpage/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Activity, Shield, ChevronRight, Bell, Phone,
  LayoutDashboard, Users, Settings, Clock,
  Calendar, MapPin, Plus, CheckCircle2,
  Download, Send, LogOut,
  ShieldCheck, X, ChevronLeft, DollarSign,
  Stethoscope, Brain, Baby, FileText, Home, Star,
  Smile, Loader2, CreditCard, PlayCircle, Quote,
  Navigation, ShieldAlert, Siren, Map as MapIcon, Microscope, Locate, Check, Truck,
  AlertTriangle, RefreshCcw, Moon, Coffee, Zap, Thermometer, Wind, Eye,
  ChevronDown, Frown, Meh, TrendingUp, User, Video
} from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

// ─── DATA ──────────────────────────────────────────────────────────────────────
const profilesData = {
  '01': {
    name: "Alex Johnson", role: "Active Patient",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    stats: { heartRate: 72, oxygen: 98, mental: "Healthy" },
    history: [
      { time: '00:00', heartRate: 65, oxygen: 98 }, { time: '04:00', heartRate: 62, oxygen: 99 },
      { time: '08:00', heartRate: 75, oxygen: 98 }, { time: '12:00', heartRate: 82, oxygen: 97 },
      { time: '16:00', heartRate: 78, oxygen: 98 }, { time: '20:00', heartRate: 70, oxygen: 99 },
    ]
  },
  '02': {
    name: "Sarah Johnson", role: "Wellness Profile",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    stats: { heartRate: 68, oxygen: 99, mental: "Stable" },
    history: [{ time: '00:00', heartRate: 60, oxygen: 99 }, { time: '08:00', heartRate: 65, oxygen: 99 }, { time: '16:00', heartRate: 70, oxygen: 98 }]
  },
  '03': {
    name: "Leo Johnson", role: "Child Profile",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    stats: { heartRate: 95, oxygen: 97, mental: "Energetic" },
    history: [{ time: '00:00', heartRate: 85, oxygen: 97 }, { time: '08:00', heartRate: 92, oxygen: 98 }, { time: '16:00', heartRate: 100, oxygen: 97 }]
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

const trainingVideos = [
  { id: 1, title: "Full Body Morning Yoga Flow", category: "Flexibility", duration: "20 min", ytId: "v7AYKMP6rOE", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "HIIT Cardio Blast", category: "Cardio", duration: "30 min", ytId: "ml6cT4AZdqI", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "Core Strength Builder", category: "Strength", duration: "25 min", ytId: "DHD1-2P4jck", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80" },
  { id: 4, title: "Mindful Meditation & Breathing", category: "Mindfulness", duration: "15 min", ytId: "inpok4MKVLM", img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80" },
  { id: 5, title: "Posture & Spine Correction", category: "Physiotherapy", duration: "18 min", ytId: "RqcOCBb4arc", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=400&q=80" },
  { id: 6, title: "Immunity Booster Workout", category: "Wellness", duration: "22 min", ytId: "UItWltVZglo", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80" },
  { id: 7, title: "Senior Friendly Mobility", category: "Elderly Care", duration: "20 min", ytId: "Cb7fNOCOsUo", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80" },
  { id: 8, title: "Sleep Prep & Wind Down", category: "Recovery", duration: "12 min", ytId: "aEqlQvczMJQ", img: "https://images.unsplash.com/photo-1511293853672-438fa521529a?auto=format&fit=crop&w=400&q=80" },
];

const motivationalQuotes = [
  "Health is wealth.", "Your body is your temple.", "Believe you can.", "Small steps daily.",
  "Consistency is key.", "Never give up.", "Mind over matter.", "Stay focused.",
  "Eat for fuel.", "Move your body.", "Sleep is recovery.", "Mental health matters.",
  "Success takes time.", "Keep pushing forward.", "You are stronger than you think.",
  "Start today.", "Good things take time.", "Discipline beats motivation.",
  "Energy flows where focus goes.", "Stronger every day.", "Hard work pays off.",
  "Be the best version of you.", "Dream big, work hard.", "Focus on the goal.",
  "Excellence is a habit.", "Progress not perfection.", "Keep the fire burning.",
  "You've got this.", "Commit to fit.", "Mindset is everything.",
];

// ─── UTILS ─────────────────────────────────────────────────────────────────────
const downloadMedicalFile = (type, name, patientName) => {
  const content = `-----------------------------------------------------------\nSUPERDOC MEDICAL PORTAL - OFFICIAL REPORT\n-----------------------------------------------------------\nPATIENT: ${patientName}\nDATE: ${new Date().toLocaleDateString()}\nTYPE: ${type}\nREF: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nSUMMARY:\nThis is a verified digital copy of your medical record.\nThe results indicate stable physiological nodes.\n\nAuthorized by: SuperDoc Clinical System\n-----------------------------------------------------------`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${name.replace(/\s+/g, '_')}_Report.txt`;
  document.body.appendChild(a); a.click();
  window.URL.revokeObjectURL(url); document.body.removeChild(a);
};

// ─── BASE COMPONENTS ────────────────────────────────────────────────────────────
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

// ─── QUOTE MARQUEE (hover-to-pause, left→right scroll, readable) ────────────────
const QuoteMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...motivationalQuotes, ...motivationalQuotes];
  return (
    <div
      className="overflow-hidden whitespace-nowrap bg-white/5 border-y border-white/5 py-4 relative cursor-default select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      title="Hover to pause"
    >
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marquee-scroll 90s linear infinite;
          will-change: transform;
        }
        .marquee-inner.paused { animation-play-state: paused; }
      `}</style>
      <div
        className={`marquee-inner inline-flex items-center${isPaused ? ' paused' : ''}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((q, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8">
            <Quote size={13} className="text-[#e21b1b] shrink-0 opacity-80" />
            <span className="text-sm font-black font-syne italic text-white/90 tracking-widest uppercase">{q}</span>
            <span className="text-[#e21b1b]/40 text-lg font-black">·</span>
          </span>
        ))}
        {doubled.map((q, i) => (
          <span key={`b${i}`} className="inline-flex items-center gap-3 px-8">
            <Quote size={13} className="text-[#e21b1b] shrink-0 opacity-80" />
            <span className="text-sm font-black font-syne italic text-white/90 tracking-widest uppercase">{q}</span>
            <span className="text-[#e21b1b]/40 text-lg font-black">·</span>
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050911] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050911] to-transparent z-10 pointer-events-none" />
      {isPaused && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 border border-white/20 backdrop-blur-xl px-3 py-1 rounded-full">
          <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">Paused</span>
        </div>
      )}
    </div>
  );
};

// ─── SYMPTOM CHECKER (5 meaningful steps) ──────────────────────────────────────
const symptomsByRegion = {
  head:    ['Throbbing headache', 'Dizziness / Vertigo', 'Blurred or double vision', 'Ear pain / Ringing', 'Sore throat / Difficulty swallowing', 'Nasal congestion / Sinus pressure'],
  chest:   ['Chest tightness or pressure', 'Shortness of breath', 'Heart palpitations', 'Persistent dry cough', 'Wheezing', 'Pain radiating to arm or jaw'],
  abdomen: ['Sharp or cramping abdominal pain', 'Nausea / Vomiting', 'Diarrhea or loose stools', 'Constipation / Bloating', 'Loss of appetite', 'Blood in stool'],
  back:    ['Lower back pain', 'Stiffness on waking', 'Shooting pain down leg (sciatica)', 'Upper back / shoulder blade pain', 'Muscle spasms', 'Numbness or tingling'],
  limbs:   ['Joint pain or swelling', 'Muscle aches / Cramps', 'Weakness or inability to bear weight', 'Redness / Warmth around joint', 'Limited range of motion', 'Bruising without injury'],
  skin:    ['Red rash or hives', 'Itching / Burning sensation', 'Unusual blisters or lesions', 'Dry / Peeling skin', 'Swelling / Puffiness', 'Discoloration or new moles'],
};
const conditionsByRegion = {
  head:    ['Tension Headache', 'Migraine Disorder', 'Hypertensive Episode', 'Sinusitis / Rhinitis'],
  chest:   ['GERD / Acid Reflux', 'Costochondritis', 'Anxiety-induced chest pain', 'Respiratory Infection'],
  abdomen: ['Irritable Bowel Syndrome', 'Gastroenteritis', 'Peptic Ulcer Disease', 'Gallbladder Disorder'],
  back:    ['Lumbar Muscle Strain', 'Herniated Intervertebral Disc', 'Sciatica', 'Spondylosis'],
  limbs:   ['Osteoarthritis', 'Tendinopathy / Overuse', 'Gout or Inflammatory Arthritis', 'Peripheral Neuropathy'],
  skin:    ['Contact Dermatitis', 'Eczema / Atopic Dermatitis', 'Urticaria (Hives)', 'Psoriasis'],
};
const specialistByRegion = {
  head: 'Neurologist', chest: 'Cardiologist / Pulmonologist', abdomen: 'Gastroenterologist',
  back: 'Orthopedic Specialist', limbs: 'Rheumatologist', skin: 'Dermatologist',
};
const regionMeta = [
  { id: 'head',    label: 'Head & Neck',    icon: Brain,       color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'chest',   label: 'Chest & Heart',  icon: Heart,       color: 'text-[#e21b1b]',  bg: 'bg-[#e21b1b]/10' },
  { id: 'abdomen', label: 'Abdomen / Gut',  icon: Zap,         color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 'back',    label: 'Back & Spine',   icon: Activity,    color: 'text-blue-400',   bg: 'bg-blue-500/10' },
  { id: 'limbs',   label: 'Limbs & Joints', icon: Stethoscope, color: 'text-green-400',  bg: 'bg-green-500/10' },
  { id: 'skin',    label: 'Skin & Surface', icon: Eye,         color: 'text-pink-400',   bg: 'bg-pink-500/10' },
];

const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [region, setRegion] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [pain, setPain] = useState(null);
  const [duration, setDuration] = useState(null);
  const [extras, setExtras] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const toggleSymptom = (s) => setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleExtra = (e) => setExtras(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);

  const calcUrgency = () => {
    if (pain >= 8 || region === 'chest') return 'CRITICAL';
    if (pain >= 5 || extras.includes('Fever above 38°C') || duration === '> 1 week') return 'URGENT';
    return 'ROUTINE';
  };

  const handleFinish = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        urgency: calcUrgency(),
        conditions: (conditionsByRegion[region] || []).slice(0, 3),
        specialist: specialistByRegion[region] || 'General Physician',
      });
      setAnalyzing(false);
      setStep(6);
    }, 2000);
  };

  const reset = () => { setStep(1); setRegion(null); setSymptoms([]); setPain(null); setDuration(null); setExtras([]); setResult(null); };

  const painColors = ['bg-green-500','bg-green-400','bg-lime-400','bg-yellow-300','bg-yellow-400','bg-orange-400','bg-orange-500','bg-red-400','bg-red-500','bg-red-600'];
  const painEmojis = ['😊','🙂','😐','😟','😣','😫','😖','😰','🤢','🆘'];

  const steps = ['Region','Symptoms','Pain Level','Duration','Extra Factors','Result'];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="mb-10">
        <h1 className="text-5xl font-black italic tracking-tighter font-syne text-white leading-none mb-2">Physical Check.</h1>
        <p className="text-sm text-white/40 font-jakarta">Answer 5 quick questions for a clinical triage assessment.</p>
      </div>

      {step < 6 && (
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1 rounded-full transition-all ${i < step ? 'bg-[#e21b1b]' : 'bg-white/10'}`} />
              <p className={`text-[8px] font-black uppercase tracking-widest mt-1.5 text-center ${i < step ? 'text-[#e21b1b]' : 'text-white/20'}`}>{s}</p>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Region */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <h2 className="text-2xl font-bold font-syne italic text-white mb-2">Where is your main discomfort?</h2>
              <p className="text-xs text-white/40 font-jakarta mb-8">Select the primary body region. You can refine symptoms next.</p>
              <div className="grid grid-cols-3 gap-4">
                {regionMeta.map(r => (
                  <button key={r.id} onClick={() => { setRegion(r.id); setStep(2); }}
                    className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex flex-col items-center gap-4 hover:bg-[#e21b1b] hover:border-[#e21b1b] group transition-all">
                    <div className={`w-14 h-14 ${r.bg} rounded-2xl flex items-center justify-center ${r.color} group-hover:bg-white/20 group-hover:text-white transition-all`}><r.icon size={28} /></div>
                    <span className="text-xs font-black uppercase tracking-wider text-white">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Symptoms checklist */}
        {step === 2 && region && (
          <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest mb-6 transition-all"><ChevronLeft size={14} /> Back</button>
              <h2 className="text-2xl font-bold font-syne italic text-white mb-2">Which symptoms are you experiencing?</h2>
              <p className="text-xs text-white/40 font-jakarta mb-8">Select all that apply — choose at least one to proceed.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {(symptomsByRegion[region] || []).map(s => (
                  <button key={s} onClick={() => toggleSymptom(s)}
                    className={`p-4 rounded-2xl border-2 text-left text-xs font-bold flex items-center gap-3 transition-all ${symptoms.includes(s) ? 'bg-[#e21b1b] border-[#e21b1b] text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${symptoms.includes(s) ? 'border-white bg-white' : 'border-white/30'}`}>
                      {symptoms.includes(s) && <Check size={10} strokeWidth={3} className="text-[#e21b1b]" />}
                    </div>
                    {s}
                  </button>
                ))}
              </div>
              <button disabled={symptoms.length === 0} onClick={() => setStep(3)}
                className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white tracking-widest disabled:opacity-30 shadow-xl shadow-[#e21b1b]/20 transition-all hover:bg-[#c01616]">
                Continue — {symptoms.length} symptom{symptoms.length !== 1 ? 's' : ''} selected
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Pain intensity */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest mb-6 transition-all"><ChevronLeft size={14} /> Back</button>
              <h2 className="text-2xl font-bold font-syne italic text-white mb-2">Rate your current pain intensity.</h2>
              <p className="text-xs text-white/40 font-jakarta mb-10">1 = minimal discomfort, 10 = unbearable pain.</p>
              <div className="flex gap-2 mb-6">
                {[...Array(10)].map((_, i) => (
                  <button key={i} onClick={() => setPain(i + 1)}
                    className={`flex-1 aspect-square rounded-2xl font-black text-base transition-all border-2 ${pain === i + 1 ? `${painColors[i]} border-transparent text-white shadow-lg scale-110` : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
              {pain && (
                <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl">
                  <span className="text-4xl">{painEmojis[pain - 1]}</span>
                  <div>
                    <p className="text-sm font-black text-white">{pain <= 3 ? 'Mild Discomfort' : pain <= 6 ? 'Moderate Pain' : pain <= 8 ? 'Severe Pain' : 'Critical — Seek Help Now'}</p>
                    <p className="text-[10px] text-white/40 font-jakarta uppercase tracking-widest">Pain Score: {pain}/10</p>
                  </div>
                </div>
              )}
              <button disabled={!pain} onClick={() => setStep(4)}
                className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white tracking-widest disabled:opacity-30 shadow-xl shadow-[#e21b1b]/20 transition-all hover:bg-[#c01616]">
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Duration */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <button onClick={() => setStep(3)} className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest mb-6 transition-all"><ChevronLeft size={14} /> Back</button>
              <h2 className="text-2xl font-bold font-syne italic text-white mb-2">How long have these symptoms lasted?</h2>
              <p className="text-xs text-white/40 font-jakarta mb-8">Duration helps us assess acuity and prioritize your care.</p>
              <div className="space-y-3">
                {[
                  { label: 'Less than 6 hours', desc: 'Sudden onset — could be acute', icon: Zap },
                  { label: '6 to 24 hours', desc: 'Developing condition', icon: Clock },
                  { label: '2 to 7 days', desc: 'Subacute presentation', icon: Calendar },
                  { label: '> 1 week', desc: 'Chronic or recurring pattern', icon: TrendingUp },
                ].map(opt => (
                  <button key={opt.label} onClick={() => { setDuration(opt.label); setStep(5); }}
                    className={`w-full p-5 rounded-2xl border-2 flex items-center gap-5 text-left transition-all group ${duration === opt.label ? 'bg-[#e21b1b] border-[#e21b1b] text-white' : 'bg-white/5 border-white/10 hover:bg-[#e21b1b] hover:border-[#e21b1b] text-white/70 hover:text-white'}`}>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0"><opt.icon size={18} /></div>
                    <div><p className="font-black text-sm">{opt.label}</p><p className="text-[10px] text-white/50 group-hover:text-white/80 font-jakarta">{opt.desc}</p></div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Additional factors */}
        {step === 5 && (
          <motion.div key="s5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <button onClick={() => setStep(4)} className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest mb-6 transition-all"><ChevronLeft size={14} /> Back</button>
              <h2 className="text-2xl font-bold font-syne italic text-white mb-2">Any additional symptoms present?</h2>
              <p className="text-xs text-white/40 font-jakarta mb-8">Select all that apply — these help refine your diagnosis.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['Fever above 38°C', 'Nausea or vomiting', 'Loss of consciousness', 'Severe fatigue', 'Breathing difficulty', 'Unexplained weight loss', 'Night sweats', 'Recent travel abroad'].map(e => (
                  <button key={e} onClick={() => toggleExtra(e)}
                    className={`p-4 rounded-2xl border-2 text-left text-xs font-bold flex items-center gap-3 transition-all ${extras.includes(e) ? 'bg-[#e21b1b] border-[#e21b1b] text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${extras.includes(e) ? 'border-white bg-white' : 'border-white/30'}`}>
                      {extras.includes(e) && <Check size={10} strokeWidth={3} className="text-[#e21b1b]" />}
                    </div>
                    {e}
                  </button>
                ))}
              </div>
              <button onClick={handleFinish}
                className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white tracking-widest shadow-xl shadow-[#e21b1b]/20 transition-all hover:bg-[#c01616]">
                Analyze My Symptoms
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 6: Result */}
        {step === 6 && (
          <motion.div key="s6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            {analyzing ? (
              <div className="py-24 flex flex-col items-center gap-6">
                <Activity size={60} className="text-[#e21b1b] animate-pulse" />
                <p className="text-lg font-bold italic font-syne text-white/60 uppercase tracking-widest">Analyzing clinical data…</p>
              </div>
            ) : result && (
              <div className="space-y-6">
                {/* Urgency banner */}
                <div className={`p-8 rounded-[40px] flex items-center gap-6 ${result.urgency === 'CRITICAL' ? 'bg-red-500/20 border border-red-500/40' : result.urgency === 'URGENT' ? 'bg-orange-500/20 border border-orange-500/40' : 'bg-green-500/20 border border-green-500/40'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${result.urgency === 'CRITICAL' ? 'bg-red-500' : result.urgency === 'URGENT' ? 'bg-orange-500' : 'bg-green-500'}`}>
                    {result.urgency === 'CRITICAL' ? <AlertTriangle size={32} className="text-white" /> : result.urgency === 'URGENT' ? <Clock size={32} className="text-white" /> : <CheckCircle2 size={32} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Triage Result</p>
                    <h3 className={`text-4xl font-black italic font-syne uppercase ${result.urgency === 'CRITICAL' ? 'text-red-400' : result.urgency === 'URGENT' ? 'text-orange-400' : 'text-green-400'}`}>{result.urgency}</h3>
                    <p className="text-sm text-white/60 font-jakarta mt-1">{result.urgency === 'CRITICAL' ? 'Seek immediate emergency care.' : result.urgency === 'URGENT' ? 'See a doctor within 24 hours.' : 'Schedule a routine consultation.'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Possible conditions */}
                  <div className="bg-slate-900/60 p-8 rounded-[40px] border border-white/5">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-5">Possible Conditions</p>
                    <div className="space-y-3">
                      {result.conditions.map((c, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                          <div className="w-6 h-6 rounded-lg bg-[#e21b1b]/20 flex items-center justify-center text-[#e21b1b] text-xs font-black">{i + 1}</div>
                          <span className="text-sm font-bold text-white">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Recommendation */}
                  <div className="bg-slate-900/60 p-8 rounded-[40px] border border-white/5">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-5">Recommended Specialist</p>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-5">
                      <Stethoscope size={24} className="text-blue-400 mb-2" />
                      <p className="text-sm font-black text-white">{result.specialist}</p>
                    </div>
                    <p className="text-[10px] text-white/40 font-jakarta leading-relaxed">Based on your inputs for <span className="text-white/70">{region}</span> region, pain score <span className="text-white/70">{pain}/10</span>, lasting <span className="text-white/70">{duration}</span>.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {result.urgency === 'CRITICAL'
                    ? <button onClick={() => navigate('/dashboard')} className="flex-1 py-5 bg-red-600 rounded-full text-xs font-black uppercase text-white tracking-widest shadow-xl">Activate Emergency Protocol</button>
                    : <button onClick={() => navigate('/dashboard/appointments')} className="flex-1 py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white tracking-widest shadow-xl shadow-[#e21b1b]/20">Book Specialist Now</button>
                  }
                  <button onClick={reset} className="flex items-center justify-center gap-2 px-8 py-5 bg-white/5 border border-white/10 rounded-full text-xs font-black text-white/50 hover:text-white uppercase tracking-widest transition-all">
                    <RefreshCcw size={14} /> Restart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MENTAL HEALTH CHECK (5 steps + wellness score) ────────────────────────────
const MentalHealthView = () => {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [sleepHours, setSleepHours] = useState(null);
  const [sleepQuality, setSleepQuality] = useState(null);
  const [anxietyLevel, setAnxietyLevel] = useState(null);
  const [energyFlags, setEnergyFlags] = useState([]);
  const [lifestyleAnswers, setLifestyleAnswers] = useState({});
  const [evaluating, setEvaluating] = useState(false);
  const [score, setScore] = useState(null);

  const toggleEnergy = (f) => setEnergyFlags(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const calcWellness = () => {
    let s = 100;
    if (mood <= 2) s -= 25; else if (mood === 3) s -= 10;
    if (sleepHours <= 5) s -= 20; else if (sleepHours === 6) s -= 8;
    if (sleepQuality === 'Poor') s -= 15; else if (sleepQuality === 'Fair') s -= 7;
    if (anxietyLevel === 'Nearly every day') s -= 20; else if (anxietyLevel === 'More than half the days') s -= 12; else if (anxietyLevel === 'Several days') s -= 5;
    s -= energyFlags.length * 3;
    return Math.max(10, Math.min(100, s));
  };

  const handleFinish = () => {
    setEvaluating(true);
    setTimeout(() => { setScore(calcWellness()); setEvaluating(false); setStep(6); }, 2000);
  };

  const moodOptions = [
    { val: 1, emoji: '😔', label: 'Very Low', color: 'text-red-400' },
    { val: 2, emoji: '🙁', label: 'Down', color: 'text-orange-400' },
    { val: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-400' },
    { val: 4, emoji: '🙂', label: 'Good', color: 'text-lime-400' },
    { val: 5, emoji: '😊', label: 'Excellent', color: 'text-green-400' },
  ];

  const steps = ['Mood', 'Sleep', 'Anxiety', 'Energy', 'Lifestyle', 'Result'];

  const reset = () => { setStep(1); setMood(null); setSleepHours(null); setSleepQuality(null); setAnxietyLevel(null); setEnergyFlags([]); setLifestyleAnswers({}); setScore(null); };

  const getScoreLabel = (s) => s >= 80 ? 'Excellent' : s >= 65 ? 'Good' : s >= 50 ? 'Moderate' : s >= 35 ? 'Low' : 'Critical';
  const getScoreColor = (s) => s >= 80 ? 'text-green-400' : s >= 65 ? 'text-lime-400' : s >= 50 ? 'text-yellow-400' : s >= 35 ? 'text-orange-400' : 'text-red-400';

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="mb-10">
        <h1 className="text-5xl font-black italic tracking-tighter font-syne text-white leading-none mb-2">Mental Check.</h1>
        <p className="text-sm text-white/40 font-jakarta">A clinical 5-step assessment of your psychological wellbeing.</p>
      </div>

      {step < 6 && (
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1 rounded-full transition-all ${i < step ? 'bg-green-500' : 'bg-white/10'}`} />
              <p className={`text-[8px] font-black uppercase tracking-widest mt-1.5 text-center ${i < step ? 'text-green-400' : 'text-white/20'}`}>{s}</p>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Mood */}
        {step === 1 && (
          <motion.div key="m1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <h2 className="text-2xl font-bold font-syne italic text-white mb-2">How has your overall mood been?</h2>
              <p className="text-xs text-white/40 font-jakarta mb-8">Think about the past two weeks on average.</p>
              <div className="flex gap-4 justify-between mb-8">
                {moodOptions.map(opt => (
                  <button key={opt.val} onClick={() => setMood(opt.val)}
                    className={`flex-1 py-8 rounded-[32px] border-2 flex flex-col items-center gap-3 transition-all ${mood === opt.val ? 'bg-white/10 border-white/30 scale-105' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <span className="text-4xl">{opt.emoji}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${opt.color}`}>{opt.label}</span>
                  </button>
                ))}
              </div>
              <button disabled={!mood} onClick={() => setStep(2)}
                className="w-full py-5 bg-green-600 rounded-full text-xs font-black uppercase text-white tracking-widest disabled:opacity-30 shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all">
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Sleep */}
        {step === 2 && (
          <motion.div key="m2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest mb-6 transition-all"><ChevronLeft size={14} /> Back</button>
              <div className="flex items-center gap-3 mb-2"><Moon size={20} className="text-blue-400" /><h2 className="text-2xl font-bold font-syne italic text-white">How is your sleep?</h2></div>
              <p className="text-xs text-white/40 font-jakarta mb-8">Sleep has a direct impact on mental health and cognitive function.</p>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Average hours per night</p>
              <div className="flex gap-2 mb-8">
                {[4, 5, 6, 7, 8, 9].map(h => (
                  <button key={h} onClick={() => setSleepHours(h)}
                    className={`flex-1 py-5 rounded-2xl font-black text-lg border-2 transition-all ${sleepHours === h ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
                    {h}h
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Sleep Quality</p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {['Poor', 'Fair', 'Good'].map(q => (
                  <button key={q} onClick={() => setSleepQuality(q)}
                    className={`py-4 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all ${sleepQuality === q ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
                    {q}
                  </button>
                ))}
              </div>
              <button disabled={!sleepHours || !sleepQuality} onClick={() => setStep(3)}
                className="w-full py-5 bg-green-600 rounded-full text-xs font-black uppercase text-white tracking-widest disabled:opacity-30 shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all">
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Anxiety */}
        {step === 3 && (
          <motion.div key="m3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest mb-6 transition-all"><ChevronLeft size={14} /> Back</button>
              <h2 className="text-2xl font-bold font-syne italic text-white mb-2">How often have you felt anxious or on edge?</h2>
              <p className="text-xs text-white/40 font-jakarta mb-8">Over the past two weeks (based on GAD-7 scale).</p>
              <div className="space-y-3 mb-8">
                {[
                  { label: 'Not at all', desc: 'No notable anxiety episodes', color: 'text-green-400' },
                  { label: 'Several days', desc: '1–6 days of noticeable anxiety', color: 'text-yellow-400' },
                  { label: 'More than half the days', desc: '7+ days — worth monitoring', color: 'text-orange-400' },
                  { label: 'Nearly every day', desc: 'Persistent — clinical attention recommended', color: 'text-red-400' },
                ].map(opt => (
                  <button key={opt.label} onClick={() => setAnxietyLevel(opt.label)}
                    className={`w-full p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${anxietyLevel === opt.label ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <div>
                      <p className="font-black text-sm text-white">{opt.label}</p>
                      <p className="text-[10px] text-white/40 font-jakarta">{opt.desc}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase ${opt.color}`}>
                      {anxietyLevel === opt.label && '✓'}
                    </span>
                  </button>
                ))}
              </div>
              <button disabled={!anxietyLevel} onClick={() => setStep(4)}
                className="w-full py-5 bg-green-600 rounded-full text-xs font-black uppercase text-white tracking-widest disabled:opacity-30 hover:bg-green-700 transition-all">
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Energy & Focus */}
        {step === 4 && (
          <motion.div key="m4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <button onClick={() => setStep(3)} className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest mb-6 transition-all"><ChevronLeft size={14} /> Back</button>
              <div className="flex items-center gap-3 mb-2"><Zap size={20} className="text-yellow-400" /><h2 className="text-2xl font-bold font-syne italic text-white">Energy & concentration levels?</h2></div>
              <p className="text-xs text-white/40 font-jakarta mb-8">Select all that describe how you've been feeling lately.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['Persistent fatigue / low energy', 'Brain fog / poor concentration', 'Low motivation or drive', 'Irritability / mood swings', 'Feeling restless or keyed up', 'Difficulty making decisions', 'Feeling emotionally numb', 'Physical tension or headaches'].map(f => (
                  <button key={f} onClick={() => toggleEnergy(f)}
                    className={`p-4 rounded-2xl border-2 text-left text-xs font-bold flex items-center gap-3 transition-all ${energyFlags.includes(f) ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${energyFlags.includes(f) ? 'border-yellow-400 bg-yellow-400' : 'border-white/30'}`}>
                      {energyFlags.includes(f) && <Check size={8} strokeWidth={3} className="text-black" />}
                    </div>
                    {f}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(5)}
                className="w-full py-5 bg-green-600 rounded-full text-xs font-black uppercase text-white tracking-widest shadow-xl hover:bg-green-700 transition-all">
                Continue — {energyFlags.length} selected
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Lifestyle */}
        {step === 5 && (
          <motion.div key="m5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 shadow-2xl">
              <button onClick={() => setStep(4)} className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest mb-6 transition-all"><ChevronLeft size={14} /> Back</button>
              <div className="flex items-center gap-3 mb-2"><Coffee size={20} className="text-amber-400" /><h2 className="text-2xl font-bold font-syne italic text-white">Lifestyle snapshot</h2></div>
              <p className="text-xs text-white/40 font-jakarta mb-8">Quick lifestyle assessment to complete your wellness profile.</p>
              <div className="space-y-5 mb-8">
                {[
                  { key: 'exercise', label: 'How often do you exercise?', opts: ['Never', '1–2x/week', '3–4x/week', 'Daily'] },
                  { key: 'social', label: 'How connected do you feel socially?', opts: ['Isolated', 'Somewhat', 'Moderately', 'Very connected'] },
                  { key: 'diet', label: 'How would you rate your diet?', opts: ['Poor', 'Fair', 'Good', 'Excellent'] },
                ].map(q => (
                  <div key={q.key}>
                    <p className="text-sm font-bold text-white mb-3">{q.label}</p>
                    <div className="flex gap-2">
                      {q.opts.map(o => (
                        <button key={o} onClick={() => setLifestyleAnswers(prev => ({ ...prev, [q.key]: o }))}
                          className={`flex-1 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-wider transition-all ${lifestyleAnswers[q.key] === o ? 'bg-green-600 border-green-600 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleFinish}
                className="w-full py-5 bg-green-600 rounded-full text-xs font-black uppercase text-white tracking-widest shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all">
                Calculate My Wellness Score
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 6: Result */}
        {step === 6 && (
          <motion.div key="m6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            {evaluating ? (
              <div className="py-24 flex flex-col items-center gap-6">
                <Brain size={60} className="text-green-500 animate-pulse" />
                <p className="text-lg font-bold italic font-syne text-white/60 uppercase tracking-widest">Evaluating your wellness…</p>
              </div>
            ) : score !== null && (
              <div className="space-y-6">
                {/* Score card */}
                <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 text-center">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Your Wellness Score</p>
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <svg className="w-40 h-40" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke={score >= 65 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444'}
                        strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                        transform="rotate(-90 50 50)" />
                    </svg>
                    <div className="absolute">
                      <p className={`text-4xl font-black font-syne italic ${getScoreColor(score)}`}>{score}</p>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">/100</p>
                    </div>
                  </div>
                  <p className={`text-2xl font-black font-syne italic uppercase ${getScoreColor(score)}`}>{getScoreLabel(score)}</p>
                </div>

                {/* Recommendations */}
                <div className="bg-slate-900/60 p-8 rounded-[40px] border border-white/5">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-5">Personalized Recommendations</p>
                  <div className="space-y-3">
                    {[
                      score < 70 && { icon: Moon, text: 'Prioritize 7–9 hours of consistent, screen-free sleep.', color: 'text-blue-400 bg-blue-500/10' },
                      anxietyLevel !== 'Not at all' && { icon: Wind, text: 'Practice 4-7-8 breathing or guided meditation daily.', color: 'text-purple-400 bg-purple-500/10' },
                      energyFlags.length > 2 && { icon: Zap, text: 'Low energy detected — consider bloodwork for deficiencies.', color: 'text-yellow-400 bg-yellow-500/10' },
                      { icon: CheckCircle2, text: 'Schedule a routine mental health check with a counsellor.', color: 'text-green-400 bg-green-500/10' },
                    ].filter(Boolean).map((rec, i) => rec && (
                      <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border border-white/5 ${rec.color}`}>
                        <rec.icon size={18} className="shrink-0 mt-0.5" />
                        <p className="text-sm font-bold text-white">{rec.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={reset} className="flex items-center justify-center gap-2 w-full py-5 bg-white/5 border border-white/10 rounded-full text-xs font-black text-white/50 hover:text-white uppercase tracking-widest transition-all">
                  <RefreshCcw size={14} /> Start New Assessment
                </button>
              </div>
            )}
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
                <p className="text-xs text-white/40 group-hover:text-white/80 font-jakarta uppercase tracking-widest">5-step symptom & vitals analysis</p>
              </div>
            </button>
            <button onClick={() => setView('mental')} className="bg-slate-900/60 p-16 rounded-[64px] border border-white/5 flex flex-col items-center gap-8 hover:bg-[#e21b1b] group transition-all shadow-2xl">
              <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center text-[#e21b1b] group-hover:bg-white/20 group-hover:text-white transition-all"><Brain size={48} /></div>
              <div className="text-center">
                <h3 className="text-3xl font-black italic font-syne text-white mb-2 uppercase">Mental Check</h3>
                <p className="text-xs text-white/40 group-hover:text-white/80 font-jakarta uppercase tracking-widest">5-step mood & cognitive wellness triage</p>
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

// ─── TRAINING CARD with smooth YouTube hover preview ─────────────────────────
const TrainingCard = ({ video }) => {
  const [showPreview, setShowPreview] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    timerRef.current = setTimeout(() => setShowPreview(true), 450);
  };
  const handleLeave = () => {
    clearTimeout(timerRef.current);
    setShowPreview(false);
  };

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}
      className="bg-slate-900/60 border border-white/5 rounded-[48px] overflow-hidden group hover:bg-white/5 transition-all relative shadow-2xl">
      <div className="h-48 overflow-hidden relative">
        {showPreview ? (
          <iframe className="w-full h-full pointer-events-none scale-[1.15]"
            src={`https://www.youtube.com/embed/${video.ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.ytId}&modestbranding=1`}
            frameBorder="0" allow="autoplay" />
        ) : (
          <img src={video.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={video.title} />
        )}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          onClick={() => window.open(`https://www.youtube.com/watch?v=${video.ytId}`, '_blank')}>
          <PlayCircle size={56} className="text-white drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 bg-black/70 rounded-lg text-[10px] font-bold text-white">{video.duration}</span>
          {showPreview && <span className="px-3 py-1 bg-[#e21b1b]/90 rounded-lg text-[10px] font-black text-white uppercase tracking-widest animate-pulse">● Live Preview</span>}
        </div>
      </div>
      <div className="p-8 space-y-4">
        <span className="text-[10px] font-black text-[#e21b1b] uppercase tracking-widest">{video.category}</span>
        <h3 className="text-xl font-black italic font-syne text-white leading-tight">{video.title}</h3>
        <button onClick={() => window.open(`https://www.youtube.com/watch?v=${video.ytId}`, '_blank')}
          className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-[#e21b1b] hover:border-[#e21b1b] transition-all flex items-center justify-center gap-2 tracking-widest">
          Watch Full Workout <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

const ArticleCard = ({ tip }) => (
  <div className="bg-slate-900/60 border border-white/5 rounded-[48px] overflow-hidden group hover:bg-white/5 transition-all shadow-2xl flex flex-col">
    <div className="h-56 overflow-hidden relative shrink-0">
      <img src={tip.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={tip.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
    </div>
    <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
      <div>
        <span className="text-[10px] font-black text-[#e21b1b] uppercase tracking-widest">{tip.category}</span>
        <h3 className="text-xl font-black italic font-syne text-white leading-tight mt-2">{tip.title}</h3>
        <p className="text-xs text-white/50 leading-relaxed font-jakarta mt-3">{tip.excerpt}</p>
      </div>
      <button onClick={() => window.open(tip.url, '_blank')} className="text-xs font-black uppercase text-white hover:text-[#e21b1b] flex items-center gap-2 transition-all tracking-widest mt-6">
        Read Full Article <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

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
              {trainingVideos.map(video => <TrainingCard key={video.id} video={video} />)}
            </div>
          </motion.div>
        ) : (
          <motion.div key="articles" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="grid grid-cols-3 gap-8 pb-20">
              {healthTips.map(tip => <ArticleCard key={tip.id} tip={tip} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MONTH CALENDAR COMPONENT ──────────────────────────────────────────────────
const MonthCalendar = ({ selectedDate, onSelect }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const isToday = (d) => d && d.toDateString() === today.toDateString();
  const isSelected = (d) => d && selectedDate && d.toDateString() === selectedDate.toDateString();
  const isPast = (d) => d && d < today && !isToday(d);
  const isWeekend = (d) => d && (d.getDay() === 0 || d.getDay() === 6);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const canGoPrev = new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} disabled={!canGoPrev}
          className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all">
          <ChevronLeft size={18} />
        </button>
        <h3 className="text-base font-black italic font-syne text-white">{monthName} {year}</h3>
        <button onClick={nextMonth}
          className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-3">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-center text-[9px] font-black text-white/30 uppercase tracking-widest py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => (
          <button key={i} disabled={!date || isPast(date)}
            onClick={() => date && !isPast(date) && onSelect(date)}
            className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
              !date ? '' :
              isSelected(date) ? 'bg-[#e21b1b] text-white shadow-lg shadow-[#e21b1b]/30' :
              isToday(date) ? 'border-2 border-[#e21b1b]/70 text-[#e21b1b]' :
              isPast(date) ? 'text-white/15 cursor-not-allowed' :
              isWeekend(date) ? 'text-white/40 hover:bg-white/10' :
              'text-white/70 hover:bg-white/10'
            }`}>
            {date ? date.getDate() : ''}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── APPOINTMENTS (full rebuild) ───────────────────────────────────────────────
const timeSlotsByPeriod = {
  morning:   ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  afternoon: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
  evening:   ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'],
};
const busySlots = new Set(['09:00', '10:30', '13:30', '15:00', '17:00', '18:00']);

const bookedAppointments = [
  { doctor: medicalExperts[0], date: 'Tue, May 19', time: '10:00 AM', type: 'video', status: 'Confirmed', reason: 'Annual Heart Checkup' },
  { doctor: medicalExperts[2], date: 'Thu, May 21', time: '02:30 PM', type: 'physical', status: 'Confirmed', reason: 'Follow-up Consultation' },
  { doctor: medicalExperts[1], date: 'Mon, May 26', time: '11:00 AM', type: 'video', status: 'Pending', reason: 'Migraine Management' },
];

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [visitType, setVisitType] = useState('video');
  const [visitReason, setVisitReason] = useState('');
  const [visitNotes, setVisitNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [activePeriod, setActivePeriod] = useState('morning');

  const categories = [
    { id: 'card', name: 'Cardiology', icon: Heart, desc: 'Heart & circulatory health' },
    { id: 'neuro', name: 'Neurology', icon: Brain, desc: 'Brain & neurological care' },
    { id: 'gen', name: 'General Medicine', icon: Stethoscope, desc: 'Routine & primary care' },
    { id: 'peds', name: 'Pediatrics', icon: Baby, desc: 'Child & adolescent health' },
  ];

  const reasons = ['Annual Checkup / Screening', 'Follow-up Consultation', 'New Symptoms / Complaint', 'Prescription Renewal', 'Lab Result Review', 'Second Opinion', 'Chronic Condition Management', 'Preventive Care Advice'];

  const resetBooking = () => {
    setIsBookingOpen(false); setBookingStep(1); setSelectedCat(null); setSelectedDoctor(null);
    setSelectedDate(null); setSelectedTime(null); setVisitReason(''); setVisitNotes('');
    setIsProcessing(false); setIsConfirmed(false); setVisitType('video');
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => { setIsProcessing(false); setIsConfirmed(true); }, 2500);
  };

  const formatDate = (d) => d ? d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '—';

  const stepLabels = ['Specialty', 'Doctor', 'Date & Time', 'Details', 'Payment'];

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-12 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">Appointments Hub</span>
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Book a Doctor.</h1>
        </div>
        <button onClick={() => setIsBookingOpen(true)}
          className="px-8 py-4 bg-[#e21b1b] rounded-full text-xs font-black uppercase hover:bg-[#c01616] transition-all text-white shadow-xl shadow-[#e21b1b]/20 tracking-widest flex items-center gap-2">
          <Plus size={16} /> New Appointment
        </button>
      </div>

      {/* Main grid: calendar + upcoming */}
      <div className="grid grid-cols-12 gap-8 mb-10">
        {/* Calendar panel */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/5 p-8 rounded-[40px] shadow-2xl">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-6">Select Date to View</p>
            <MonthCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
            {selectedDate && (
              <div className="mt-6 p-4 bg-[#e21b1b]/10 border border-[#e21b1b]/20 rounded-2xl flex items-center gap-3">
                <Calendar size={16} className="text-[#e21b1b]" />
                <div>
                  <p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest">Selected</p>
                  <p className="text-sm font-bold text-white">{formatDate(selectedDate)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scheduled appointments */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/5 p-8 rounded-[40px] shadow-2xl h-full">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Upcoming Appointments</p>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{bookedAppointments.length} Scheduled</span>
              </div>
            </div>
            <div className="space-y-4">
              {bookedAppointments.map((appt, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-[28px] flex items-center gap-5 group hover:bg-white/8 transition-all">
                  <div className="relative shrink-0">
                    <img src={appt.doctor.img} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10" alt={appt.doctor.name} />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${appt.doctor.status === 'online' ? 'bg-green-500' : 'bg-slate-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-black italic font-syne text-white truncate">{appt.doctor.name}</h3>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${appt.status === 'Confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{appt.status}</span>
                    </div>
                    <p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest mb-1">{appt.doctor.specialty}</p>
                    <p className="text-[10px] text-white/40 font-jakarta">{appt.reason}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1.5 justify-end mb-1">
                      {appt.type === 'video' ? <Video size={12} className="text-blue-400" /> : <MapPin size={12} className="text-green-400" />}
                      <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{appt.type === 'video' ? 'Video' : 'In-Person'}</span>
                    </div>
                    <p className="text-xs font-bold text-white">{appt.time}</p>
                    <p className="text-[9px] text-white/40">{appt.date}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0 ml-2">
                    {appt.type === 'video' && <button className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-all shadow-lg"><Video size={14} /></button>}
                    <button className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"><ChevronRight size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Queue status */}
      <div className="bg-slate-900/60 border border-white/5 p-6 rounded-[32px] mb-6 flex items-center gap-6">
        <Loader2 size={18} className="text-blue-500 animate-spin shrink-0" />
        <div className="flex gap-10">
          {[{ label: 'Your Queue Position', val: '#04', color: 'text-[#e21b1b]' }, { label: 'Est. Wait Time', val: '12 min', color: 'text-white' }, { label: 'Active Doctors', val: '08', color: 'text-white' }].map(s => (
            <div key={s.label}>
              <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`text-2xl font-black italic font-syne ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-bold text-blue-400 font-jakarta ml-auto">Queue moving faster than usual · Stay near the clinic</p>
      </div>

      {/* ── BOOKING MODAL ── */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050911]/98 backdrop-blur-2xl z-[2000] flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 w-full max-w-5xl rounded-[56px] p-12 relative shadow-2xl overflow-y-auto max-h-[92vh]">
              <button onClick={resetBooking} className="absolute top-8 right-8 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"><X size={20} /></button>

              {/* Progress bar */}
              {!isProcessing && !isConfirmed && (
                <div className="flex gap-2 mb-10">
                  {stepLabels.map((label, i) => (
                    <div key={i} className="flex-1">
                      <div className={`h-1 rounded-full transition-all ${i < bookingStep ? 'bg-[#e21b1b]' : 'bg-white/10'}`} />
                      <p className={`text-[8px] font-black uppercase tracking-widest mt-2 text-center ${i < bookingStep ? 'text-[#e21b1b]' : 'text-white/20'}`}>{label}</p>
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 flex flex-col items-center gap-8">
                    <Loader2 size={72} className="text-[#e21b1b] animate-spin" />
                    <h2 className="text-4xl font-black italic font-syne text-white uppercase">Processing Secure Payment…</h2>
                    <p className="text-white/40 font-jakarta">Encrypting card details · Confirming slot · Notifying doctor</p>
                  </motion.div>
                ) : isConfirmed ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 space-y-8">
                    <CheckCircle2 size={90} className="text-green-500 mx-auto drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                    <div>
                      <h2 className="text-5xl font-black italic font-syne text-white uppercase tracking-tight mb-3">Confirmed!</h2>
                      <p className="text-white/50 font-jakarta">Your appointment is locked in. A confirmation has been sent to your email.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] max-w-sm mx-auto text-left space-y-3">
                      <div className="flex justify-between"><span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Doctor</span><span className="text-sm font-bold text-white">{selectedDoctor?.name}</span></div>
                      <div className="flex justify-between"><span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Date</span><span className="text-sm font-bold text-white">{formatDate(selectedDate)}</span></div>
                      <div className="flex justify-between"><span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Time</span><span className="text-sm font-bold text-white">{selectedTime}</span></div>
                      <div className="flex justify-between"><span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Type</span><span className="text-sm font-bold text-white capitalize">{visitType === 'video' ? 'Video Call' : 'In-Person'}</span></div>
                    </div>
                    <button onClick={resetBooking} className="px-12 py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white shadow-2xl shadow-[#e21b1b]/30 tracking-widest">Back to Dashboard</button>
                  </motion.div>
                ) : bookingStep === 1 ? (
                  <motion.div key="bs1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                    <div className="text-center">
                      <h2 className="text-4xl font-black italic font-syne text-white tracking-tight">What care do you need?</h2>
                      <p className="text-white/40 font-jakarta mt-2">Choose a medical specialty to find the right specialist.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {categories.map(cat => (
                        <button key={cat.id} onClick={() => { setSelectedCat(cat.name); setBookingStep(2); }}
                          className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex flex-col items-center gap-5 hover:bg-[#e21b1b] group transition-all">
                          <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/20 group-hover:text-white transition-all"><cat.icon size={32} /></div>
                          <div className="text-center">
                            <p className="text-sm font-black uppercase tracking-widest text-white mb-1">{cat.name}</p>
                            <p className="text-[10px] text-white/40 group-hover:text-white/70 font-jakarta">{cat.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : bookingStep === 2 ? (
                  <motion.div key="bs2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setBookingStep(1)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"><ChevronLeft size={20} /></button>
                      <div>
                        <h2 className="text-4xl font-black italic font-syne text-white tracking-tight">Choose your doctor</h2>
                        <p className="text-white/40 font-jakarta text-sm">Specialists in {selectedCat}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {medicalExperts.filter(d => d.specialty === selectedCat || !selectedCat).map(doc => (
                        <button key={doc.id} onClick={() => { setSelectedDoctor(doc); setBookingStep(3); }}
                          className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex gap-6 text-left group hover:bg-white/10 hover:border-white/20 transition-all">
                          <div className="relative shrink-0">
                            <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-white/10"><img src={doc.img} className="w-full h-full object-cover" alt={doc.name} /></div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${doc.status === 'online' ? 'bg-green-500' : 'bg-slate-500'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-lg font-bold font-syne italic text-white">{doc.name}</h3>
                              <div className="flex items-center gap-1 text-yellow-400"><Star size={12} fill="currentColor" /><span className="text-xs font-bold">{doc.rating}</span></div>
                            </div>
                            <p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest mb-2">{doc.clinic}</p>
                            <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-jakarta mb-3">{doc.bio}</p>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold">{doc.reviews} reviews</span>
                              <span className="text-lg font-black text-[#e21b1b] italic font-syne">${doc.price}</span>
                              <span className="text-[10px] text-white/30 font-jakarta">{doc.dist}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : bookingStep === 3 ? (
                  <motion.div key="bs3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setBookingStep(2)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"><ChevronLeft size={20} /></button>
                      <div>
                        <h2 className="text-3xl font-black italic font-syne text-white tracking-tight">Pick your date & time</h2>
                        <p className="text-white/40 font-jakarta text-sm">with {selectedDoctor?.name}</p>
                      </div>
                    </div>

                    {/* Visit type selector */}
                    <div className="flex gap-4">
                      {[{ id: 'video', icon: Video, label: 'Video Call' }, { id: 'physical', icon: MapPin, label: 'In-Person' }].map(t => (
                        <button key={t.id} onClick={() => setVisitType(t.id)}
                          className={`flex-1 py-4 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all ${visitType === t.id ? 'bg-[#e21b1b] border-[#e21b1b] text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
                          <t.icon size={16} /> {t.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                      {/* Calendar */}
                      <div className="col-span-5 bg-white/5 border border-white/10 rounded-[32px] p-6">
                        <MonthCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
                      </div>

                      {/* Time slots */}
                      <div className="col-span-7">
                        <div className="flex gap-2 mb-5">
                          {Object.keys(timeSlotsByPeriod).map(p => (
                            <button key={p} onClick={() => setActivePeriod(p)}
                              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activePeriod === p ? 'bg-[#e21b1b] text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                              {p}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlotsByPeriod[activePeriod].map(slot => {
                            const isBusy = busySlots.has(slot);
                            return (
                              <button key={slot} disabled={isBusy}
                                onClick={() => !isBusy && setSelectedTime(slot)}
                                className={`py-3 rounded-xl text-xs font-bold border-2 transition-all ${
                                  isBusy ? 'border-white/5 text-white/15 cursor-not-allowed bg-white/2' :
                                  selectedTime === slot ? 'bg-[#e21b1b] border-[#e21b1b] text-white shadow-lg' :
                                  'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                                }`}>
                                {isBusy ? <span className="text-[9px]">Booked</span> : slot}
                              </button>
                            );
                          })}
                        </div>
                        {selectedDate && selectedTime && (
                          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3">
                            <CheckCircle2 size={16} className="text-green-400" />
                            <p className="text-xs font-bold text-green-400">{formatDate(selectedDate)} at {selectedTime}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <button disabled={!selectedDate || !selectedTime} onClick={() => setBookingStep(4)}
                      className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white tracking-widest disabled:opacity-30 shadow-xl shadow-[#e21b1b]/20 transition-all hover:bg-[#c01616]">
                      Continue to Visit Details
                    </button>
                  </motion.div>
                ) : bookingStep === 4 ? (
                  <motion.div key="bs4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setBookingStep(3)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"><ChevronLeft size={20} /></button>
                      <h2 className="text-3xl font-black italic font-syne text-white tracking-tight">Tell us about your visit</h2>
                    </div>

                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Reason for Visit</p>
                      <div className="grid grid-cols-2 gap-3">
                        {reasons.map(r => (
                          <button key={r} onClick={() => setVisitReason(r)}
                            className={`py-3 px-5 rounded-2xl border-2 text-xs font-bold text-left transition-all ${visitReason === r ? 'bg-[#e21b1b] border-[#e21b1b] text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'}`}>
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Additional Notes for Doctor <span className="text-white/20">(Optional)</span></p>
                      <textarea value={visitNotes} onChange={e => setVisitNotes(e.target.value)}
                        placeholder="Describe your symptoms in detail, current medications, allergies, or anything the doctor should know before the session…"
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#e21b1b] transition-all resize-none font-jakarta" />
                    </div>

                    <button disabled={!visitReason} onClick={() => setBookingStep(5)}
                      className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white tracking-widest disabled:opacity-30 shadow-xl shadow-[#e21b1b]/20 transition-all hover:bg-[#c01616]">
                      Proceed to Payment
                    </button>
                  </motion.div>
                ) : bookingStep === 5 ? (
                  <motion.div key="bs5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setBookingStep(4)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"><ChevronLeft size={20} /></button>
                      <h2 className="text-3xl font-black italic font-syne text-white tracking-tight">Review & Confirm</h2>
                    </div>

                    {/* Booking summary */}
                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-4">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-5">Appointment Summary</p>
                      {[
                        { label: 'Doctor', value: selectedDoctor?.name },
                        { label: 'Specialty', value: selectedDoctor?.specialty },
                        { label: 'Date', value: formatDate(selectedDate) },
                        { label: 'Time', value: selectedTime },
                        { label: 'Visit Type', value: visitType === 'video' ? 'Video Call' : 'In-Person' },
                        { label: 'Reason', value: visitReason },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5">
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{item.label}</span>
                          <span className="text-sm font-bold text-white">{item.value || '—'}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Consultation Fee</span>
                        <span className="text-2xl font-black italic font-syne text-[#e21b1b]">${selectedDoctor?.price}.00</span>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Payment Method</p>
                      <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4"><CreditCard className="text-[#e21b1b]" size={20} /><span className="text-sm font-bold text-white">Visa ending in 4242</span></div>
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest cursor-pointer hover:underline">Change</span>
                      </div>
                    </div>

                    <button onClick={handlePay}
                      className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white shadow-2xl shadow-[#e21b1b]/30 tracking-widest hover:bg-[#c01616] transition-all">
                      Pay ${selectedDoctor?.price}.00 & Confirm
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MEDICAL RECORDS ─────────────────────────────────────────────────────────
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
            <button onClick={() => downloadMedicalFile('Report', file, data.name)} className="w-full py-3 bg-[#e21b1b] rounded-2xl text-[9px] font-black uppercase text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 mt-4 tracking-widest">Download PDF</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── HOME VISIT VIEW (with live ETA countdown) ─────────────────────────────────
const HomeVisitView = () => {
  const [view, setView] = useState('neighborhood');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [position, setPosition] = useState({ x: 5, y: 5 });
  const [isArrived, setIsArrived] = useState(false);
  const [etaSeconds, setEtaSeconds] = useState(0);

  // Start position animation + ETA countdown on tracking
  useEffect(() => {
    if (view === 'tracking' && selectedDoc) {
      const distKm = parseFloat(selectedDoc.dist);
      const initialETA = Math.round(distKm * 3.5 * 60); // ~3.5 min/km
      setEtaSeconds(initialETA);
      setIsArrived(false);
      setPosition({ x: 5, y: 5 });
    }
  }, [view, selectedDoc]);

  // Live ETA countdown
  useEffect(() => {
    if (view !== 'tracking' || isArrived) return;
    const timer = setInterval(() => {
      setEtaSeconds(prev => {
        if (prev <= 1) { setIsArrived(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [view, isArrived]);

  // Position animation toward destination
  useEffect(() => {
    if (view !== 'tracking' || isArrived) return;
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev.x >= 78 && prev.y >= 78) { setIsArrived(true); return prev; }
        return { x: Math.min(prev.x + 0.4, 78), y: Math.min(prev.y + 0.4, 78) };
      });
    }, 120);
    return () => clearInterval(interval);
  }, [view, isArrived]);

  const formatETA = (s) => {
    if (isArrived || s <= 0) return 'Arrived';
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${String(sec).padStart(2, '0')}s`;
  };

  const etaProgress = selectedDoc ? Math.max(0, 1 - etaSeconds / (parseFloat(selectedDoc.dist) * 3.5 * 60)) : 0;

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-12 space-y-12 h-full">
      <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">Home Visit Utility</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Smart Visit.</h1></div>

      <AnimatePresence mode="wait">
        {view === 'neighborhood' && (
          <motion.div key="neigh" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="grid grid-cols-12 gap-8 h-full">
            <div className="col-span-12 lg:col-span-4 space-y-4 overflow-y-auto max-h-[700px] pr-4">
              <h3 className="text-xl font-black italic font-syne text-white uppercase mb-4">Doctors Nearby</h3>
              {medicalExperts.map(doc => (
                <button key={doc.id} onClick={() => { setSelectedDoc(doc); setView('profile'); }}
                  className="w-full bg-slate-900/60 p-5 rounded-[28px] border border-white/5 flex items-center gap-5 hover:bg-[#e21b1b] group transition-all text-left">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0"><img src={doc.img} className="w-full h-full object-cover" alt={doc.name} /></div>
                  <div>
                    <h4 className="text-base font-bold font-syne italic text-white leading-none mb-1">{doc.name}</h4>
                    <p className="text-[9px] font-black text-white/40 group-hover:text-white/80 uppercase tracking-widest mb-1.5">{doc.specialty}</p>
                    <div className="flex items-center gap-2 text-white/30 group-hover:text-white/60">
                      <Locate size={10} /><span className="text-[9px] font-bold">{doc.dist} away</span>
                      <span className="text-white/20">·</span>
                      <span className="text-[9px] font-bold">${doc.price}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="col-span-12 lg:col-span-8 rounded-[48px] border border-white/10 relative overflow-hidden h-[600px] shadow-2xl">
              <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=72.8100,19.0400,72.8700,19.0800&layer=mapnik"
                title="Live Map" className="absolute inset-0 w-full h-full" style={{ border: 'none' }} />
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#050911]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Doctor Locations · Mumbai</span>
                </div>
              </div>
              <div className="absolute inset-0 z-10 pointer-events-none">
                {medicalExperts.map((doc, i) => (
                  <motion.div key={doc.id} className="absolute flex flex-col items-center"
                    style={{ left: `${15 + i * 20}%`, top: `${20 + (i % 2) * 28}%` }}
                    animate={{ y: [-4, 4, -4] }} transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-[3px] border-white/80 shadow-2xl">
                      <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="mt-1.5 px-2 py-0.5 bg-[#050911]/95 border border-white/10 rounded-lg shadow-xl">
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">{doc.dist}</span>
                    </div>
                    <div className="w-px h-3 bg-white/30" />
                  </motion.div>
                ))}
              </div>
              <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                <div className="px-4 py-2.5 bg-[#050911]/90 border border-white/10 rounded-2xl">
                  <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Click a doctor card to book a home visit</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'profile' && (
          <motion.div key="prof" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-4xl mx-auto">
            <button onClick={() => setView('neighborhood')} className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase text-white/40 hover:text-white tracking-widest"><ChevronLeft size={14} /> Back to Map</button>
            <div className="bg-slate-900/60 p-12 rounded-[64px] border border-white/5 flex gap-12 items-center shadow-2xl">
              <div className="w-52 h-52 rounded-[40px] overflow-hidden border-4 border-white/5 shadow-2xl shrink-0"><img src={selectedDoc?.img} className="w-full h-full object-cover" alt={selectedDoc?.name} /></div>
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-black text-[#e21b1b] uppercase tracking-widest">{selectedDoc?.specialty}</span>
                  <h2 className="text-4xl font-black italic font-syne text-white uppercase mt-1">{selectedDoc?.name}</h2>
                </div>
                <p className="text-base text-white/50 leading-relaxed font-jakarta italic">"{selectedDoc?.bio}"</p>
                <div className="flex gap-8 border-y border-white/5 py-5">
                  {[{ label: 'Rating', val: `${selectedDoc?.rating} / 5.0` }, { label: 'Fee', val: `$${selectedDoc?.price}` }, { label: 'Distance', val: selectedDoc?.dist }].map(s => (
                    <div key={s.label}><p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">{s.label}</p><p className="text-lg font-bold font-syne italic text-white">{s.val}</p></div>
                  ))}
                </div>
                <button onClick={() => setView('tracking')} className="w-full py-5 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white shadow-2xl shadow-[#e21b1b]/30 tracking-widest hover:bg-[#c01616] transition-all">
                  Confirm & Request Home Visit
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'tracking' && (
          <motion.div key="track" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-12 gap-8 relative">
            {/* Map */}
            <div className="col-span-12 lg:col-span-8 rounded-[48px] border border-white/10 h-[600px] relative overflow-hidden shadow-2xl">
              <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=72.8200,19.0450,72.8600,19.0750&layer=mapnik"
                title="Tracking Map" className="absolute inset-0 w-full h-full" style={{ border: 'none' }} />
              <motion.div className="absolute z-20 flex flex-col items-center"
                animate={{ left: `${position.x}%`, top: `${position.y}%` }} transition={{ duration: 0.12, ease: "linear" }}>
                <div className="bg-[#e21b1b] p-3 rounded-2xl shadow-[0_0_30px_rgba(226,27,27,0.8)] border-2 border-white/20">
                  <Truck size={24} className="text-white" />
                </div>
                <div className="mt-1.5 px-3 py-1 bg-[#050911]/95 border border-white/10 rounded-xl">
                  <p className="text-[8px] font-black text-white uppercase tracking-widest">{selectedDoc?.name}</p>
                </div>
              </motion.div>
              <div className="absolute left-[78%] top-[78%] z-10 flex flex-col items-center">
                <div className="bg-blue-600 p-3 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.7)] border-2 border-white/20"><Home size={22} className="text-white" /></div>
                <div className="mt-1.5 px-3 py-1 bg-[#050911]/95 border border-white/10 rounded-xl"><p className="text-[8px] font-black text-white uppercase tracking-widest">Your Home</p></div>
              </div>
              {/* ETA overlay card */}
              <div className="absolute top-4 left-4 p-6 bg-[#050911]/95 backdrop-blur-3xl border border-white/10 rounded-[28px] z-30 shadow-2xl min-w-[240px]">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${isArrived ? 'bg-green-500' : 'bg-[#e21b1b] animate-ping'}`} />
                  <p className="text-[10px] font-black text-[#e21b1b] uppercase tracking-widest">{isArrived ? 'Arrived' : 'Active Dispatch'}</p>
                </div>
                <h3 className={`text-3xl font-black italic font-syne mb-1 ${isArrived ? 'text-green-400' : 'text-white'}`}>{formatETA(etaSeconds)}</h3>
                <p className="text-[10px] text-white/40 font-jakarta">ETA remaining</p>
                {/* Progress bar */}
                <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e21b1b] rounded-full transition-all duration-1000" style={{ width: `${etaProgress * 100}%` }} />
                </div>
              </div>

              <AnimatePresence>
                {isArrived && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[2000] flex items-center justify-center bg-[#050911]/95 backdrop-blur-3xl p-8">
                    <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="w-full max-w-lg text-center">
                      <div className="flex justify-center mb-6"><div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.5)]"><Check size={40} className="text-white" strokeWidth={3} /></div></div>
                      <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.3em] mb-3">Visit Status · Confirmed</p>
                      <h2 className="text-5xl font-black italic font-syne text-white uppercase tracking-tighter mb-3">Doctor Arrived</h2>
                      <p className="text-sm text-white/50 font-jakarta leading-relaxed mb-8">Your specialist is at the door. Please proceed to the main entrance.</p>
                      <div className="bg-white/5 border border-white/10 rounded-[24px] p-5 flex items-center gap-4 mb-6">
                        <img src={selectedDoc?.img} className="w-12 h-12 rounded-xl object-cover border-2 border-green-500/40" alt={selectedDoc?.name} />
                        <div className="text-left">
                          <h4 className="font-black italic font-syne text-white">{selectedDoc?.name}</h4>
                          <p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest">{selectedDoc?.specialty}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /><span className="text-[9px] font-black text-green-400 uppercase">On-site</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {[{ label: 'Arrived At', val: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, { label: 'Distance', val: '0.0 km' }, { label: 'Session', val: '45 min' }].map(s => (
                          <div key={s.label} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center">
                            <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className="text-sm font-black italic font-syne text-white">{s.val}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => { setView('neighborhood'); setIsArrived(false); setPosition({ x: 5, y: 5 }); setEtaSeconds(0); }}
                        className="w-full py-5 bg-white text-[#050911] rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-100 transition-all">
                        Acknowledge & Begin Session
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <SimpleCard title="Assigned Specialist" icon={ShieldCheck}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-xl"><img src={selectedDoc?.img} className="w-full h-full object-cover" alt={selectedDoc?.name} /></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-syne italic text-white leading-none mb-1">{selectedDoc?.name}</h3>
                    <p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest mb-0.5">{selectedDoc?.specialty}</p>
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{selectedDoc?.clinic}</p>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer mb-3">
                  <div className="flex items-center gap-3"><Phone size={14} className="text-white/40" /><span className="text-xs font-bold text-white">+1 234 567 890</span></div>
                  <button className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20"><Send size={14} /></button>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" className="text-yellow-400" />)}
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">{selectedDoc?.rating} · {selectedDoc?.reviews} reviews</span>
                </div>
              </SimpleCard>

              {/* Visit Details with live ETA */}
              <div className="bg-slate-900/60 border border-white/5 rounded-[32px] p-6 space-y-3">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Visit Details</p>
                {[
                  { icon: Clock, label: 'ETA', val: <span className={`text-xs font-black italic font-syne ${isArrived ? 'text-green-400' : 'text-white'}`}>{formatETA(etaSeconds)}</span> },
                  { icon: MapPin, label: 'Distance', val: <span className="text-xs font-black italic font-syne text-white">{selectedDoc?.dist}</span> },
                  { icon: Activity, label: 'Session', val: <span className="text-xs font-black italic font-syne text-white">45 min</span> },
                  { icon: DollarSign, label: 'Fee', val: <span className="text-xs font-black italic font-syne text-[#e21b1b]">${selectedDoc?.price}</span> },
                  { icon: ShieldCheck, label: 'Status', val: (
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isArrived ? 'bg-green-500' : 'bg-yellow-400 animate-pulse'}`} />
                      <span className={`text-[9px] font-black uppercase tracking-widest ${isArrived ? 'text-green-400' : 'text-yellow-400'}`}>{isArrived ? 'On-site' : 'En Route'}</span>
                    </div>
                  )},
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl">
                    <div className="flex items-center gap-3"><row.icon size={13} className="text-white/30" /><span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{row.label}</span></div>
                    {row.val}
                  </div>
                ))}
              </div>

              {/* ETA countdown progress */}
              {!isArrived && (
                <div className="bg-slate-900/60 border border-white/5 rounded-[24px] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Doctor Progress</p>
                    <span className="text-[10px] font-black text-[#e21b1b]">{Math.round(etaProgress * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#e21b1b] rounded-full transition-all duration-1000" style={{ width: `${etaProgress * 100}%` }} />
                  </div>
                  <p className="text-[9px] text-white/30 font-jakarta mt-2">Specialist navigating to your location in real-time</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── OTHER VIEWS ──────────────────────────────────────────────────────────────
const FamilySync = ({ onSwitch }) => (
  <div className="max-w-[1400px] mx-auto py-12 px-12 space-y-12">
    <div className="flex flex-col gap-4"><span className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b]">Manage Profiles</span><h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter font-syne text-white leading-none">Family Members.</h1></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {Object.keys(profilesData).map((id) => (
        <div key={id} className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 flex flex-col items-center text-center group shadow-2xl">
          <div className="w-28 h-28 rounded-[36px] overflow-hidden border-4 border-white/10 mb-6 group-hover:border-[#e21b1b] transition-all shadow-xl"><img src={profilesData[id].img} className="w-full h-full object-cover" alt={profilesData[id].name} /></div>
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
    <div className="bg-slate-900/60 p-10 rounded-[48px] border border-white/5 max-w-xl shadow-2xl">
      <h3 className="text-2xl font-black italic font-syne text-white mb-8 leading-none">Profile Information</h3>
      <div className="space-y-4 mb-8">
        <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Full Name</label>
        <input defaultValue="Alex Johnson" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#e21b1b] transition-all font-medium text-white" />
      </div>
      <button className="w-full py-4 bg-[#e21b1b] rounded-full text-[10px] font-black uppercase text-white tracking-widest">Save Changes</button>
    </div>
  </div>
);

// ─── PATIENT DASHBOARD ─────────────────────────────────────────────────────────
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
            <AreaChart data={data.history}>
              <Area type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.1} fill="#3b82f6" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleCard>

      <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-6">
        <SimpleCard className="row-span-1" title="Heart Rate"><div className="flex items-center justify-between"><div className="flex flex-col gap-1"><span className="text-5xl font-bold italic font-syne">{data.stats.heartRate}</span><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">BPM</span></div><Heart className="text-[#e21b1b] animate-pulse" size={40} /></div></SimpleCard>
        <SimpleCard className="row-span-1" title="Blood Oxygen"><div className="flex items-center justify-between"><div className="flex flex-col gap-1"><span className="text-5xl font-bold italic font-syne">{data.stats.oxygen}%</span><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Normal</span></div><Activity className="text-blue-500" size={40} /></div></SimpleCard>
        <SimpleCard className="row-span-1" title="Mental Health Status"><div className="flex items-center justify-between"><div className="flex flex-col gap-1"><span className="text-3xl font-bold italic font-syne uppercase">{data.stats.mental}</span><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Daily Mood</span></div><Smile className="text-green-500" size={40} /></div></SimpleCard>
      </div>

      <div className="col-span-12 mb-2"><QuoteMarquee /></div>

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
        <p className="text-xs text-white/60 mb-6 leading-relaxed font-jakarta">Tell us your symptoms and we'll match you with the right specialist in 5 quick steps.</p>
        <button onClick={() => navigate('/dashboard/diagnostics')} className="w-full py-4 bg-[#e21b1b] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c01616] transition-all text-white shadow-lg shadow-[#e21b1b]/20">Start Health Check</button>
      </SimpleCard>

      <SimpleCard className="col-span-12 lg:col-span-4 row-span-3" title="Daily Health Tips">
        <div className="space-y-4">
          {healthTips.slice(0, 4).map((tip, i) => (
            <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-all" onClick={() => window.open(tip.url, '_blank')}>
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0"><img src={tip.img} className="w-full h-full object-cover" alt={tip.title} /></div>
              <div><p className="text-[9px] font-black text-[#e21b1b] uppercase tracking-widest mb-1">{tip.category}</p><p className="text-xs font-bold font-syne italic text-white leading-tight">{tip.title}</p></div>
            </div>
          ))}
        </div>
      </SimpleCard>
    </div>
  );
};

// ─── MAIN LAYOUT ──────────────────────────────────────────────────────────────
const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [sosStep, setSosStep] = useState(1);
  const [currentProfile, setCurrentProfile] = useState('01');

  const handleSwitchProfile = (id) => { setCurrentProfile(id); setIsProfileOpen(false); navigate('/dashboard'); };
  const triggerSOS = () => { setIsSOSOpen(true); setSosStep(1); };

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
            <button key={item.id} onClick={() => { navigate(item.path); setIsProfileOpen(false); setIsNotifyOpen(false); }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all relative group ${isActive ? 'bg-[#e21b1b] text-white shadow-[0_0_20px_rgba(226,27,27,0.4)] scale-105' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
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
            {/* Smaller SOS button */}
            <button onClick={triggerSOS}
              className="px-5 py-2 bg-[#e21b1b] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#c01616] transition-all shadow-lg shadow-[#e21b1b]/20 animate-pulse">
              <ShieldAlert size={13} /> SOS
            </button>
            <div className="relative">
              <button onClick={() => { setIsNotifyOpen(!isNotifyOpen); setIsProfileOpen(false); }}
                className={`w-10 h-10 rounded-xl bg-white/5 border flex items-center justify-center transition-all relative ${isNotifyOpen ? 'border-[#e21b1b] text-white' : 'border-white/10 text-white/30 hover:text-white'}`}>
                <Bell size={18} /><span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#e21b1b] rounded-full" />
              </button>
              <AnimatePresence>{isNotifyOpen && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                  className="absolute right-0 mt-4 w-72 bg-slate-900 border border-white/10 rounded-[28px] p-6 shadow-2xl z-[200]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b] mb-4">Recent Alerts</p>
                  <div className="flex gap-4 p-3 bg-white/5 rounded-2xl"><div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 shrink-0"><CheckCircle2 size={13} /></div><p className="text-xs text-white/60 leading-relaxed">Your heart rate history was updated successfully.</p></div>
                </motion.div>
              )}</AnimatePresence>
            </div>
            <div className="relative">
              <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifyOpen(false); }}
                className={`flex items-center gap-3 pl-6 border-l border-white/10 transition-all ${isProfileOpen ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}>
                <div className="text-right hidden sm:block"><p className="text-xs font-bold font-syne italic text-white leading-none mb-1">{data.name}</p><p className="text-[8px] font-black text-[#e21b1b] uppercase tracking-widest">{data.role}</p></div>
                <div className="w-10 h-10 rounded-xl bg-white/10 overflow-hidden border border-white/10"><img src={data.img} className="w-full h-full object-cover" alt={data.name} /></div>
              </button>
              <AnimatePresence>{isProfileOpen && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                  className="absolute right-0 mt-4 w-72 bg-slate-900 border border-white/10 rounded-[32px] p-6 shadow-2xl z-[200]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#e21b1b] mb-5">Family Profiles</p>
                  <div className="space-y-3">
                    {Object.keys(profilesData).map(pid => (
                      <button key={pid} onClick={() => handleSwitchProfile(pid)}
                        className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left ${pid === currentProfile ? 'bg-[#e21b1b]/10 border border-[#e21b1b]/20' : 'hover:bg-white/5 border border-transparent'}`}>
                        <img src={profilesData[pid].img} className="w-8 h-8 rounded-lg object-cover" alt={profilesData[pid].name} />
                        <p className="text-xs font-bold font-syne italic text-white">{profilesData[pid].name}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}</AnimatePresence>
            </div>
          </div>
        </header>

        {/* ── SMALLER Emergency SOS Modal ── */}
        <AnimatePresence>
          {isSOSOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#050911]/98 backdrop-blur-3xl z-[3000] flex items-center justify-center p-6">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-slate-900 border-2 border-[#e21b1b] w-full max-w-lg rounded-[48px] p-10 relative shadow-[0_0_60px_rgba(226,27,27,0.25)] text-center overflow-hidden">
                <button onClick={() => setIsSOSOpen(false)} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"><X size={18} /></button>

                <AnimatePresence mode="wait">
                  {sosStep === 1 ? (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-7">
                      <Siren size={52} className="text-[#e21b1b] mx-auto animate-bounce" />
                      <h2 className="text-4xl font-black italic font-syne text-white uppercase tracking-tighter">Emergency Mode</h2>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { icon: MapIcon, label: 'Nearest Hospital' },
                          { icon: Navigation, label: 'Alert Family' },
                          { icon: Home, label: 'Request Home Visit' },
                        ].map(opt => (
                          <button key={opt.label} onClick={() => setSosStep(2)}
                            className="bg-white/5 border border-white/10 p-5 rounded-[28px] hover:bg-[#e21b1b] transition-all group flex items-center gap-4">
                            <opt.icon size={22} className="text-[#e21b1b] group-hover:text-white transition-colors" />
                            <span className="text-xs font-black uppercase tracking-widest text-white">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="s2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-7 py-6">
                      <CheckCircle2 size={72} className="text-green-500 mx-auto drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                      <h2 className="text-3xl font-black italic font-syne text-white uppercase tracking-tight">Protocols Initiated</h2>
                      <div className="space-y-3 max-w-xs mx-auto">
                        {['Emergency services dispatched', 'Family contacts alerted'].map(msg => (
                          <div key={msg} className="p-3 bg-white/5 rounded-2xl flex items-center gap-3 text-left border border-white/5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping shrink-0" />
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{msg}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setIsSOSOpen(false)} className="px-10 py-4 bg-[#e21b1b] rounded-full text-xs font-black uppercase text-white shadow-xl shadow-[#e21b1b]/30 tracking-widest hover:bg-[#c01616] transition-all">
                        Acknowledge
                      </button>
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