import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertTriangle, Clock, Calendar, CheckCircle2, RefreshCcw, Stethoscope, Search, User, Activity } from 'lucide-react';

const TriageModule = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState('');
  const [answers, setAnswers] = useState({});
  const [urgency, setUrgency] = useState(null);
  const [showSpecialists, setShowSpecialists] = useState(false);

  const steps = [
    { id: 1, title: 'Intake' },
    { id: 2, title: 'Assessment' },
    { id: 3, title: 'Results' }
  ];

  const questions = [
    { id: 'fever', text: 'Have you experienced a fever in the last 24 hours?', options: ['Yes', 'No'] },
    { id: 'pain', text: 'Rate your current pain intensity (1-10)', options: ['1-3 (Mild)', '4-7 (Moderate)', '8-10 (Severe)'] },
    { id: 'duration', text: 'How long have these symptoms persisted?', options: ['< 6 Hours', '6-24 Hours', '> 24 Hours'] }
  ];

  const specialists = [
    { name: 'Dr. Sarah Chen', spec: 'Cardiologist', status: 'Available', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=100&q=80' },
    { name: 'Dr. Marcus Thorne', spec: 'Neurologist', status: 'Busy', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80' },
    { name: 'Dr. Elena Rossi', spec: 'Internal Medicine', status: 'Available', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&w=100&q=80' }
  ];

  const calculateUrgency = () => {
    if (answers.pain === '8-10 (Severe)') return 'CRITICAL';
    if (answers.fever === 'Yes' || answers.pain === '4-7 (Moderate)') return 'URGENT';
    return 'ROUTINE';
  };

  const handleNext = () => {
    if (step === 1 && symptoms.length > 5) {
      setStep(2);
    } else if (step === 2 && Object.keys(answers).length === questions.length) {
      setUrgency(calculateUrgency());
      setStep(3);
    }
  };

  const reset = () => {
    setStep(1);
    setSymptoms('');
    setAnswers({});
    setUrgency(null);
    setShowSpecialists(false);
  };

  return (
    <div className="max-w-4xl mx-auto pt-10">
      <div className="mb-16 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Smart Triage Engine</h2>
          <p className="text-slate-400 font-medium mt-1">Diagnosis-Led Specialist Matching</p>
        </div>
        {!showSpecialists && (
          <div className="flex gap-4">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${
                  step >= s.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-slate-100 text-slate-300'
                }`}>
                  {s.id}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s.id ? 'text-slate-900' : 'text-slate-300'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <motion.div layout className="premium-card p-12 relative overflow-hidden bg-white shadow-2xl shadow-slate-200">
        <AnimatePresence mode="wait">
          {!showSpecialists ? (
            <>
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="flex items-center gap-4 text-blue-600 mb-2">
                    <Stethoscope size={24} />
                    <h3 className="text-lg font-bold">What symptoms are you experiencing?</h3>
                  </div>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="E.g. I have a sharp pain in my chest that started 10 minutes ago..."
                    className="w-full h-48 bg-slate-50 border border-slate-100 rounded-3xl p-8 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 transition-all resize-none font-medium"
                  />
                  <button
                    disabled={symptoms.length < 5}
                    onClick={handleNext}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-5 rounded-2xl font-bold text-white shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-3"
                  >
                    Analyze Symptoms <Send size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  {questions.map((q) => (
                    <div key={q.id}>
                      <p className="text-sm font-bold text-slate-800 mb-5">{q.text}</p>
                      <div className="flex gap-4">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                            className={`flex-1 py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                              answers[q.id] === opt 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                                : 'bg-white border-slate-50 text-slate-400 hover:border-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    disabled={Object.keys(answers).length < questions.length}
                    onClick={handleNext}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl font-bold text-white shadow-lg shadow-blue-100"
                  >
                    Calculate Urgency
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10 py-8">
                  <div className="flex justify-center">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                      urgency === 'CRITICAL' ? 'bg-red-50 text-red-500' : 
                      urgency === 'URGENT' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'
                    }`}>
                      {urgency === 'CRITICAL' ? <AlertTriangle size={48} /> : 
                       urgency === 'URGENT' ? <Clock size={48} /> : <CheckCircle2 size={48} />}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Diagnosis Result</p>
                    <h3 className={`text-6xl font-black tracking-tight ${
                      urgency === 'CRITICAL' ? 'text-red-500' : 
                      urgency === 'URGENT' ? 'text-orange-500' : 'text-green-500'
                    }`}>{urgency}</h3>
                    <p className="text-slate-500 mt-4 max-w-md mx-auto">Based on your symptoms, we have identified relevant specialists for your condition.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                    {urgency === 'CRITICAL' ? (
                      <button 
                        onClick={() => onNavigate('home')} 
                        className="bg-red-600 py-5 rounded-2xl font-bold text-white shadow-xl shadow-red-100 uppercase tracking-widest text-xs"
                      >
                        Activate Emergency Protocol
                      </button>
                    ) : (
                      <button 
                        onClick={() => setShowSpecialists(true)}
                        className="bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                      >
                        See Matched Specialists
                      </button>
                    )}
                    <button onClick={reset} className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-all mt-4">
                      <RefreshCcw size={14} /> Restart Triage
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div key="specialists" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <Search className="text-blue-600" size={24} />
                  Recommended Specialists
                </h3>
                <button onClick={() => setShowSpecialists(false)} className="text-[10px] font-black text-slate-400 uppercase hover:text-slate-900 transition-colors">Back to Verdict</button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {specialists.map((doc, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-[32px] flex items-center justify-between hover:bg-white hover:border-blue-100 transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img src={doc.img} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover" />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-slate-50 ${doc.status === 'Available' ? 'bg-green-500' : 'bg-orange-500'}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{doc.name}</h4>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{doc.spec}</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest flex items-center gap-1">
                          <Activity size={10} /> Status: {doc.status}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onNavigate('appointments')}
                      className="bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm"
                    >
                      Book Session
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] pt-4">Matching logic based on Smart Symptom Analysis</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TriageModule;
