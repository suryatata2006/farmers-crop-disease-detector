import React, { useState } from 'react';
import { Phone, Menu, X, Sparkles, Bot, ShieldCheck } from 'lucide-react';
import { translations } from '../i18n';

export default function Header({ currentTab, setCurrentTab, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'detect', label: t.detect, highlight: true },
    { id: 'chat', label: t.chat },
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
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-xs">
      {/* Top Kisan Helpline Ribbon */}
      <div className="bg-[#0B5E3C] text-emerald-50 text-xs py-1.5 px-3 sm:px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a 
            href="tel:18001801551" 
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-semibold">{t.kisanHelpline}</span>
          </a>
          <div className="hidden sm:flex items-center gap-3 text-emerald-200/90 text-[11px]">
            <span>{lang === 'te' ? 'టోల్ ఫ్రీ 24/7 ఉచిత రైతు సలహా సేవ' : 'Toll-Free 24/7 Farmer Advisory'}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center p-1 group-hover:scale-105 transition-all duration-300 shrink-0 overflow-hidden">
              <img 
                src="/logo-icon.png" 
                alt="KrishiSeva AI" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  KrishiSeva
                </span>
                <span className="bg-[#D7F2E2] text-emerald-800 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-tight">
                {lang === 'te' ? 'రైతుల స్మార్ట్ పంట తెగుళ్ల గుర్తింపు' : 'Smart Crop Disease Detector'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    item.highlight
                      ? isActive
                        ? 'bg-[#059669] text-white shadow-md shadow-emerald-700/25'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100/90 border border-emerald-200/70'
                      : isActive
                        ? 'bg-slate-100 text-emerald-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.highlight && <Sparkles className="w-3.5 h-3.5 text-emerald-300" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* English / Telugu Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-inner">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Switch language to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('te')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'te'
                    ? 'bg-[#059669] text-white shadow-xs'
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
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
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
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-all ${
                  item.highlight
                    ? 'bg-[#059669] text-white shadow-md shadow-emerald-700/25'
                    : isActive
                      ? 'bg-emerald-50 text-emerald-800 border-l-4 border-[#059669]'
                      : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    Scan AI
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
