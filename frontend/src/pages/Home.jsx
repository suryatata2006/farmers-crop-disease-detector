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
      className="relative min-h-[calc(100vh-160px)] flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home-bg.jpg')" }}
    >
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-slate-900/15 backdrop-blur-[0.5px]"></div>

      {/* Hero Content Card with Frosted Glass Effect */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-7 bg-white/85 sm:bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/80">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{t.badge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18]">
          {t.heroTitle1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700">
            {t.heroTitle2}
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
          {t.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => setCurrentTab('detect')}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Scan className="w-5 h-5" />
            <span>{t.ctaDetect}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentTab('detect')}
            className="w-full sm:w-auto px-8 py-4 bg-white/95 hover:bg-white text-slate-700 font-bold text-base rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sprout className="w-5 h-5 text-emerald-600" />
            <span>{t.ctaDemo}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
