import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, AlertCircle } from 'lucide-react';

export default function VoiceAssistant({ onTranscript, lang = 'en', isListening, setIsListening }) {
  const [isSupported, setIsSupported] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    // Set language: Telugu (te-IN) or Indian English (en-IN)
    recognition.lang = lang === 'te' ? 'te-IN' : 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && onTranscript) {
        onTranscript(transcript);
      }
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setSpeechError(
          lang === 'te'
            ? 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ అనుమతించండి.'
            : 'Microphone permission denied. Please allow microphone in browser.'
        );
      } else if (event.error === 'no-speech') {
        setSpeechError(
          lang === 'te'
            ? 'మాటలు వినిపించలేదు. దయచేసి మళ్లీ మైక్ నొక్కి మాట్లాడండి.'
            : 'No speech detected. Please tap mic and try again.'
        );
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [lang]);

  const toggleListening = () => {
    if (!isSupported) {
      alert(
        lang === 'te'
          ? 'మీ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ అందుబాటులో లేదు. దయచేసి క్రోమ్ లేదా ఎడ్జ్ బ్రౌజర్ వాడండి.'
          : 'Voice recognition is not supported in this browser. Please use Chrome or Edge.'
      );
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
    } else {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = lang === 'te' ? 'te-IN' : 'en-IN';
          recognitionRef.current.start();
        }
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleListening}
        title={
          isListening
            ? lang === 'te' ? 'వినడం ఆపండి' : 'Stop Listening'
            : lang === 'te' ? 'వాయిస్ ద్వారా అడగండి (మైక్)' : 'Ask with Voice (Mic)'
        }
        className={`relative p-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center shadow-md ${
          isListening
            ? 'bg-rose-600 text-white shadow-rose-600/40 animate-pulse ring-4 ring-rose-400/30'
            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-105 active:scale-95'
        }`}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </>
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>

      {/* Floating Error Notice */}
      {speechError && (
        <div className="absolute bottom-full mb-2 right-0 w-64 p-2.5 bg-rose-900 text-rose-100 text-[11px] rounded-xl shadow-lg border border-rose-700 z-50 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
          <p>{speechError}</p>
        </div>
      )}
    </div>
  );
}

// Global text-to-speech helper
export function speakText(text, lang = 'en') {
  if (!('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    // Clean markdown asterisks and bullet symbols for natural audio speech
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/•/g, '')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'te' ? 'te-IN' : 'en-IN';
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
