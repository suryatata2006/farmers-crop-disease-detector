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
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-slate-900/15 backdrop-blur-[0.5px]"></div>

      {/* Compact & Refined Hero Content Card */}
      <div className="relative z-10 max-w-lg w-full mx-auto text-center space-y-4 sm:space-y-5 bg-white/85 sm:bg-white/90 backdrop-blur-md p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl border border-white/80">
        
        {/* Badge */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100/90 text-emerald-800 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t.badge}</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight">
          {t.heroTitle1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700">
            {t.heroTitle2}
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
          {t.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1 max-w-sm mx-auto sm:max-w-none">
          <button
            onClick={() => setCurrentTab('detect')}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Scan className="w-4 h-4" />
            <span>{t.ctaDetect}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setCurrentTab('detect')}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-white/95 hover:bg-white text-slate-700 font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>{t.ctaDemo}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
