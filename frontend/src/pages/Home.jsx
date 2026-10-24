import React from 'react';
import { 
  Sprout, 
  Scan, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { translations } from '../i18n';

export default function Home({ setCurrentTab, lang }) {
  const t = translations[lang].home;

  return (
    <div 
      className="relative min-h-[calc(100vh-140px)] flex items-center justify-center p-3 sm:p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home-bg.jpg')" }}
    >
      {/* Soft ambient overlay */}
      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[0.5px]"></div>

      {/* Glassmorphic Translucent Card */}
      <div className="relative z-10 max-w-lg w-full mx-auto text-center space-y-4 sm:space-y-5 bg-white/35 sm:bg-white/40 backdrop-blur-xl p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 border border-white/60 ring-1 ring-white/40">
        
        {/* Badge */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md text-emerald-950 border border-emerald-200/60 text-[11px] sm:text-xs font-black px-3 py-1 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{t.badge}</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight drop-shadow-sm">
          {t.heroTitle1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 font-black">
            {t.heroTitle2}
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-sm text-slate-800 max-w-md mx-auto leading-relaxed font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
          {t.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1 max-w-sm mx-auto sm:max-w-none">
          <button
            onClick={() => setCurrentTab('detect')}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-xl shadow-emerald-950/25 hover:shadow-emerald-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Scan className="w-4 h-4" />
            <span>{t.ctaDetect}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setCurrentTab('detect')}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-white/80 hover:bg-white text-slate-800 font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-white/80 shadow-md backdrop-blur-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span>{t.ctaDemo}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
