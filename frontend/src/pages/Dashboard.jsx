import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Scan, 
  Calendar, 
  RefreshCw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { translations } from '../i18n';

export default function Dashboard({ setCurrentTab, lang }) {
  const t = translations[lang].dashboard;

  const [scans, setScans] = useState([]);
  const [stats, setStats] = useState({
    total_scans: 0,
    healthy_scans: 0,
    diseased_scans: 0,
    common_crops: {},
    common_diseases: {}
  });
  const [loading, setLoading] = useState(true);

  const fetchHistoryAndStats = async () => {
    setLoading(true);
    try {
      const [histRes, statsRes] = await Promise.all([
        fetch('/api/history'),
        fetch('/api/stats')
      ]);

      if (histRes.ok) {
        const histData = await histRes.json();
        setScans(histData);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryAndStats();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      const res = await fetch(`/api/history/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setScans(scans.filter(s => s.id !== id));
        fetchHistoryAndStats();
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchHistoryAndStats}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{lang === 'te' ? 'తాజాకరించు' : 'Refresh'}</span>
          </button>

          <button
            onClick={() => setCurrentTab('detect')}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>{lang === 'te' ? 'కొత్త ఆకును స్కాన్ చేయి' : 'New Scan'}</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Scans */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.totalScans}</p>
            <p className="text-3xl font-black text-slate-900">{stats.total_scans}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Healthy Crops */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.healthyScans}</p>
            <p className="text-3xl font-black text-emerald-600">{stats.healthy_scans}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Diseased Crops */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.diseasedScans}</p>
            <p className="text-3xl font-black text-rose-600">{stats.diseased_scans}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Health Ratio */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider">{t.ratio}</span>
            <span className="font-black text-emerald-700">
              {stats.total_scans > 0 ? Math.round((stats.healthy_scans / stats.total_scans) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
            <div 
              className="bg-emerald-500 h-full"
              style={{ width: `${stats.total_scans > 0 ? (stats.healthy_scans / stats.total_scans) * 100 : 0}%` }}
            ></div>
            <div 
              className="bg-rose-500 h-full"
              style={{ width: `${stats.total_scans > 0 ? (stats.diseased_scans / stats.total_scans) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400">
            {stats.healthy_scans} Healthy • {stats.diseased_scans} Infected
          </p>
        </div>
      </div>

      {/* Recent Scans Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span>{t.recentScans}</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {scans.length} {lang === 'te' ? 'రికార్డులు ఉన్నాయి' : 'records logged'}
          </span>
        </div>

        {scans.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Scan className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-800">{t.noScansTitle}</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">{t.noScansDesc}</p>
            </div>
            <button
              onClick={() => setCurrentTab('detect')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2"
            >
              <Scan className="w-4 h-4" />
              <span>{lang === 'te' ? 'మొదటి ఆకును పరీక్షించండి' : 'Start First Scan'}</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-200/70 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">{t.scanId}</th>
                  <th className="py-3.5 px-6">{lang === 'te' ? 'ఆకు నమూనా' : 'Leaf Specimen'}</th>
                  <th className="py-3.5 px-6">{lang === 'te' ? 'పంట & తెగులు' : 'Crop & Condition'}</th>
                  <th className="py-3.5 px-6">{lang === 'te' ? 'విశ్వసనీయత' : 'Confidence'}</th>
                  <th className="py-3.5 px-6">{t.date}</th>
                  <th className="py-3.5 px-6 text-right">{t.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scans.map((scan) => {
                  const isHealthy = scan.predicted_disease.toLowerCase().includes('healthy');
                  return (
                    <tr key={scan.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-500 font-bold">
                        #{scan.id}
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={scan.image_url}
                            alt={scan.crop_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/samples/tomato_early_blight.jpg';
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                            {scan.crop_name}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isHealthy ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                          }`}>
                            {isHealthy ? (lang === 'te' ? 'ఆరోగ్యం' : 'Healthy') : (lang === 'te' ? 'వ్యాధి' : 'Infected')}
                          </span>
                        </div>
                        <p className="font-extrabold text-slate-800 text-sm">
                          {scan.predicted_disease}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 text-xs">
                          {scan.confidence}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {formatDate(scan.created_at)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(scan.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title={t.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
