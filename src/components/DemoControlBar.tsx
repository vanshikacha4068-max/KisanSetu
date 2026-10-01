import React from 'react';
import { useKisan } from '../context/KisanContext';
import { RotateCcw, User, Building2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoControlBar: React.FC = () => {
  const { role, setRole, resetDemo, callNextToken, currentToken } = useKisan();
  const navigate = useNavigate();

  const handleSwitchToFarmer = () => {
    setRole('farmer');
    navigate('/dashboard');
  };

  const handleSwitchToOfficer = () => {
    setRole('officer');
    navigate('/officer');
  };

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 px-4 py-2 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Live Demo Mode Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold tracking-wider text-emerald-400 uppercase text-[11px]">
            Live Demo Mode
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300">
            Real-Time Cross-Tab Queue Active: <strong className="text-white">#{currentToken}</strong>
          </span>
        </div>

        {/* Center / Right: Quick Switchers & Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Quick Farmer Switch */}
          <button
            onClick={handleSwitchToFarmer}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all text-xs ${
              role === 'farmer'
                ? 'bg-kisan-600 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>👨🌾 Farmer (Ramesh)</span>
          </button>

          {/* Quick Officer Switch */}
          <button
            onClick={handleSwitchToOfficer}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all text-xs ${
              role === 'officer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>🏢 Officer (Rajesh)</span>
          </button>

          {/* Instant Call Next trigger */}
          <button
            onClick={callNextToken}
            title="Advance Queue by 1 Token (broadcasts live across all tabs)"
            className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Call Next</span>
            <span className="sm:hidden">Next</span>
          </button>

          {/* Demo Reset Button */}
          <button
            onClick={resetDemo}
            title="Reset queue, Ramesh's token & procurement status to original state"
            className="px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 font-bold flex items-center gap-1.5 transition-all hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
