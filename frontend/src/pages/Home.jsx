import React from 'react';
import { 
  Sprout, 
  Scan, 
  ArrowRight
} from 'lucide-react';
import { translations } from '../i18n';

export default function Home({ setCurrentTab, lang }) {
  const t = translations[lang].home;

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#ECF8F1]">
      <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-7">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#D7F2E2] text-emerald-900 text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-xs">
          <span>✨</span>
          <span>🌱</span>
          <span>{t.badge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.16]">
          <span>{t.heroTitle1}</span>
          <br />
          <span className="text-[#059669]">
            {t.heroTitle2}
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
          {t.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => {
              setCurrentTab('detect');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5"
          >
            <Scan className="w-5 h-5 text-white" />
            <span>{t.ctaDetect}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => {
              setCurrentTab('detect');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm sm:text-base rounded-2xl border border-slate-200/90 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            <Sprout className="w-5 h-5 text-emerald-600" />
            <span>{t.ctaDemo}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
