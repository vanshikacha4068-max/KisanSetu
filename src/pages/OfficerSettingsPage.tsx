import React from 'react';
import { useKisan } from '../context/KisanContext';
import { Building2, ShieldCheck, User, Bell, RotateCcw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OfficerSettingsPage: React.FC = () => {
  const { officer, selectedCentre, resetDemo, setRole } = useKisan();
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole('guest');
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Officer Portal Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Government Mandi Superintendent profile and terminal configurations.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-3xl bg-blue-700 text-white font-black text-2xl flex items-center justify-center shadow-md">
            RS
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{officer.name}</h2>
            <p className="text-xs text-slate-500">
              Officer ID: <strong className="text-slate-800 font-mono">{officer.officerId}</strong> • {officer.designation}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Assigned to: {selectedCentre.name}</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900">Terminal Configuration</h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">APMC Mandi Yard:</span>
              <strong className="text-slate-800 font-bold">{selectedCentre.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Terminal Gate Counter:</span>
              <strong className="text-slate-800 font-bold">Counter #2 (Tractor Entry)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">e-NAM Sync:</span>
              <strong className="text-emerald-700 font-bold">🟢 Connected & Synchronized</strong>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={resetDemo}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Entire Demonstration State</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Officer Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
