import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CameraCapture({ onCapture, onCancel, lang }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // back camera on mobile by default
  const [isInitializing, setIsInitializing] = useState(true);

  const startCamera = async (mode) => {
    setIsInitializing(true);
    setError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const constraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError(
        lang === 'te'
          ? 'కెమెరా ప్రారంభించడంలో సమస్య ఏర్పడింది. దయచేసి బ్రౌజర్ అనుమతులను తనిఖీ చేయండి లేదా ఫోటోను అప్‌లోడ్ చేయండి.'
          : 'Could not access camera. Please verify camera permissions in your browser or use the file upload option.'
      );
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `leaf_capture_${Date.now()}.jpg`, {
            type: 'image/jpeg',
          });
          onCapture(file, URL.createObjectURL(blob));
        }
      },
      'image/jpeg',
      0.92
    );
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-sm">
            {lang === 'te' ? 'ప్రత్యక్ష కెమెరా స్కానింగ్' : 'Live Camera Leaf Scanner'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCamera}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {lang === 'te' ? 'కెమెరా మార్చు' : 'Flip Camera'}
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold rounded-lg transition-colors border border-rose-500/30"
          >
            {lang === 'te' ? 'రద్దు చేయి' : 'Cancel'}
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-6 text-center space-y-3 bg-rose-950/40 border border-rose-800/60 rounded-2xl">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <p className="text-sm text-rose-200">{error}</p>
          <button
            onClick={onCancel}
            className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all"
          >
            {lang === 'te' ? 'ఫైల్ అప్‌లోడ్‌కు వెళ్లండి' : 'Switch to File Upload'}
          </button>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Scanner Reticle Overlay */}
          <div className="absolute inset-8 border-2 border-dashed border-emerald-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
            <div className="text-center p-3 bg-black/50 backdrop-blur-sm rounded-xl text-xs text-emerald-200">
              {lang === 'te'
                ? 'ఆకును చట్రం మధ్యలో ఉంచండి'
                : 'Center the affected leaf inside the box'}
            </div>
          </div>

          {/* Capture Trigger Button */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button
              onClick={handleCapture}
              className="w-16 h-16 rounded-full bg-emerald-500 border-4 border-white shadow-lg shadow-emerald-500/50 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              title="Take Photo"
            >
              <Camera className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
