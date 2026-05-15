import React from 'react';
import { BookOpen, TrendingUp, Heart, Brain, Zap, ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Managing Cardiac Health in Peak Summer',
    tag: 'Cardiology',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80',
    icon: Heart
  },
  {
    id: 2,
    title: 'The Future of AI in Neurosurgery',
    tag: 'Technology',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&q=80',
    icon: Brain
  },
  {
    id: 3,
    title: 'Nutrition Hacks for Post-Viral Recovery',
    tag: 'Wellness',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80',
    icon: Zap
  }
];

const Articles = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Health Intelligence</h2>
          <p className="text-slate-400 font-medium mt-1">Curated medical articles and wellness tips</p>
        </div>
        <div className="flex gap-4">
          {['All', 'Cardio', 'Neuro', 'Wellness'].map((filter) => (
            <button key={filter} className="px-5 py-2 rounded-full bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-all">
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white/80 backdrop-blur-md border border-white rounded-[40px] overflow-hidden card-shadow group cursor-pointer">
            <div className="h-56 relative overflow-hidden">
              <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black text-blue-600 uppercase tracking-widest">
                {article.tag}
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <BookOpen size={14} />
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-snug mb-6 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-blue-600">
                  <article.icon size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Medical Insight</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[48px] p-12 text-white flex items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[100px] opacity-20" />
        <div className="relative z-10 max-w-xl">
          <h3 className="text-3xl font-black mb-4">Daily Health Newsletter</h3>
          <p className="text-slate-400 mb-8">Get the latest clinical insights and preventative health tips delivered directly to your portal.</p>
          <div className="flex gap-4">
            <input type="email" placeholder="Enter your email" className="bg-white/10 border border-white/10 rounded-2xl px-6 py-4 flex-1 focus:outline-none focus:border-blue-500 transition-all" />
            <button className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all">Subscribe</button>
          </div>
        </div>
        <div className="hidden lg:block relative z-10">
          <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
            <TrendingUp size={64} className="text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
