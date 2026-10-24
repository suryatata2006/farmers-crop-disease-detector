import React from 'react';
import { 
  Sprout, 
  Scan, 
  ShieldCheck, 
  BookOpen, 
  Phone, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  Leaf,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { translations } from '../i18n';

export default function Home({ setCurrentTab, lang }) {
  const t = translations[lang].home;

  const steps = [
    {
      num: "01",
      icon: <Camera className="w-6 h-6 text-emerald-600" />,
      title: lang === 'te' ? "ఆకు ఫోటో తీయండి" : "Snap or Upload Photo",
      desc: lang === 'te' 
        ? "మొబైల్ కెమెరాతో లేదా ఫోన్ గ్యాలరీ నుండి తెగులు సోకిన పంట ఆకు ఫోటో తీయండి." 
        : "Capture with your phone camera or upload a clear photo of the symptomatic leaf."
    },
    {
      num: "02",
      icon: <Scan className="w-6 h-6 text-emerald-600" />,
      title: lang === 'te' ? "AI తక్షణ విశ్లేషణ" : "Deep Learning Analysis",
      desc: lang === 'te'
        ? "మచ్చలు, నెక్రోసిస్ మరియు శిలీంధ్ర లక్షణాలను మోడల్ సెకన్ల వ్యవధిలో లెక్కిస్తుంది."
        : "MobileNetV2 scans cellular leaf patterns and matches against 38 plant disease categories."
    },
    {
      num: "03",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: lang === 'te' ? "నివారణ & మందుల వివరాలు" : "Actionable Treatment Plan",
      desc: lang === 'te'
        ? "సేంద్రీయ వేప మందులు, ఆమోదిత రసాయన మోతాదులు మరియు సంరక్షణ పద్ధతులు పొందండి."
        : "Receive practical organic remedies, verified chemical fungicide dosages, and prevention tips."
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-16 bg-gradient-to-b from-emerald-50/70 via-white to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 bg-white border border-emerald-200/80 text-emerald-900 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                <img src="/logo-icon.png" alt="Logo" className="w-5 h-5 object-contain" />
                <span>{t.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {t.heroTitle1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700">
                  {t.heroTitle2}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentTab('detect')}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <Scan className="w-5 h-5" />
                  <span>{t.ctaDetect}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentTab('detect')}
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base rounded-2xl border border-slate-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  <span>{t.ctaDemo}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-black text-emerald-700">38+</p>
                  <p className="text-xs font-semibold text-slate-500">
                    {lang === 'te' ? 'పంట తెగుళ్లు' : 'Disease Classes'}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-700">&lt; 1 sec</p>
                  <p className="text-xs font-semibold text-slate-500">
                    {lang === 'te' ? 'వేగవంతమైన ఫలితం' : 'Inference Speed'}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-700">100%</p>
                  <p className="text-xs font-semibold text-slate-500">
                    {lang === 'te' ? 'రైతులకు ఉచితం' : 'Free for Farmers'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Interactive Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-green-600 rounded-3xl blur-2xl opacity-20 transform -rotate-1"></div>
                
                <div className="relative bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden p-6 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-bold text-slate-700">
                        {lang === 'te' ? 'ప్రత్యక్ష AI ప్రదర్శన' : 'Live Diagnosis Preview'}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                      MobileNetV2 95.4%
                    </span>
                  </div>

                  {/* Leaf Sample Graphic with Scanner Overlay */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                    <img 
                      src="/samples/tomato_early_blight.jpg" 
                      alt="Sample infected leaf" 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="scanner-beam"></div>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                      {lang === 'te' ? 'టొమాటో ఆకు స్కాన్' : 'Tomato Leaf Scan'}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow-lg">
                      83.9% Match
                    </div>
                  </div>

                  {/* Mini Diagnostic Pill Breakdown */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-semibold">{lang === 'te' ? 'గుర్తించిన తెగులు:' : 'Diagnosed:'}</span>
                      <span className="font-extrabold text-slate-800">Tomato Early Blight</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-semibold">{lang === 'te' ? 'లక్షణ తీవ్రత:' : 'Severity:'}</span>
                      <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                        Moderate
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500 font-semibold">{lang === 'te' ? 'సిఫార్సు మందు:' : 'Top Remedy:'}</span>
                      <span className="font-bold text-emerald-700">Neem Oil (5ml/L) + Mancozeb</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentTab('detect')}
                    className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-bold rounded-xl transition-all border border-emerald-200 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'te' ? 'మీ స్వంత పంటను పరీక్షించండి' : 'Test Your Own Crop'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works 3 Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-black text-emerald-700 tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-full">
            {lang === 'te' ? 'సులభమైన 3 దశలు' : '3 Simple Steps'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'te' ? 'కృషిసేవ ఎలా పనిచేస్తుంది?' : 'How KrishiSeva Works in the Field'}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            {lang === 'te' 
              ? 'సాంకేతిక పరిజ్ఞానం అవసరం లేకుండా ప్రతి రైతు సులభంగా ఉపయోగించే విధంగా రూపొందించబడింది.' 
              : 'Zero technical complexity. Designed for quick decisions right from the farm field.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <div 
              key={idx}
              className="relative bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {s.icon}
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-200 transition-colors">
                  {s.num}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Crops Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-green-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {t.cropsSupportedTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {t.cropsSupportedSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs font-bold text-emerald-300">🍅 {lang === 'te' ? 'టొమాటో' : 'Tomato'}</span>
              <p className="text-xs text-slate-200">{t.tomato}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs font-bold text-emerald-300">🥔 {lang === 'te' ? 'బంగాళాదుంప' : 'Potato'}</span>
              <p className="text-xs text-slate-200">{t.potato}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs font-bold text-emerald-300">🌽 {lang === 'te' ? 'మొక్కజొన్న' : 'Corn / Maize'}</span>
              <p className="text-xs text-slate-200">{t.corn}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs font-bold text-emerald-300">🌶️ {lang === 'te' ? 'మిర్చి' : 'Bell Pepper / Chilli'}</span>
              <p className="text-xs text-slate-200">{t.pepper}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs font-bold text-emerald-300">🍏 {lang === 'te' ? 'ఆపిల్ & ఇతరాలు' : 'Apple & Others'}</span>
              <p className="text-xs text-slate-200">{t.apple}</p>
            </div>
            <div className="bg-emerald-600/40 p-4 rounded-2xl border border-emerald-400/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">{lang === 'te' ? 'మరిన్ని పంటల కోసం' : 'Explore All Diseases'}</p>
                <p className="text-[11px] text-emerald-200">{lang === 'te' ? 'గ్రంథాలయాన్ని సందర్శించండి' : 'Open Crop Library'}</p>
              </div>
              <button
                onClick={() => setCurrentTab('diseases')}
                className="px-3 py-1.5 bg-white text-emerald-900 text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                {lang === 'te' ? 'చూడండి' : 'Browse'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Kisan Call Center Helpline Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Phone className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {lang === 'te' ? 'ప్రభుత్వ కిసాన్ కాల్ సెంటర్ ఉచిత సేవలు' : 'National Toll-Free Kisan Call Center'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === 'te'
                  ? 'మీ సందేహాల నివృత్తి కోసం శాస్త్రవేత్తలతో ఉచితంగా తెలుగులో మాట్లాడండి: ఉదయం 6 నుండి రాత్రి 10 వరకు.'
                  : 'Get immediate free telephone agricultural advice from scientists daily (6 AM - 10 PM) in all Indian languages.'}
              </p>
            </div>
          </div>
          <a
            href="tel:18001801551"
            className="shrink-0 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            <span>1800-180-1551</span>
          </a>
        </div>
      </section>
    </div>
  );
}
