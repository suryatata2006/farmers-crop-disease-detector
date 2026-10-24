import React from 'react';
import { Sprout, Phone, ShieldCheck, HeartHandshake, Leaf } from 'lucide-react';
import { translations } from '../i18n';

export default function Footer({ lang, setCurrentTab }) {
  const t = translations[lang].footer;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1 shadow-md overflow-hidden">
                <img 
                  src="/logo-icon.png" 
                  alt="Farmers Smart Crop Disease Detector" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">KrishiSeva AI</span>
                <p className="text-xs text-emerald-400 font-medium">Farmers Smart Crop Disease Detector</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering farmers with instant, on-field AI leaf disease diagnostics, bilingual advisory, and dual organic/chemical remedy pathways.
            </p>
          </div>

          {/* Quick links & helpline */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              Government Kisan Helpline
            </h4>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
              <p className="text-2xl font-black text-emerald-400 tracking-wide">1800-180-1551</p>
              <p className="text-xs text-slate-400 mt-1">
                Toll-free advisory service available daily in Telugu, English, and all regional languages.
              </p>
            </div>
          </div>

          {/* DTI Prototype notice */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Academic & DTI Prototype
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built as an end-to-end working prototype for the Design Thinking & Innovation (DTI) curriculum demonstration.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">FastAPI</span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">MobileNetV2</span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">ONNX Engine</span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">React + Vite</span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">SQLite</span>
            </div>
          </div>
        </div>

        {/* Disclaimer alert */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-slate-800 text-xs text-slate-400 leading-relaxed text-center sm:text-left">
          <p className="font-semibold text-emerald-400 mb-1">🌾 Agricultural Advisory Notice:</p>
          <p>{t.disclaimer}</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>{t.rights}</p>
          <p className="flex items-center gap-1.5">
            Designed with <HeartHandshake className="w-4 h-4 text-emerald-500" /> for Indian Farmers
          </p>
        </div>
      </div>
    </footer>
  );
}
