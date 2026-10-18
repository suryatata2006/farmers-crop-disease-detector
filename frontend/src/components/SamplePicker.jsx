import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export default function SamplePicker({ onSelectSample, selectedSampleName, lang }) {
  const samples = [
    {
      id: 'tomato_early_blight',
      filename: 'tomato_early_blight.jpg',
      crop: lang === 'te' ? 'టొమాటో' : 'Tomato',
      condition: lang === 'te' ? 'ముందస్తు ఎండు తెగులు' : 'Early Blight',
      status: 'diseased',
      imgUrl: '/samples/tomato_early_blight.jpg'
    },
    {
      id: 'tomato_late_blight',
      filename: 'tomato_late_blight.jpg',
      crop: lang === 'te' ? 'టొమాటో' : 'Tomato',
      condition: lang === 'te' ? 'లేట్ బ్లైట్ తెగులు' : 'Late Blight',
      status: 'diseased',
      imgUrl: '/samples/tomato_late_blight.jpg'
    },
    {
      id: 'tomato_healthy',
      filename: 'tomato_healthy.jpg',
      crop: lang === 'te' ? 'టొమాటో' : 'Tomato',
      condition: lang === 'te' ? 'ఆరోగ్యకరమైన ఆకు' : 'Healthy Leaf',
      status: 'healthy',
      imgUrl: '/samples/tomato_healthy.jpg'
    },
    {
      id: 'potato_early_blight',
      filename: 'potato_early_blight.jpg',
      crop: lang === 'te' ? 'బంగాళాదుంప' : 'Potato',
      condition: lang === 'te' ? 'ఆల్టర్నేరియా తెగులు' : 'Early Blight',
      status: 'diseased',
      imgUrl: '/samples/potato_early_blight.jpg'
    },
    {
      id: 'corn_common_rust',
      filename: 'corn_common_rust.jpg',
      crop: lang === 'te' ? 'మొక్కజొన్న' : 'Corn (Maize)',
      condition: lang === 'te' ? 'కుంకుమ తెగులు (రస్ట్)' : 'Common Rust',
      status: 'diseased',
      imgUrl: '/samples/corn_common_rust.jpg'
    }
  ];

  const handlePick = async (sample) => {
    try {
      const response = await fetch(sample.imgUrl);
      const blob = await response.blob();
      const file = new File([blob], sample.filename, { type: 'image/jpeg' });
      onSelectSample(file, sample.imgUrl, sample.id);
    } catch (err) {
      console.error('Error loading sample image:', err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          {lang === 'te' ? 'తక్షణ పరీక్ష కోసం నమూనా ఆకులు (1-క్లిక్ టెస్ట్)' : 'Instant Test Samples (1-Click Evaluation)'}
        </h4>
        <span className="text-[11px] text-slate-500 font-medium">
          {lang === 'te' ? 'ఏదైనా కార్డును క్లిక్ చేయండి' : 'Click any card to load'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {samples.map((s) => {
          const isSelected = selectedSampleName === s.id;
          return (
            <div
              key={s.id}
              onClick={() => handlePick(s)}
              className={`group relative rounded-2xl p-2.5 cursor-pointer border transition-all duration-200 text-left bg-white hover:shadow-md ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/30 bg-emerald-50/40'
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-100">
                <img
                  src={s.imgUrl}
                  alt={s.condition}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span
                  className={`absolute top-1.5 right-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    s.status === 'healthy'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {s.status === 'healthy' ? (lang === 'te' ? 'ఆరోగ్యం' : 'Healthy') : (lang === 'te' ? 'తెగులు' : 'Infected')}
                </span>
                {isSelected && (
                  <div className="absolute inset-0 bg-emerald-600/30 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">{s.crop}</p>
                <p className="text-xs font-bold text-slate-800 truncate" title={s.condition}>
                  {s.condition}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
