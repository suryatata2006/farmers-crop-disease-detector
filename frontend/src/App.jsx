import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detect from './pages/Detect';
import Dashboard from './pages/Dashboard';
import DiseasesCatalog from './pages/DiseasesCatalog';
import About from './pages/About';
import ChatPage from './pages/ChatPage';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [lang, setLang] = useState('en');
  const [activeSample, setActiveSample] = useState(null);

  // Change html lang attribute when language toggles
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleTrySample = async (sample) => {
    try {
      const res = await fetch(sample.imgUrl);
      const blob = await res.blob();
      const file = new File([blob], sample.filename || `${sample.id}.jpg`, { type: 'image/jpeg' });
      setActiveSample({
        file,
        previewUrl: sample.imgUrl,
        sampleId: sample.id,
      });
      setCurrentTab('detect');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error preloading demo sample:', err);
      setCurrentTab('detect');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8FAF7] ${lang === 'te' ? 'telugu-font' : ''}`}>
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home 
            setCurrentTab={setCurrentTab} 
            lang={lang} 
            onTrySample={handleTrySample}
          />
        )}
        {currentTab === 'detect' && (
          <Detect 
            setCurrentTab={setCurrentTab} 
            lang={lang} 
            activeSample={activeSample}
          />
        )}
        {currentTab === 'chat' && (
          <ChatPage lang={lang} setCurrentTab={setCurrentTab} />
        )}
        {currentTab === 'dashboard' && (
          <Dashboard setCurrentTab={setCurrentTab} lang={lang} />
        )}
        {currentTab === 'diseases' && (
          <DiseasesCatalog lang={lang} />
        )}
        {currentTab === 'about' && (
          <About lang={lang} />
        )}
      </main>

      {/* Floating AI & Voice Chat Widget on all pages */}
      <ChatWidget lang={lang} setCurrentTab={setCurrentTab} />

      {/* Footer */}
      <Footer lang={lang} setCurrentTab={setCurrentTab} />
    </div>
  );
}
