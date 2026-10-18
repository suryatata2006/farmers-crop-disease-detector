import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, MessageSquare, Mic, Volume2, Send, Sparkles, CheckCircle2, ShieldAlert, Maximize2 } from 'lucide-react';
import VoiceAssistant, { speakText } from './VoiceAssistant';

export default function ChatWidget({ lang, setCurrentTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'te'
        ? 'నమస్కారం! నేను కృషి మిత్ర AI. మీ పంట తెగులు లేదా రసాయన మందుల మోతాదుల గురించి అడగండి.'
        : 'Hello! I am Krishi Mitra AI. Ask me about leaf diseases, symptoms, or chemical spray dosages.',
      diagnosis: null
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: lang })
      });
      const data = await res.json();
      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply,
        diagnosis: data.diagnosis
      };
      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: lang === 'te' ? 'సమాచారం పొందలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.' : 'Could not reach server. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranscript = (transcript) => {
    setInputMessage(transcript);
    handleSendMessage(transcript);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <div className="hidden sm:block bg-slate-900 text-white text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-emerald-500/30 animate-bounce">
            🎤 {lang === 'te' ? 'రైతు మిత్రతో మాట్లాడండి (Voice AI)' : 'Talk to Krishi Mitra (Voice AI)'}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 text-white shadow-2xl shadow-emerald-600/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white"
            title="Open Krishi Mitra Chat"
          >
            <Bot className="w-7 h-7" />
          </button>
        </div>
      )}

      {/* Floating Interactive Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] sm:max-w-[420px] h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 to-green-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-extrabold text-sm">
                  {lang === 'te' ? 'కృషి మిత్ర AI అసిస్టెంట్' : 'Krishi Mitra AI Assistant'}
                </p>
                <p className="text-[10px] text-emerald-200 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {lang === 'te' ? 'వాయిస్ & ఖచ్చితమైన నిర్ధారణ' : 'Voice & 75%+ Diagnosis'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setCurrentTab('chat');
                }}
                className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-200 hover:text-white transition-colors"
                title="Open Full Page Chat"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-200 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick doubts pills */}
          <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <button
              onClick={() => handleSendMessage(lang === 'te' ? 'టమోటా లేట్ బ్లైట్ మందు ఏమిటి?' : 'Tomato late blight chemical?')}
              className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
            >
              🍅 {lang === 'te' ? 'లేట్ బ్లైట్' : 'Tomato Blight'}
            </button>
            <button
              onClick={() => handleSendMessage(lang === 'te' ? 'మాంకోజెబ్ మోతాదు ఎంత?' : 'Mancozeb dosage per pump?')}
              className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
            >
              🧪 {lang === 'te' ? 'మాంకోజెబ్' : 'Mancozeb'}
            </button>
            <button
              onClick={() => handleSendMessage(lang === 'te' ? 'బంగాళాదుంప ఎండు తెగులు నివారణ?' : 'Potato blight solution?')}
              className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
            >
              🥔 {lang === 'te' ? 'బంగాళాదుంప' : 'Potato'}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-2xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'ml-auto bg-emerald-600 text-white max-w-[85%] rounded-tr-none'
                    : 'mr-auto bg-slate-100 text-slate-800 max-w-[90%] rounded-tl-none border border-slate-200/60'
                }`}
              >
                {m.sender === 'bot' && (
                  <div className="flex justify-between items-center pb-1 mb-1 border-b border-slate-200">
                    <span className="font-bold text-[10px] text-emerald-800">
                      {lang === 'te' ? 'కృషి మిత్ర' : 'Krishi Mitra'}
                    </span>
                    <button
                      onClick={() => speakText(m.text, lang)}
                      className="p-1 hover:bg-white rounded text-emerald-700"
                      title="Speak"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className="whitespace-pre-wrap">{m.text}</div>

                {m.diagnosis && (
                  <div className="mt-2 p-2.5 rounded-xl bg-white border border-emerald-300 text-[11px] space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between font-bold text-emerald-900">
                      <span>{lang === 'te' ? m.diagnosis.disease_te : m.diagnosis.disease}</span>
                      <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[10px]">
                        {m.diagnosis.confidence}%
                      </span>
                    </div>
                    {m.diagnosis.chemicals && m.diagnosis.chemicals.length > 0 && (
                      <p className="text-amber-800 font-semibold bg-amber-50 p-1.5 rounded">
                        🧪 {m.diagnosis.chemicals[0]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="text-[11px] text-slate-400 p-2 italic flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>{lang === 'te' ? 'కృషి మిత్ర విశ్లేషిస్తోంది...' : 'Thinking...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5">
            <VoiceAssistant
              lang={lang}
              isListening={isListening}
              setIsListening={setIsListening}
              onTranscript={handleTranscript}
            />
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={lang === 'te' ? 'ప్రశ్నను టైప్ చేయండి లేదా మైక్ వాడండి...' : 'Type or use mic...'}
              className="flex-1 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 text-white rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
