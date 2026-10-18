import React from 'react';
import { 
  Sprout, 
  Cpu, 
  Database, 
  Layout, 
  ShieldCheck, 
  GraduationCap, 
  Lightbulb, 
  Users, 
  CheckCircle2,
  Award
} from 'lucide-react';
import { translations } from '../i18n';

export default function About({ lang }) {
  const t = translations[lang].about;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
          DTI Capstone Prototype
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      {/* Problem & Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The Problem */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">{t.problemTitle}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t.problemDesc}
          </p>
          <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100 space-y-2 text-xs text-rose-900">
            <div className="flex items-center gap-2 font-bold">
              <span>⚠️ Critical Farm Pain Points:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-rose-800">
              <li>Lack of immediate field access to agricultural pathologists</li>
              <li>Incorrect chemical sprays leading to pest resistance</li>
              <li>Heavy economic crop failure before extension officer visits</li>
            </ul>
          </div>
        </div>

        {/* The Solution */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">{t.solutionTitle}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t.solutionDesc}
          </p>
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-2 text-xs text-emerald-900">
            <div className="flex items-center gap-2 font-bold">
              <span>🌱 Core Technical Pillars:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-emerald-800">
              <li>Instant on-device deep learning leaf image diagnosis</li>
              <li>Bilingual vernacular (Telugu + English) for grassroots adoption</li>
              <li>Integrated organic bio-pesticides alongside chemical advice</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Architecture & Tech Stack Grid */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white space-y-8 shadow-xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Modern System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {t.techTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI / Inference */}
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">AI / Deep Learning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.techAI}
            </p>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
              <li>MobileNetV2 1.0 224</li>
              <li>ONNX Runtime inference (~50ms)</li>
              <li>Normalized NCHW float32 tensors</li>
            </ul>
          </div>

          {/* Backend API */}
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Backend & Database</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.techBackend}
            </p>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
              <li>FastAPI asynchronous endpoints</li>
              <li>SQLite local scan persistence</li>
              <li>PIL safe image validation</li>
            </ul>
          </div>

          {/* Frontend */}
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Frontend & UX</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.techFrontend}
            </p>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
              <li>Vite high-speed bundler</li>
              <li>Tailwind responsive styling</li>
              <li>Live webcam video capture</li>
            </ul>
          </div>
        </div>
      </div>

      {/* College DTI Exhibition Note */}
      <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 rounded-3xl p-8 border border-emerald-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/30">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Academic Project Submission
          </span>
          <h3 className="text-xl font-black text-slate-900">
            Design Thinking & Innovation (DTI) Prototype
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.dtiNote} Built with user empathy, iterative prototyping, real machine learning weights, and accessible bilingual design for Indian agrarian communities.
          </p>
        </div>
      </div>
    </div>
  );
}
