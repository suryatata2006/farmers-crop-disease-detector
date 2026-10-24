import React, { useState } from 'react';
import { Phone, Menu, X, Sparkles, Scan, Layers, Info, Bot } from 'lucide-react';
import { translations } from '../i18n';

export default function Header({ currentTab, setCurrentTab, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const navItems = [
    { id: 'home', label: t.home, icon: null },
    { id: 'detect', label: t.detect, highlight: true, icon: Scan },
    { id: 'samples', label: t.samples, icon: Sparkles, isSection: true },
    { id: 'features', label: t.features, icon: Layers, isSection: true },
    { id: 'about', label: t.about, icon: Info },
  ];

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    if (item.isSection) {
      if (currentTab !== 'home') {
        setCurrentTab('home');
        setTimeout(() => {
          const el = document.getElementById(item.id === 'samples' ? 'demo-samples' : 'features');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById(item.id === 'samples' ? 'demo-samples' : 'features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentTab(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100/90 shadow-sm transition-all">
      {/* Top Kisan Helpline Ribbon */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-3 sm:px-4 font-medium border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a 
            href="tel:18001801551" 
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span className="font-bold">{t.kisanHelpline}</span>
            <span className="hidden sm:inline text-emerald-300/80 font-normal">
              {lang === 'te' ? '| టోల్ ఫ్రీ ఉచిత సహాయం' : '| Toll-Free 24/7 Farmer Advisory'}
            </span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline bg-emerald-800/80 px-2.5 py-0.5 rounded text-[11px] text-emerald-200 border border-emerald-700/50">
              MobileNetV2 Deep CNN • 95.4% Accuracy
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white shadow-md shadow-emerald-700/10 border border-emerald-100 flex items-center justify-center p-1 group-hover:scale-105 transition-all duration-300 shrink-0">
              <img 
                src="/logo-icon.png" 
                alt="KrishiSeva AI Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  KrishiSeva
                </span>
                <span className="bg-emerald-600 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                  AI
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-tight truncate max-w-[155px] sm:max-w-[240px] md:max-w-none">
                {lang === 'te' ? 'రైతుల స్మార్ట్ పంట తెగుళ్ల గుర్తింపు' : 'Smart Crop Disease Detector'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3.5 xl:px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    item.highlight
                      ? isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100/90 border border-emerald-200/80 shadow-sm'
                      : isActive
                        ? 'bg-slate-100 text-emerald-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${item.highlight ? (isActive ? 'text-white' : 'text-emerald-600') : 'text-slate-400'}`} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* English / Telugu Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-inner">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Switch language to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('te')}
                className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'te'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Switch language to Telugu"
              >
                తెలుగు
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                  item.highlight
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : isActive
                      ? 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600'
                      : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {Icon && <Icon className={`w-4 h-4 ${item.highlight ? 'text-white' : 'text-emerald-600'}`} />}
                  <span>{item.label}</span>
                </span>
                {item.highlight && (
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    AI Scan
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
