import React, { useState } from 'react';
import { useKisan } from '../context/KisanContext';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
  Building2,
  AlertCircle,
  FileCheck,
  Scale,
  CreditCard,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { CongestionBadge, QueueStatusBadge } from '../components/StatusBadge';
import { ProcurementStepId } from '../types';

export const OfficerDashboardPage: React.FC = () => {
  const {
    officer,
    selectedCentre,
    queue,
    currentToken,
    callNextToken,
    updateProcurementStep,
    procurement,
    getCongestionLevel,
    resetDemo,
  } = useKisan();

  const congestion = getCongestionLevel(selectedCentre.waitingCount);

  // Active serving item
  const servingItem = queue.find(q => q.status === 'serving') || queue[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* Officer Header (Section 24 Specification) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🏢</span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-800">
              Procurement Officer Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {selectedCentre.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium flex items-center gap-3">
            <span>Officer In-Charge: <strong className="text-white">{officer.name}</strong> ({officer.officerId})</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              🟢 Centre Operating Normally
            </span>
          </p>
        </div>

        {/* Big CALL NEXT Action Hero Box (Section 25 Specification) */}
        <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 flex items-center gap-4 shadow-lg">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400 block">Current Serving</span>
            <span className="text-3xl font-black text-emerald-400 font-mono">#{currentToken}</span>
          </div>

          <button
            onClick={callNextToken}
            className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>CALL NEXT</span>
          </button>
        </div>
      </div>

      {/* Metric Cards (Section 24 Specification) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Today's Capacity"
          value={selectedCentre.capacity}
          subtitle="Max slots for 29 Sept"
          icon={Building2}
          iconBg="bg-slate-100"
          iconColor="text-slate-700"
        />

        <StatCard
          title="Booked"
          value={selectedCentre.bookedCount}
          subtitle="Tokens scheduled"
          icon={Calendar}
          iconBg="bg-blue-50"
          iconColor="text-blue-700"
        />

        <StatCard
          title="Completed"
          value={selectedCentre.completedCount}
          subtitle="Processed & weighed"
          icon={CheckCircle2}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-700"
        />

        <StatCard
          title="Waiting"
          value={selectedCentre.waitingCount}
          subtitle={`Status: ${congestion} Congestion`}
          icon={Users}
          iconBg={congestion === 'LOW' ? 'bg-emerald-50' : congestion === 'MODERATE' ? 'bg-amber-50' : 'bg-rose-50'}
          iconColor={congestion === 'LOW' ? 'text-emerald-700' : congestion === 'MODERATE' ? 'text-amber-700' : 'text-rose-700'}
          accentBorder={true}
        />
      </div>

      {/* Congestion Alert Bar (Section 27 Specification) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {congestion === 'LOW' ? '🟢' : congestion === 'MODERATE' ? '🟡' : '🔴'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Centre Congestion Level:
              </h3>
              <CongestionBadge level={congestion} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Algorithm: Waiting count = {selectedCentre.waitingCount} farmers (≤15 Low, 16–40 Moderate, &gt;40 High).
            </p>
          </div>
        </div>

        <button
          onClick={resetDemo}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demonstration Queue</span>
        </button>
      </div>

      {/* OFFICER PROCUREMENT STATUS CONTROL PANEL (Section 26 Specification) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Stage Workflow Control</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Procurement Verification Actions (Farmer: Ramesh Kumar • #{procurement.tokenNumber})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Advance verification milestones here. The farmer's timeline updates instantly across all active browser windows.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-700">
            Current Stage: <strong className="text-kisan-800">{procurement.currentStep}</strong>
          </span>
        </div>

        {/* Action Buttons as specified in Section 26 */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            onClick={() => updateProcurementStep('farmer_arrived')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              procurement.currentStep === 'farmer_arrived'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Step 2</span>
              {procurement.currentStep === 'farmer_arrived' && <span>● Active</span>}
            </div>
            <p className="font-bold text-xs sm:text-sm">Mark Arrived</p>
            <p className="text-[10px] opacity-80 mt-0.5">Gate pass check-in</p>
          </button>

          <button
            onClick={() => updateProcurementStep('quality_check')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              procurement.currentStep === 'quality_check'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Step 3</span>
              {procurement.currentStep === 'quality_check' && <span>● Active</span>}
            </div>
            <p className="font-bold text-xs sm:text-sm">Quality Checked</p>
            <p className="text-[10px] opacity-80 mt-0.5">Moisture & grade passed</p>
          </button>

          <button
            onClick={() => updateProcurementStep('weighed')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              procurement.currentStep === 'weighed'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Step 4</span>
              {procurement.currentStep === 'weighed' && <span>● Active</span>}
            </div>
            <p className="font-bold text-xs sm:text-sm">Weighed</p>
            <p className="text-[10px] opacity-80 mt-0.5">25.0 Q gross weight</p>
          </button>

          <button
            onClick={() => updateProcurementStep('accepted')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              procurement.currentStep === 'accepted'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Step 5</span>
              {procurement.currentStep === 'accepted' && <span>● Active</span>}
            </div>
            <p className="font-bold text-xs sm:text-sm">Accepted</p>
            <p className="text-[10px] opacity-80 mt-0.5">e-J-Form generated</p>
          </button>

          <button
            onClick={() => updateProcurementStep('payment_initiated')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              procurement.currentStep === 'payment_initiated'
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Step 6</span>
              {procurement.currentStep === 'payment_initiated' && <span>● Active</span>}
            </div>
            <p className="font-bold text-xs sm:text-sm">Payment Initiated</p>
            <p className="text-[10px] opacity-80 mt-0.5">PFMS DBT Batch</p>
          </button>
        </div>
      </div>

      {/* OFFICER LIVE QUEUE TABLE (Section 25 Specification) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Mandi Live Queue Roster</h3>
            <p className="text-xs text-slate-500">
              Manage incoming tokens, mark arrivals, and advance the queue counter.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Click "Complete" or "Call" to advance:</span>
            <button
              onClick={callNextToken}
              className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>CALL NEXT TOKEN</span>
            </button>
          </div>
        </div>

        {/* Responsive Table (Section 25 Specification) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 rounded-l-xl">Token</th>
                <th className="py-3 px-4">Farmer</th>
                <th className="py-3 px-4">Crop</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Slot</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {queue.map(item => {
                const isServing = item.status === 'serving';
                const isTargetRamesh = item.tokenNumber === 'A-047';

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isServing
                        ? 'bg-emerald-50/70 font-semibold'
                        : isTargetRamesh
                        ? 'bg-kisan-50/50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-mono font-bold text-xs px-2.5 py-1 rounded-lg ${
                          isServing
                            ? 'bg-emerald-600 text-white'
                            : isTargetRamesh
                            ? 'bg-kisan-800 text-white'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        #{item.tokenNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{item.farmerName}</p>
                      <p className="text-[11px] text-slate-400">{item.farmerPhone}</p>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{item.crop}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{item.quantityQuintals} Q</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.slotTime}</td>
                    <td className="py-3.5 px-4">
                      <QueueStatusBadge status={item.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isServing ? (
                        <button
                          onClick={callNextToken}
                          className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          Complete & Next
                        </button>
                      ) : item.status === 'waiting' ? (
                        <button
                          onClick={callNextToken}
                          className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                        >
                          Call
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs">Finished</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
