import React, { useState } from 'react';
import { useKisan } from '../context/KisanContext';
import { Activity, Gauge, Scale, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { CongestionBadge } from '../components/StatusBadge';

export const OfficerStatusPage: React.FC = () => {
  const { selectedCentre, getCongestionLevel } = useKisan();
  const [avgSpeed, setAvgSpeed] = useState<number>(selectedCentre.avgProcessingMinutes || 4);

  const congestion = getCongestionLevel(selectedCentre.waitingCount);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Procurement Centre Operational Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor Mandi throughput, weighbridge capacity, and configure smart ETA parameters.
        </p>
      </div>

      {/* Centre Status Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{selectedCentre.name}</h3>
            <p className="text-xs text-slate-500">{selectedCentre.location} • APMC Code: {selectedCentre.code}</p>
          </div>
          <CongestionBadge level={congestion} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 uppercase">Operational State</span>
            <p className="text-lg font-black text-emerald-700 mt-1 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Operating Normally
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">All 3 weighbridges functional</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 uppercase">Live Queue Congestion</span>
            <p className="text-lg font-black text-slate-900 mt-1">
              {selectedCentre.waitingCount} Farmers Waiting
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Threshold: ≤15 Low, ≤40 Mod</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 uppercase">Today's Intake</span>
            <p className="text-lg font-black text-blue-700 mt-1">
              {selectedCentre.completedCount} Vehicles Completed
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Estimated 875 Quintals</p>
          </div>
        </div>

        {/* Dynamic Throughput Pace Configuration */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-700" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Average Processing Pace per Vehicle</h4>
                <p className="text-xs text-slate-600">
                  Directly modulates the 🧠 Smart ETA calculation displayed on farmer devices.
                </p>
              </div>
            </div>
            <span className="text-2xl font-black text-blue-900 font-mono">{avgSpeed} mins</span>
          </div>

          <input
            type="range"
            min={2}
            max={10}
            value={avgSpeed}
            onChange={e => setAvgSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
            <span>2 mins (Fast / High staff)</span>
            <span>4 mins (Default Standard)</span>
            <span>10 mins (Delayed / Heavy testing)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
