import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Leaf, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  RefreshCw,
  HelpCircle,
  Radio,
  User,
  Activity
} from 'lucide-react';
import { translations } from '../i18n';
import VoiceAssistant, { speakText, stopSpeaking } from '../components/VoiceAssistant';

export default function ChatPage({ lang, setCurrentTab }) {
  const t = translations[lang].chat || {};
  const messagesEndRef = useRef(null);

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'te'
        ? 'నమస్కారం రైతు సోదరులారా! నేను మీ కృషి మిత్ర AI సహాయకుడిని. మీ పంటకు సోకిన తెగులు లక్షణాలు, ఆకులపై మచ్చలు లేదా రసాయన మందుల మోతాదుల గురించి అడగండి. మీరు మైక్ నొక్కి నోటితో మాట్లాడి కూడా ప్రశ్నలు అడగవచ్చు!'
        : 'Hello Farmer! I am your Krishi Mitra AI Assistant. Ask me about crop diseases, leaf symptoms, approved chemicals, exact dosages, and organic remedies. You can also tap the microphone to speak your question directly!',
      diagnosis: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const suggestedQuestions = lang === 'te' ? [
    'టమోటా ఆకులపై నల్లటి వలయాల మచ్చలు వచ్చాయి, ఏ మందు చల్లాలి?',
    'బంగాళాదుంప ఆకులు నీరు పట్టినట్లు నల్లగా కుళ్ళిపోతున్నాయి',
    'టమోటాలో ఆకు ముడుత మరియు తెల్లదోమ నివారణకు ఏ రసాయనం వాడాలి?',
    'మాంకోజెబ్ మరియు రిడోమిల్ మందుల ఖచ్చితమైన మోతాదు ఎంత?',
    'మొక్కజొన్న ఆకులపై ఎర్రటి కుంకుమ పొక్కులు వచ్చాయి'
  ] : [
    'Tomato leaves have brown circular spots with concentric rings',
    'Potato leaves turning black and water-soaked in humid fog',
    'What chemical controls tomato whitefly and yellow leaf curl?',
    'What is the exact dosage of Mancozeb and Ridomil per pump?',
    'Corn leaves have reddish cinnamon rust powder on both sides'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: lang,
        }),
      });

      if (!res.ok) throw new Error('Failed to get answer');
      const data = await res.json();

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply,
        diagnosis: data.diagnosis,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botReply]);

      if (autoSpeak) {
        speakText(data.reply, lang);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: lang === 'te'
          ? 'సమాధానం పొందడంలో సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి లేదా కిసాన్ కాల్ సెంటర్ 1800-180-1551 కి కాల్ చేయండి.'
          : 'Failed to fetch advisory response. Please try again or call Kisan Call Center 1800-180-1551.',
        diagnosis: null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceTranscript = (transcript) => {
    setInputMessage(transcript);
    handleSendMessage(transcript);
  };

  const handleSpeak = (text) => {
    speakText(text, lang);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-700/70 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
              <Bot className="w-4 h-4 text-emerald-300" />
              <span>{lang === 'te' ? 'రైతు మిత్ర వాయిస్ అసిస్టెంట్' : 'Krishi Mitra Voice Agronomist'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {lang === 'te' ? 'మీ సందేహాలను అడగండి - తక్షణ AI సమాధానం' : 'Ask Any Crop Doubt with AI & Voice'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              {lang === 'te'
                ? 'పంట తెగులు లక్షణాలు చెప్పగానే కనీసం 75% ఖచ్చితత్వంతో వ్యాధిని గుర్తించి, పిచికారీ చేయాల్సిన రసాయన మందుల మోతాదులను తెలుపుతుంది.'
                : 'Describe leaf symptoms to receive verified disease diagnosis with 75%+ confidence and approved chemical fungicide dosages.'}
            </p>
          </div>

          {/* Quick Voice Mode Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
                autoSpeak
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-md'
                  : 'bg-emerald-950/40 text-emerald-200 border-emerald-700/60 hover:bg-emerald-950/70'
              }`}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{lang === 'te' ? 'స్వరంతో చదువు (Auto Speak): ' + (autoSpeak ? 'ఆన్' : 'ఆఫ్') : 'Voice Readout: ' + (autoSpeak ? 'ON' : 'OFF')}</span>
            </button>

            <a
              href="tel:18001801551"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-white/20 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>1800-180-1551</span>
            </a>
          </div>
        </div>
      </div>

      {/* Suggested 1-Tap Farmer Doubts */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          {lang === 'te' ? 'రైతులు ఎక్కువగా అడిగే ప్రశ్నలు (1-క్లిక్ ద్వారా అడగండి):' : 'Frequently Asked Doubts (Click to Ask):'}
        </p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sq)}
              className="text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-semibold px-3 py-2 rounded-xl border border-slate-200/80 shadow-sm transition-all hover:border-emerald-300 text-left"
            >
              🌱 {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col h-[580px]">
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isUser
                      ? 'bg-slate-800 text-white'
                      : 'bg-gradient-to-br from-emerald-500 to-green-700 text-white shadow-emerald-500/20'
                  }`}
                >
                  {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2 max-w-[85%]">
                  <div
                    className={`rounded-3xl p-4 sm:p-5 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    {/* Bot Voice Player Button */}
                    {!isUser && (
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60">
                        <span className="text-[11px] font-black uppercase text-emerald-800 tracking-wider flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-emerald-600" />
                          {lang === 'te' ? 'కృషి మిత్ర AI' : 'Krishi Mitra AI'}
                        </span>
                        <button
                          onClick={() => handleSpeak(msg.text)}
                          title="Listen to response"
                          className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-slate-200/80 flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{lang === 'te' ? 'వినండి' : 'Listen'}</span>
                        </button>
                      </div>
                    )}

                    {/* Formatted Text */}
                    <div className="whitespace-pre-wrap font-normal">
                      {msg.text}
                    </div>

                    {/* Structured Visual Diagnosis Card */}
                    {msg.diagnosis && (
                      <div className="mt-4 p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            {lang === 'te' ? msg.diagnosis.crop_te : msg.diagnosis.crop}
                          </span>
                          <span className="bg-emerald-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {msg.diagnosis.confidence}% {lang === 'te' ? 'ఖచ్చితత్వం' : 'Accuracy'}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500 font-semibold">{lang === 'te' ? 'గుర్తించిన తెగులు:' : 'Identified Pathology:'}</p>
                          <p className="text-base font-extrabold text-slate-900">
                            {lang === 'te' ? msg.diagnosis.disease_te : msg.diagnosis.disease}
                          </p>
                        </div>

                        {/* Approved Chemicals Box */}
                        {msg.diagnosis.chemicals && msg.diagnosis.chemicals.length > 0 && (
                          <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 text-xs space-y-1.5">
                            <p className="font-bold text-amber-900 flex items-center gap-1.5">
                              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                              <span>{lang === 'te' ? 'సిఫార్సు రసాయన మందుల మోతాదు:' : 'Approved Chemical Dilution:'}</span>
                            </p>
                            <ul className="space-y-1 text-slate-800">
                              {msg.diagnosis.chemicals.map((chem, cIdx) => (
                                <li key={cIdx} className="flex items-start gap-2">
                                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0"></span>
                                  <span className="font-semibold">{chem}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <p className={`text-[10px] text-slate-400 font-medium ${isUser ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-md">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-slate-100 p-4 rounded-3xl rounded-tl-none text-xs text-slate-600 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                <span>{lang === 'te' ? 'కృషి మిత్ర విశ్లేషిస్తోంది...' : 'Krishi Mitra analyzing symptoms...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Voice Button */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200/80">
          {/* Active Listening Indicator */}
          {isListening && (
            <div className="mb-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-600 animate-ping" />
                <span className="font-bold">
                  {lang === 'te' ? 'మీరు మాట్లాడుతున్నారు... AI వింటోంది' : 'Listening... Speak your crop doubt now'}
                </span>
              </div>
              <span className="text-[11px] text-rose-600 font-semibold">
                {lang === 'te' ? 'తెలుగు (te-IN)' : 'English (en-IN)'}
              </span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Microphone Assistant */}
            <VoiceAssistant
              lang={lang}
              isListening={isListening}
              setIsListening={setIsListening}
              onTranscript={handleVoiceTranscript}
            />

            {/* Text Input Field */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                lang === 'te'
                  ? 'మీ సందేహాన్ని టైప్ చేయండి లేదా మైక్ నొక్కి మాట్లాడండి...'
                  : 'Type your doubt or tap mic to speak in English/Telugu...'
              }
              className="flex-1 px-4 py-3.5 bg-white rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-inner"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={`p-3.5 rounded-2xl text-white font-bold transition-all shadow-md ${
                !inputMessage.trim() || isLoading
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
