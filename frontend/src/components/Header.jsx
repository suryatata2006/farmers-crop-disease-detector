import React, { useState } from 'react';
import { Sprout, Phone, Menu, X, Globe, ShieldAlert, Sparkles, Bot } from 'lucide-react';
import { translations } from '../i18n';

export default function Header({ currentTab, setCurrentTab, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'detect', label: t.detect, highlight: true },
    { id: 'chat', label: t.chat, isBot: true },
    { id: 'dashboard', label: t.dashboard },
    { id: 'diseases', label: t.diseases },
    { id: 'about', label: t.about },
  ];

  const handleNavClick = (id) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      {/* Top Kisan Bar */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span>{t.kisanHelpline}</span>
            <span className="hidden sm:inline text-emerald-300 font-normal">| టోల్ ఫ్రీ ఉచిత సహాయం</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline bg-emerald-700/70 px-2 py-0.5 rounded text-[11px] text-emerald-200">
              DTI Working Prototype • MobileNetV2
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md shadow-emerald-600/10 border border-emerald-100 flex items-center justify-center p-1 group-hover:scale-105 group-hover:shadow-emerald-600/25 transition-all duration-300 overflow-hidden">
              <img 
                src="/logo-icon.png" 
                alt="Farmers Smart Crop Disease Detector" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {t.appName}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-tight">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    item.highlight
                      ? isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-600/20'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 border border-emerald-200/60'
                      : isActive
                        ? 'bg-slate-100 text-emerald-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.highlight && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                  {item.isBot && <Bot className="w-3.5 h-3.5 text-emerald-600" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Language Selector & Mobile Trigger */}
          <div className="flex items-center gap-2.5">
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-inner">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('te')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'te'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.isBot && <Bot className="w-4 h-4 text-emerald-600" />}
                  {item.label}
                </span>
                {item.highlight && (
                  <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    Primary
                  </span>
                )}
                {item.isBot && (
                  <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full font-bold">
                    Voice AI
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
