import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Leaf, 
  FileText, 
  Printer, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { translations } from '../i18n';
import CameraCapture from '../components/CameraCapture';
import SamplePicker from '../components/SamplePicker';

export default function Detect({ setCurrentTab, lang }) {
  const t = translations[lang].detect;
  const fileInputRef = useRef(null);

  const [activeInputMode, setActiveInputMode] = useState('upload'); // 'upload' | 'camera' | 'sample'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedSampleId, setSelectedSampleId] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeResultTab, setActiveResultTab] = useState('organic'); // default to 'organic' treatment tab!
  const [solutionLang, setSolutionLang] = useState('te'); // default to 'te' (Telugu solutions)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setError(null);
    setResult(null);

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError(lang === 'te' ? 'చిత్రం పరిమాణం 10MB కంటే తక్కువగా ఉండాలి.' : 'Image size must be less than 10MB.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError(lang === 'te' ? 'దయచేసి JPG లేదా PNG ఆకృతి గల చిత్రాన్ని మాత్రమే ఎంచుకోండి.' : 'Please select a JPG, JPEG, or PNG image.');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleCameraCapture = (file, url) => {
    setSelectedFile(file);
    setPreviewUrl(url);
    setActiveInputMode('upload');
  };

  const handleSelectSample = (file, url, sampleId) => {
    setSelectedFile(file);
    setPreviewUrl(url);
    setSelectedSampleId(sampleId);
  };

  const resetSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedSampleId(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server returned error ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Detection failed:', err);
      setError(err.message || (lang === 'te' ? 'విశ్లేషణ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.' : 'Analysis failed. Please verify that the backend is running and try again.'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      {/* Main Workspace Box */}
      {!result ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          
          {/* Input Mode Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => setActiveInputMode('upload')}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeInputMode === 'upload'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>{t.uploadTab}</span>
            </button>

            <button
              onClick={() => setActiveInputMode('camera')}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeInputMode === 'camera'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{t.cameraTab}</span>
            </button>

            <button
              onClick={() => setActiveInputMode('sample')}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeInputMode === 'sample'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.sampleTab}</span>
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{t.errorPrefix}</p>
                <p className="text-xs text-rose-700">{error}</p>
              </div>
            </div>
          )}

          {/* Mode 1: Camera Active */}
          {activeInputMode === 'camera' && (
            <CameraCapture 
              onCapture={handleCameraCapture}
              onCancel={() => setActiveInputMode('upload')}
              lang={lang}
            />
          )}

          {/* Mode 2: Sample Picker Active */}
          {activeInputMode === 'sample' && (
            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <SamplePicker 
                onSelectSample={handleSelectSample} 
                selectedSampleName={selectedSampleId} 
                lang={lang} 
              />
            </div>
          )}

          {/* Mode 3: Drag & Drop Upload Zone (Default) */}
          {activeInputMode === 'upload' && !previewUrl && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-10 text-center cursor-pointer bg-emerald-50/20 hover:bg-emerald-50/40 transition-all duration-200 space-y-4 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700 mx-auto flex items-center justify-center transition-all duration-300 shadow-sm">
                <Upload className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-slate-800">
                  {t.dropPrompt}{' '}
                  <span className="text-emerald-700 underline font-extrabold">
                    {t.browseButton}
                  </span>
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {t.fileHint}
                </p>
              </div>
            </div>
          )}

          {/* Image Selected & Preview Card */}
          {previewUrl && (
            <div className="space-y-5">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 max-w-md mx-auto aspect-[4/3] shadow-md group">
                <img
                  src={previewUrl}
                  alt="Selected Leaf Preview"
                  className={`w-full h-full object-cover ${isAnalyzing ? 'opacity-70 blur-[1px]' : ''}`}
                />
                
                {/* Active scan beam animation when analyzing */}
                {isAnalyzing && <div className="scanner-beam"></div>}

                {/* Top preview badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-xl">
                  {t.selectedImage}
                </div>

                {/* Change photo button */}
                {!isAnalyzing && (
                  <button
                    onClick={resetSelection}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl shadow transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t.changeImage}
                  </button>
                )}
              </div>

              {/* Sample quick bar underneath preview */}
              <div className="border-t border-slate-100 pt-4">
                <SamplePicker 
                  onSelectSample={handleSelectSample} 
                  selectedSampleName={selectedSampleId} 
                  lang={lang} 
                />
              </div>

              {/* Analyze CTA Button */}
              <div className="pt-2 flex justify-center">
                <button
                  disabled={isAnalyzing}
                  onClick={handleAnalyze}
                  className={`w-full sm:w-80 py-4 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-3 transition-all duration-200 ${
                    isAnalyzing
                      ? 'bg-slate-400 text-white cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{t.analyzingText}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-emerald-200" />
                      <span>{t.analyzeButton}</span>
                    </>
                  )}
                </button>
              </div>

              {isAnalyzing && (
                <p className="text-center text-xs text-slate-500 animate-pulse">
                  {t.analyzingSub}
                </p>
              )}
            </div>
          )}

        </div>
      ) : (

        /* ================= RESULT VIEW ================= */
        <div className="space-y-6">
          {/* Top Result Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
            
            {/* Header with Crop Badge and Health Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    {lang === 'te' ? result.crop_te : result.crop}
                  </span>
                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                      result.is_healthy
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {result.is_healthy ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t.healthyBadge}
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {t.diseasedBadge}
                      </>
                    )}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {lang === 'te' ? result.predicted_disease_te : result.predicted_disease}
                </h2>
                {lang === 'te' && (
                  <p className="text-xs font-semibold text-slate-500">
                    English: {result.predicted_disease}
                  </p>
                )}
              </div>

              {/* Confidence Meter Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 sm:text-right min-w-[200px]">
                <p className="text-xs font-semibold text-slate-500">{t.confidenceLabel}</p>
                <p className="text-3xl font-black text-emerald-600">
                  {result.confidence}%
                </p>
                {/* Confidence Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1.5">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Middle Section: Image and Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-slate-100">
                  <img
                    src={previewUrl || result.image_url}
                    alt="Diagnosed plant leaf"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md text-white text-[11px] p-2 rounded-xl text-center">
                    {lang === 'te' ? 'విశ్లేషించబడిన ఆకు చిత్రం' : 'Analyzed Leaf Specimen'}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">{t.severityLabel}:</span>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg border ${
                    result.is_healthy 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : result.severity.includes('Critical') || result.severity.includes('Severe')
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {result.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {lang === 'te' ? result.description_te : result.description}
                </p>

                {/* Alternative Probability Candidates */}
                {result.top_candidates && result.top_candidates.length > 1 && (
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                      {t.candidatesTitle}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.top_candidates.map((cand, idx) => (
                        <span 
                          key={idx}
                          className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium"
                        >
                          {cand.label} <strong className="text-emerald-700">({cand.confidence}%)</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Advisory Tabs */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveResultTab('organic')}
                    className={`pb-2.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeResultTab === 'organic'
                        ? 'border-emerald-600 text-emerald-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <span>{t.tabOrganic}</span>
                  </button>

                  <button
                    onClick={() => setActiveResultTab('chemical')}
                    className={`pb-2.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeResultTab === 'chemical'
                        ? 'border-emerald-600 text-emerald-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>{t.tabChemical}</span>
                  </button>

                  <button
                    onClick={() => setActiveResultTab('symptoms')}
                    className={`pb-2.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeResultTab === 'symptoms'
                        ? 'border-emerald-600 text-emerald-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{t.tabSymptoms}</span>
                  </button>

                  <button
                    onClick={() => setActiveResultTab('prevention')}
                    className={`pb-2.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeResultTab === 'prevention'
                        ? 'border-emerald-600 text-emerald-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>{t.tabPrevention}</span>
                  </button>
                </div>

                {/* Solution Language Switcher (Defaults to Telugu) */}
                <div className="flex items-center gap-2 bg-emerald-50/80 px-2.5 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto">
                  <span className="text-[11px] font-bold text-emerald-900">
                    {lang === 'te' ? 'నివారణల భాష:' : 'Remedies:'}
                  </span>
                  <div className="flex items-center bg-white p-0.5 rounded-lg border border-emerald-200 shadow-sm">
                    <button
                      onClick={() => setSolutionLang('te')}
                      className={`px-2 py-0.5 text-xs font-bold rounded transition-all ${
                        solutionLang === 'te'
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      తెలుగు (Telugu)
                    </button>
                    <button
                      onClick={() => setSolutionLang('en')}
                      className={`px-2 py-0.5 text-xs font-bold rounded transition-all ${
                        solutionLang === 'en'
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Content Box */}
              {(() => {
                const isTe = solutionLang === 'te' || lang === 'te';
                const displaySymptoms = isTe && result.symptoms_te && result.symptoms_te.length > 0 
                  ? result.symptoms_te 
                  : result.symptoms;
                const displayOrganic = isTe && result.treatment_organic_te && result.treatment_organic_te.length > 0 
                  ? result.treatment_organic_te 
                  : result.treatment_organic;
                const displayChemical = isTe && result.treatment_chemical_te && result.treatment_chemical_te.length > 0 
                  ? result.treatment_chemical_te 
                  : result.treatment_chemical;
                const displayPrevention = isTe && result.prevention_te && result.prevention_te.length > 0 
                  ? result.prevention_te 
                  : result.prevention;

                return (
                  <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                    {activeResultTab === 'organic' && (
                      <div className="space-y-3">
                        <div className="bg-emerald-100/70 text-emerald-950 text-xs sm:text-sm p-3.5 rounded-xl font-bold flex items-center justify-between border border-emerald-200">
                          <span>🌿 {isTe ? 'సేంద్రీయ & సహజ జీవ నివారణలు (రైతులకు తక్కువ ఖర్చు - నేల సంరక్షణ):' : 'Eco-friendly and low-cost bio-remedies suitable for sustainable farming:'}</span>
                          <span className="bg-emerald-700 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-black shrink-0">
                            {isTe ? 'సేంద్రీయ పరిష్కారం' : 'Organic'}
                          </span>
                        </div>
                        <ul className="space-y-2.5">
                          {displayOrganic.map((org, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm">
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{org}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeResultTab === 'chemical' && (
                      <div className="space-y-3">
                        <div className="bg-amber-100/70 text-amber-950 text-xs sm:text-sm p-3.5 rounded-xl font-bold flex items-center justify-between border border-amber-200">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                            <span>{isTe ? 'రసాయన మందుల మోతాదు (జాగ్రత్త: సిఫార్సు చేసిన పరిమాణంలోనే పిచికారీ చేయండి):' : 'Chemical fungicides & dosages (Strictly adhere to recommended dilution):'}</span>
                          </div>
                          <span className="bg-amber-600 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-black shrink-0">
                            {isTe ? 'రసాయన పరిష్కారం' : 'Chemical'}
                          </span>
                        </div>
                        <ul className="space-y-2.5">
                          {displayChemical.map((chem, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium bg-white p-3.5 rounded-xl border border-amber-100 shadow-sm">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                              <span className="leading-relaxed">{chem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeResultTab === 'symptoms' && (
                      <div className="space-y-3">
                        <div className="bg-slate-200/70 text-slate-800 text-xs sm:text-sm p-3.5 rounded-xl font-bold flex items-center justify-between border border-slate-300/80">
                          <span>🔍 {isTe ? 'పంట ఆకుపై కనిపించే స్పష్టమైన తెగులు లక్షణాలు:' : 'Observable visual leaf symptoms in the field:'}</span>
                          <span className="bg-slate-700 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-black shrink-0">
                            {isTe ? 'లక్షణాలు' : 'Symptoms'}
                          </span>
                        </div>
                        <ul className="space-y-2.5">
                          {displaySymptoms.map((sym, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                              <span className="leading-relaxed">{sym}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeResultTab === 'prevention' && (
                      <div className="space-y-3">
                        <div className="bg-teal-100/70 text-teal-950 text-xs sm:text-sm p-3.5 rounded-xl font-bold flex items-center justify-between border border-teal-200">
                          <span>🛡️ {isTe ? 'భవిష్యత్తులో తెగులు తిరిగి రాకుండా నిరోధించే పంట సంరక్షణ విధానాలు:' : 'Cultural practices to prevent reinfection in upcoming crop cycles:'}</span>
                          <span className="bg-teal-700 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-black shrink-0">
                            {isTe ? 'ముందస్తు రక్షణ' : 'Prevention'}
                          </span>
                        </div>
                        <ul className="space-y-2.5">
                          {displayPrevention.map((prev, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-medium bg-white p-3.5 rounded-xl border border-teal-100 shadow-sm">
                              <CheckCircle2 className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{prev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Kisan Hotline Help Box */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-700 shrink-0" />
                <p className="text-xs sm:text-sm text-slate-700">
                  {t.helplineText}{' '}
                  <strong className="text-emerald-800 font-black">1800-180-1551</strong>
                </p>
              </div>
              <a
                href="tel:18001801551"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shrink-0"
              >
                {lang === 'te' ? 'ఇప్పుడే కాల్ చేయండి' : 'Call Free Now'}
              </a>
            </div>

            {/* Official Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
              <p className="font-bold text-slate-800 mb-0.5">⚠️ {lang === 'te' ? 'రైతు సోదరులకు సలహా:' : 'Important Farmer Advisory:'}</p>
              <p>{lang === 'te' ? result.disclaimer_te : result.disclaimer}</p>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={resetSelection}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.scanAnother}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrint}
                  className="flex-1 sm:flex-none px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.printAdvisory}</span>
                </button>

                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="flex-1 sm:flex-none px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{t.viewDashboard}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
