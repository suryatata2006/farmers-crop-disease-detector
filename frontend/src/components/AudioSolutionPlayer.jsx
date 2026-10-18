import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Square, 
  Play, 
  Sparkles, 
  Leaf, 
  ShieldAlert, 
  ShieldCheck, 
  AlertCircle,
  Headphones,
  CheckCircle2,
  Gauge
} from 'lucide-react';
import { translations } from '../i18n';

/**
 * AudioSolutionPlayer
 * Designed specifically for farmers who are unable to read or prefer audio guidance.
 * Speaks the complete diagnosis, symptoms, organic remedies, and chemical dosages aloud.
 */
export default function AudioSolutionPlayer({ result, lang = 'en', solutionLang = 'te' }) {
  const t = translations[lang].detect;
  const isTe = solutionLang === 'te' || lang === 'te';

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(null); // 'full' | 'organic' | 'chemical' | 'symptoms' | 'prevention'
  const [speechRate, setSpeechRate] = useState(0.88); // Default to slightly slower for rural clarity
  const [isSupported, setIsSupported] = useState(true);

  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      // Clean up speech on unmount
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Formulate natural spoken text for the entire diagnosis
  const getFullSpokenScript = () => {
    const cropName = isTe ? (result.crop_te || result.crop) : result.crop;
    const diseaseName = isTe ? (result.predicted_disease_te || result.predicted_disease) : result.predicted_disease;
    const severity = result.severity || (isTe ? 'మధ్యస్థం' : 'Moderate');
    const confidence = result.confidence || 90;

    const organicList = (isTe && result.treatment_organic_te && result.treatment_organic_te.length > 0
      ? result.treatment_organic_te
      : result.treatment_organic || []).slice(0, 3).join('. ');

    const chemicalList = (isTe && result.treatment_chemical_te && result.treatment_chemical_te.length > 0
      ? result.treatment_chemical_te
      : result.treatment_chemical || []).slice(0, 3).join('. ');

    const symptomsList = (isTe && result.symptoms_te && result.symptoms_te.length > 0
      ? result.symptoms_te
      : result.symptoms || []).slice(0, 2).join('. ');

    const preventionList = (isTe && result.prevention_te && result.prevention_te.length > 0
      ? result.prevention_te
      : result.prevention || []).slice(0, 2).join('. ');

    if (result.is_healthy) {
      if (isTe) {
        return `నమస్కారం రైతు సోదరులారా! శుభవార్త. మీ ${cropName} పంట ఆకు సంపూర్ణ ఆరోగ్యంగా ఉంది. ఎటువంటి తెగులు లేదా వ్యాధి లక్షణాలు కనిపించలేదు. మీ పంట సంరక్షణను ఇలాగే కొనసాగించండి. ఏదైనా సందేహం ఉంటే కిసాన్ కాల్ సెంటర్ 1800-180-1551 కి కాల్ చేయండి.`;
      }
      return `Hello farmer! Great news. Your ${cropName} crop leaf is completely healthy. No disease or pathogen was detected. Continue your good farming practices. For any questions, call Kisan Call Center 1800-180-1551.`;
    }

    if (isTe) {
      return (
        `నమస్కారం రైతు సోదరులారా! మీ పంట ఆకును పరీక్షించాము. ` +
        `మీ పంట పేరు: ${cropName}. ` +
        `గుర్తించిన తెగులు: ${diseaseName}. ` +
        `ఖచ్చితత్వం: ${confidence} శాతం. ` +
        `వ్యాధి తీవ్రత: ${severity}. ` +
        `ఆకుపై కనిపించే ముఖ్య లక్షణాలు: ${symptomsList}. ` +
        `సేంద్రీయ మరియు జీవ నివారణ చర్యలు: ${organicList}. ` +
        `రసాయన మందుల ఖచ్చితమైన మోతాదు: ${chemicalList}. ` +
        `ముందస్తు రక్షణ విధానాలు: ${preventionList}. ` +
        `ముఖ్య హెచ్చరిక: రసాయన మందులు పిచికారీ చేసేటప్పుడు తప్పనిసరిగా మాస్క్ మరియు చేతులకు తొడుగులు ధరించండి. ఉదయం లేదా సాయంత్రం మాత్రమే పిచికారీ చేయండి. ఉచిత వ్యవసాయ సలహాల కోసం కిసాన్ హెల్ప్‌లైన్ 1800-180-1551 కి కాల్ చేయండి.`
      );
    }

    return (
      `Hello farmer! We have analyzed your crop leaf specimen. ` +
      `Crop name: ${cropName}. ` +
      `Identified pathology: ${diseaseName}. ` +
      `Model confidence: ${confidence} percent. ` +
      `Severity level: ${severity}. ` +
      `Observable symptoms: ${symptomsList}. ` +
      `Recommended organic bio remedies: ${organicList}. ` +
      `Approved chemical fungicides and dilution dosages: ${chemicalList}. ` +
      `Cultural prevention measures: ${preventionList}. ` +
      `Important safety precaution: Always wear face masks and protective rubber gloves when handling chemical sprays. For toll-free helpline, call Kisan Call Center 1800-180-1551.`
    );
  };

  const getSectionSpokenScript = (section) => {
    if (section === 'organic') {
      const list = (isTe && result.treatment_organic_te ? result.treatment_organic_te : result.treatment_organic || []).join('. ');
      return isTe 
        ? `సేంద్రీయ మరియు సహజ జీవ నివారణలు: ${list}. వేప నూనె లేదా ట్రైకోడెర్మా వాడటం వల్ల నేల సారం పెరుగుతుంది.`
        : `Organic and biological remedies: ${list}. Neem oil and biological agents preserve soil microbial life.`;
    }
    if (section === 'chemical') {
      const list = (isTe && result.treatment_chemical_te ? result.treatment_chemical_te : result.treatment_chemical || []).join('. ');
      return isTe 
        ? `ఆమోదించబడిన రసాయన మందుల మోతాదులు: ${list}. దయచేసి సిఫార్సు చేసిన పరిమాణంలోనే శుభ్రమైన నీటితో కలిపి పిచికారీ చేయండి. మాస్క్ తప్పనిసరి.`
        : `Approved chemical fungicides and exact dosages: ${list}. Dilute strictly as instructed with clean water and wear protective gear.`;
    }
    if (section === 'symptoms') {
      const list = (isTe && result.symptoms_te ? result.symptoms_te : result.symptoms || []).join('. ');
      return isTe 
        ? `పంట ఆకుపై కనిపించే స్పష్టమైన తెగులు లక్షణాలు: ${list}.`
        : `Observable leaf symptoms: ${list}.`;
    }
    if (section === 'prevention') {
      const list = (isTe && result.prevention_te ? result.prevention_te : result.prevention || []).join('. ');
      return isTe 
        ? `భవిష్యత్తులో తెగులు తిరిగి రాకుండా నిరోధించే ముందస్తు జాగ్రత్తలు: ${list}.`
        : `Cultural practices to prevent future crop reinfection: ${list}.`;
    }
    return getFullSpokenScript();
  };

  const speakText = (text, sectionName) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    // Clean text of non-spoken formatting symbols
    const clean = text
      .replace(/[*#_`]/g, '')
      .replace(/•/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = isTe ? 'te-IN' : 'en-IN';
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Detect installed voices
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const targetPrefix = isTe ? 'te' : 'en-in';
      const regionalVoice = voices.find((v) => 
        v.lang.toLowerCase().replace('_', '-').startsWith(targetPrefix)
      );
      if (regionalVoice) {
        utterance.voice = regionalVoice;
      }
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentSection(sectionName);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentSection(null);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      setIsPlaying(false);
      setCurrentSection(null);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayFull = () => {
    if (isPlaying && currentSection === 'full') {
      stopAudio();
    } else {
      speakText(getFullSpokenScript(), 'full');
    }
  };

  const handlePlaySection = (sec) => {
    if (isPlaying && currentSection === sec) {
      stopAudio();
    } else {
      speakText(getSectionSpokenScript(sec), sec);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentSection(null);
  };

  const toggleSpeed = () => {
    const newRate = speechRate === 0.88 ? 0.75 : 0.88;
    setSpeechRate(newRate);
    if (isPlaying && currentSection) {
      // Restart current playback at new rate
      const currentScript = currentSection === 'full' ? getFullSpokenScript() : getSectionSpokenScript(currentSection);
      speakText(currentScript, currentSection);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-emerald-600/30 space-y-4 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        
        {/* Left: Speaker icon + Accessible Title */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform ${
            isPlaying 
              ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-300/40 animate-pulse scale-105' 
              : 'bg-emerald-700/80 text-emerald-200 border border-emerald-500/40'
          }`}>
            <Volume2 className="w-7 h-7" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                <span>{t.audioReaderTitle}</span>
              </h3>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-300/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                {isTe ? 'రైతుల వాయిస్' : 'Voice Assistance'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed mt-0.5">
              {t.audioReaderSub}
            </p>
          </div>
        </div>

        {/* Right: Master Controls & Sound Wave */}
        <div className="flex items-center gap-2.5 flex-wrap">
          
          {/* Animated sound wave bars when speaking */}
          {isPlaying && (
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-400/40">
              <div className="w-1 h-5 bg-amber-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite]"></div>
              <div className="w-1 h-7 bg-emerald-300 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_0.1s]"></div>
              <div className="w-1 h-4 bg-amber-300 rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.2s]"></div>
              <div className="w-1 h-6 bg-emerald-400 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.3s]"></div>
              <div className="w-1 h-3 bg-amber-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.15s]"></div>
              <span className="text-[11px] font-bold text-emerald-200 ml-1.5 hidden sm:inline">
                {isTe ? 'వినిపిస్తోంది...' : 'Speaking...'}
              </span>
            </div>
          )}

          {/* Speed Toggle: Normal vs Slow (for elderly farmers) */}
          <button
            onClick={toggleSpeed}
            title={isTe ? 'వాయిస్ వేగాన్ని మార్చండి' : 'Toggle Voice Speed'}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-700/60 hover:bg-emerald-700 text-emerald-100 border border-emerald-500/30 transition-all flex items-center gap-1.5"
          >
            <Gauge className="w-3.5 h-3.5 text-emerald-300" />
            <span>{speechRate < 0.8 ? (isTe ? 'నెమ్మది (0.75x)' : 'Slow') : (isTe ? 'సాధారణం' : 'Normal')}</span>
          </button>

          {/* Main Full Play / Stop Button */}
          {isPlaying && currentSection === 'full' ? (
            <button
              onClick={stopAudio}
              className="px-5 py-3 rounded-2xl font-black text-sm bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all active:scale-95"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>{t.stopAudio}</span>
            </button>
          ) : (
            <button
              onClick={handlePlayFull}
              className="px-5 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-slate-900" />
              <span>{t.listenFullSolution}</span>
            </button>
          )}
        </div>
      </div>

      {/* Section Quick Audio Buttons: Instant 1-tap listening */}
      <div className="pt-2 border-t border-emerald-700/50 flex flex-wrap items-center gap-2 relative z-10">
        <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Headphones className="w-3.5 h-3.5 text-emerald-300" />
          {isTe ? 'విభాగం వారిగా వినండి:' : 'Listen by Section:'}
        </span>

        {/* 1. Organic Remedies */}
        <button
          onClick={() => handlePlaySection('organic')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            isPlaying && currentSection === 'organic'
              ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md ring-2 ring-amber-300/40 animate-pulse'
              : 'bg-emerald-900/60 hover:bg-emerald-700/80 text-emerald-100 border-emerald-600/40'
          }`}
        >
          <Leaf className="w-3.5 h-3.5 text-emerald-300" />
          <span>🌿 {isTe ? 'సేంద్రీయ నివారణ' : 'Organic Remedies'}</span>
          {isPlaying && currentSection === 'organic' ? <Square className="w-3 h-3 fill-slate-900" /> : <Play className="w-3 h-3 fill-emerald-300" />}
        </button>

        {/* 2. Chemical Dosages */}
        <button
          onClick={() => handlePlaySection('chemical')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            isPlaying && currentSection === 'chemical'
              ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md ring-2 ring-amber-300/40 animate-pulse'
              : 'bg-emerald-900/60 hover:bg-emerald-700/80 text-emerald-100 border-emerald-600/40'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
          <span>🧪 {isTe ? 'రసాయన మందుల మోతాదు' : 'Chemical Dosages'}</span>
          {isPlaying && currentSection === 'chemical' ? <Square className="w-3 h-3 fill-slate-900" /> : <Play className="w-3 h-3 fill-amber-300" />}
        </button>

        {/* 3. Symptoms */}
        <button
          onClick={() => handlePlaySection('symptoms')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            isPlaying && currentSection === 'symptoms'
              ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md ring-2 ring-amber-300/40 animate-pulse'
              : 'bg-emerald-900/60 hover:bg-emerald-700/80 text-emerald-100 border-emerald-600/40'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-slate-300" />
          <span>🔍 {isTe ? 'లక్షణాలు' : 'Symptoms'}</span>
          {isPlaying && currentSection === 'symptoms' ? <Square className="w-3 h-3 fill-slate-900" /> : <Play className="w-3 h-3 fill-slate-300" />}
        </button>

        {/* 4. Prevention */}
        <button
          onClick={() => handlePlaySection('prevention')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            isPlaying && currentSection === 'prevention'
              ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md ring-2 ring-amber-300/40 animate-pulse'
              : 'bg-emerald-900/60 hover:bg-emerald-700/80 text-emerald-100 border-emerald-600/40'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
          <span>🛡️ {isTe ? 'ముందస్తు రక్షణ' : 'Prevention'}</span>
          {isPlaying && currentSection === 'prevention' ? <Square className="w-3 h-3 fill-slate-900" /> : <Play className="w-3 h-3 fill-teal-300" />}
        </button>

        {/* Stop button when any sub-section is active */}
        {isPlaying && (
          <button
            onClick={stopAudio}
            className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1 transition-all ml-auto"
          >
            <Square className="w-3 h-3 fill-white" />
            <span>{isTe ? 'ఆపండి' : 'Stop'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
