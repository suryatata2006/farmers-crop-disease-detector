import React from 'react';
import { 
  Sprout, 
  Scan, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Camera, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Leaf, 
  Languages, 
  Volume2, 
  Phone,
  Layers
} from 'lucide-react';
import { translations } from '../i18n';

export default function Home({ setCurrentTab, lang, onTrySample }) {
  const t = translations[lang].home;

  const samples = [
    {
      id: 'tomato_early_blight',
      filename: 'tomato_early_blight.jpg',
      crop: lang === 'te' ? 'టొమాటో' : 'Tomato',
      condition: lang === 'te' ? 'ముందస్తు ఎండు తెగులు' : 'Early Blight',
      status: 'diseased',
      imgUrl: '/samples/tomato_early_blight.jpg',
      desc: lang === 'te' 
        ? 'ఆకులపై వలయాకారపు నల్లని మచ్చలు, పసుపు రంగు మార్పు మరియు ఆకులు రాలిపోవడం.' 
        : 'Dark concentric target spots, leaf chlorosis, and premature defoliation caused by Alternaria solani.'
    },
    {
      id: 'corn_common_rust',
      filename: 'corn_common_rust.jpg',
      crop: lang === 'te' ? 'మొక్కజొన్న' : 'Corn (Maize)',
      condition: lang === 'te' ? 'కుంకుమ తెగులు (రస్ట్)' : 'Common Rust',
      status: 'diseased',
      imgUrl: '/samples/corn_common_rust.jpg',
      desc: lang === 'te'
        ? 'ఆకుల రెండు వైపులా కనిపించే ఎర్రటి లేదా ఇటుక రంగు పొడి బుడిపెలు.'
        : 'Powdery golden-brown to brick-red pustules erupting across both upper and lower leaf surfaces.'
    },
    {
      id: 'potato_early_blight',
      filename: 'potato_early_blight.jpg',
      crop: lang === 'te' ? 'బంగాళాదుంప' : 'Potato',
      condition: lang === 'te' ? 'ఆల్టర్నేరియా తెగులు' : 'Early Blight',
      status: 'diseased',
      imgUrl: '/samples/potato_early_blight.jpg',
      desc: lang === 'te'
        ? 'ఆకుల ఈనెల మధ్య ఏర్పడే గోధుమ రంగు కోణీయ మచ్చలు మరియు మొక్కల క్షీణత.'
        : 'Brown angular necrotic lesions bounded by leaf veins that enlarge and trigger foliage wilting.'
    },
    {
      id: 'tomato_healthy',
      filename: 'tomato_healthy.jpg',
      crop: lang === 'te' ? 'టొమాటో' : 'Tomato',
      condition: lang === 'te' ? 'ఆరోగ్యకరమైన పైరు' : 'Healthy Plant',
      status: 'healthy',
      imgUrl: '/samples/tomato_healthy.jpg',
      desc: lang === 'te'
        ? 'ఎటువంటి తెగుళ్లు లేదా శిలీంధ్ర మచ్చలు లేని ఆరోగ్యకరమైన పచ్చని పంట ఆకు.'
        : 'Robust, disease-free green foliage with clear vein architecture and optimal chlorophyll production.'
    },
    {
      id: 'tomato_late_blight',
      filename: 'tomato_late_blight.jpg',
      crop: lang === 'te' ? 'టొమాటో' : 'Tomato',
      condition: lang === 'te' ? 'లేట్ బ్లైట్ తెగులు' : 'Late Blight',
      status: 'diseased',
      imgUrl: '/samples/tomato_late_blight.jpg',
      desc: lang === 'te'
        ? 'తేమతో కూడిన ముదురు బూడిద రంగు నీటి మచ్చలు మరియు ఆకుల అడుగున తెల్లని బూజు.'
        : 'Water-soaked dark gray lesions with delicate white fungal mold forming on the leaf underside.'
    }
  ];

  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-emerald-600" />,
      title: t.f1Title,
      desc: t.f1Desc
    },
    {
      icon: <Camera className="w-6 h-6 text-emerald-600" />,
      title: t.f2Title,
      desc: t.f2Desc
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-emerald-600" />,
      title: t.f3Title,
      desc: t.f3Desc
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: t.f4Title,
      desc: t.f4Desc
    },
    {
      icon: <Languages className="w-6 h-6 text-emerald-600" />,
      title: t.f5Title,
      desc: t.f5Desc
    },
    {
      icon: <Volume2 className="w-6 h-6 text-emerald-600" />,
      title: t.f6Title,
      desc: t.f6Desc
    }
  ];

  const steps = [
    {
      num: "01",
      icon: <UploadCloud className="w-6 h-6 text-emerald-600" />,
      title: t.step1Title,
      desc: t.step1Desc
    },
    {
      num: "02",
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
      title: t.step2Title,
      desc: t.step2Desc
    },
    {
      num: "03",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: t.step3Title,
      desc: t.step3Desc
    }
  ];

  const handleSampleClick = (sample) => {
    if (onTrySample) {
      onTrySample(sample);
    } else {
      setCurrentTab('detect');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section 
        id="hero"
        className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home-bg.jpg')" }}
      >
        {/* Cinematic dark green overlay for 100% text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-emerald-950/75 to-emerald-950/90 backdrop-blur-[0.5px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.16]">
            {t.heroTitle1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300">
              {t.heroTitle2}
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => {
                setCurrentTab('detect');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              <Scan className="w-5 h-5 text-emerald-950" />
              <span>{t.ctaDetect}</span>
              <ArrowRight className="w-4 h-4 text-emerald-950" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('demo-samples');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-white/95 hover:bg-white text-slate-800 font-extrabold text-sm sm:text-base rounded-2xl border border-white/60 shadow-lg backdrop-blur-md hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.ctaDemo}</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto border-t border-emerald-500/25 text-left">
            <div className="flex items-center gap-3 bg-emerald-900/40 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/20">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-white">{t.trust1}</p>
                <p className="text-[11px] text-emerald-200/70 truncate">{t.trust1Sub}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-emerald-900/40 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/20">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-white">{t.trust2}</p>
                <p className="text-[11px] text-emerald-200/70 truncate">{t.trust2Sub}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-emerald-900/40 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/20">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-white">{t.trust3}</p>
                <p className="text-[11px] text-emerald-200/70 truncate">{t.trust3Sub}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <span className="text-xs font-black text-emerald-800 tracking-wider uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block">
            {t.howItWorksBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.howItWorksTitle}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm md:text-base">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s, idx) => (
            <div 
              key={idx}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {s.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-black text-slate-200 group-hover:text-emerald-200 transition-colors">
                  {s.num}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DEMO SAMPLES SECTION */}
      <section id="demo-samples" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <span className="text-xs font-black text-emerald-800 tracking-wider uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block">
            {t.samplesBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.samplesTitle}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {t.samplesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {samples.map((s) => (
            <div 
              key={s.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image Preview with Status Badge */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img 
                  src={s.imgUrl} 
                  alt={s.condition} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span 
                  className={`absolute top-2.5 right-2.5 text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md ${
                    s.status === 'healthy' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {s.status === 'healthy' ? (lang === 'te' ? 'ఆరోగ్యం' : 'Healthy') : (lang === 'te' ? 'తెగులు' : 'Infected')}
                </span>
                <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                  {s.crop}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {s.condition}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {s.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSampleClick(s)}
                  className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs rounded-xl transition-all border border-emerald-200/80 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow"
                >
                  <span>{t.trySampleBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <span className="text-xs font-black text-emerald-800 tracking-wider uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block">
            {t.featuresBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.featuresTitle}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3.5 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'te' ? 'పూర్తిగా సపోర్ట్ చేయబడింది' : 'Fully Supported'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. KISAN CALL CENTER HELPLINE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/40">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <Phone className="w-7 h-7 text-emerald-300 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black">
                {lang === 'te' ? 'ప్రభుత్వ కిసాన్ కాల్ సెంటర్ ఉచిత సేవలు' : 'National Toll-Free Kisan Call Center'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
                {lang === 'te'
                  ? 'మీ సందేహాల నివృత్తి కోసం శాస్త్రవేత్తలతో ఉచితంగా తెలుగులో మాట్లాడండి: ఉదయం 6 నుండి రాత్రి 10 వరకు.'
                  : 'Get immediate free telephone agricultural advice from scientists daily (6 AM - 10 PM) in all Indian languages.'}
              </p>
            </div>
          </div>

          <a
            href="tel:18001801551"
            className="shrink-0 px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-base sm:text-lg rounded-2xl shadow-lg transition-all flex items-center gap-2 hover:scale-105"
          >
            <Phone className="w-5 h-5 text-emerald-700" />
            <span>1800-180-1551</span>
          </a>
        </div>
      </section>

    </div>
  );
}
