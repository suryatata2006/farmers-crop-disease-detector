import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Leaf, ShieldAlert, CheckCircle2, AlertTriangle, Volume2 } from 'lucide-react';
import { translations } from '../i18n';
import { speakText } from '../components/VoiceAssistant';

export default function DiseasesCatalog({ lang }) {
  const t = translations[lang].diseases;
  const [catalog, setCatalog] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'healthy' | 'diseased'

  useEffect(() => {
    fetch('/api/diseases')
      .then((res) => res.json())
      .then((data) => setCatalog(data.catalog || {}))
      .catch((err) => console.error('Failed to load diseases catalog:', err));
  }, []);

  const diseaseList = Object.entries(catalog).map(([key, item]) => ({
    key,
    ...item
  }));

  const filteredDiseases = diseaseList.filter((item) => {
    const matchesSearch = 
      item.disease_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.disease_name_te && item.disease_name_te.includes(searchTerm)) ||
      item.crop.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'healthy') return matchesSearch && item.is_healthy;
    if (filterType === 'diseased') return matchesSearch && !item.is_healthy;
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterType === 'all'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.all}
          </button>
          <button
            onClick={() => setFilterType('diseased')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterType === 'diseased'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.diseasesOnly}
          </button>
          <button
            onClick={() => setFilterType('healthy')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterType === 'healthy'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.healthyOnly}
          </button>
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((item) => (
          <div
            key={item.key}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  {lang === 'te' ? item.crop_te : item.crop}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    item.is_healthy
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {item.is_healthy
                    ? lang === 'te'
                      ? 'ఆరోగ్యం'
                      : 'Healthy'
                    : lang === 'te'
                    ? 'తెగులు'
                    : 'Diseased'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {lang === 'te' ? item.disease_name_te : item.disease_name}
                </h3>
                {lang === 'te' && (
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {item.disease_name}
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-600 line-clamp-3">
                {lang === 'te' ? item.description_te : item.description}
              </p>

              {/* Symptoms Preview */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                <p className="font-bold text-slate-700">
                  {lang === 'te' ? 'లక్షణాలు:' : 'Key Symptoms:'}
                </p>
                <ul className="text-slate-600 list-disc list-inside space-y-0.5 text-[11px]">
                  {(lang === 'te' && item.symptoms_te?.length ? item.symptoms_te : item.symptoms)
                    .slice(0, 2)
                    .map((sym, idx) => (
                      <li key={idx} className="truncate">{sym}</li>
                    ))}
                </ul>
              </div>

              {/* Solution Preview in Telugu */}
              <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-100 text-xs space-y-1">
                <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <span>🌿</span>
                  <span>{lang === 'te' ? 'సేంద్రీయ పరిష్కారం:' : 'Organic Remedy:'}</span>
                </p>
                <p className="text-slate-700 text-[11px] leading-relaxed line-clamp-2">
                  {lang === 'te' && item.treatment_organic_te?.length
                    ? item.treatment_organic_te[0]
                    : (item.treatment_organic_te?.[0] || item.treatment_organic?.[0])}
                </p>
              </div>

              {item.treatment_chemical && !item.is_healthy && (
                <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-100 text-xs space-y-1">
                  <p className="font-bold text-amber-800 flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>{lang === 'te' ? 'రసాయన మందుల మోతాదు:' : 'Chemical Remedy:'}</span>
                  </p>
                  <p className="text-slate-700 text-[11px] leading-relaxed line-clamp-2">
                    {lang === 'te' && item.treatment_chemical_te?.length
                      ? item.treatment_chemical_te[0]
                      : (item.treatment_chemical_te?.[0] || item.treatment_chemical?.[0])}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{lang === 'te' ? 'తీవ్రత:' : 'Severity:'} <strong className="text-slate-700">{item.severity}</strong></span>
              
              <button
                type="button"
                onClick={() => {
                  const isTe = lang === 'te';
                  const text = isTe
                    ? `పంట: ${item.crop_te || item.crop}. తెగులు: ${item.disease_name_te || item.disease_name}. సేంద్రీయ నివారణ: ${(item.treatment_organic_te || item.treatment_organic || []).slice(0, 2).join('. ')}. రసాయన నివారణ: ${(item.treatment_chemical_te || item.treatment_chemical || []).slice(0, 2).join('. ')}.`
                    : `Crop: ${item.crop}. Condition: ${item.disease_name}. Organic remedy: ${(item.treatment_organic || []).slice(0, 2).join('. ')}. Chemical dosage: ${(item.treatment_chemical || []).slice(0, 2).join('. ')}.`;
                  speakText(text, isTe ? 'te' : 'en');
                }}
                title={lang === 'te' ? 'వాయిస్ ద్వారా వినండి (చదవలేని వారి కోసం)' : 'Listen to Advice (For farmers unable to read)'}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-all shadow-sm active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'te' ? 'వినండి' : 'Listen'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
