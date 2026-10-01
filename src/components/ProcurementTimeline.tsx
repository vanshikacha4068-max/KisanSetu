import React from 'react';
import { CheckCircle2, Clock, CircleDot, ArrowRight, ShieldCheck, Banknote, FileText } from 'lucide-react';
import { ProcurementRecord, ProcurementStepId } from '../types';

interface ProcurementTimelineProps {
  procurement: ProcurementRecord;
  onAdvanceStep?: (stepId: ProcurementStepId) => void;
  isOfficer?: boolean;
}

export const ProcurementTimeline: React.FC<ProcurementTimelineProps> = ({
  procurement,
  onAdvanceStep,
  isOfficer = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-kisan-800 bg-kisan-50 px-2.5 py-1 rounded-full border border-kisan-200">
                Token #{procurement.tokenNumber}
              </span>
              <span className="text-xs font-semibold text-slate-500">• Gate #2</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">{procurement.crop}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Govt Procurement Reference: {procurement.transactionId || 'GOI-APMC-HR-2026-992'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-right">
            <span className="text-xs font-semibold text-slate-500 uppercase">Estimated Payout</span>
            <p className="text-2xl sm:text-3xl font-black text-kisan-900 tracking-tight">
              ₹{procurement.totalAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              {procurement.quantityQuintals} Quintals @ ₹{procurement.mspRatePerQuintal}/Q MSP
            </p>
          </div>
        </div>

        {/* Technical Inspection Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Gross Quantity</p>
            <p className="text-base font-bold text-slate-900">{procurement.quantityQuintals} Quintals</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Moisture Content</p>
            <p className="text-base font-bold text-emerald-700">{procurement.moisturePercent}% (Optimal)</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Quality Grade</p>
            <p className="text-base font-bold text-slate-900">{procurement.qualityGrade}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Bags Counted</p>
            <p className="text-base font-bold text-slate-900">{procurement.bagCount} Jute Bags</p>
          </div>
        </div>
      </div>

      {/* Interactive / Progress Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-kisan-700" />
            Procurement Lifecycle Timeline
          </h4>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            Updated in Real-Time
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {procurement.steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <div key={step.id} className="relative group">
                {/* Node Indicator */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50'
                      : isCurrent
                      ? 'bg-kisan-600 text-white ring-4 ring-kisan-100 animate-pulse'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : isCurrent ? (
                    <CircleDot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <span className="text-xs font-bold">{idx + 1}</span>
                  )}
                </div>

                <div
                  className={`rounded-2xl p-4 transition-all ${
                    isCurrent
                      ? 'bg-kisan-50/70 border border-kisan-200 shadow-xs'
                      : isCompleted
                      ? 'bg-slate-50/70 border border-slate-100'
                      : 'border border-transparent'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h5
                        className={`text-base font-bold ${
                          isCompleted
                            ? 'text-slate-800'
                            : isCurrent
                            ? 'text-kisan-900 font-extrabold'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </h5>
                      {isCurrent && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-kisan-600 text-white uppercase tracking-wider">
                          In Progress
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          Verified
                        </span>
                      )}
                    </div>
                    {step.timestamp && (
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {step.timestamp}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs mt-1 ${
                      isCompleted || isCurrent ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {step.description}
                  </p>

                  {step.details && (
                    <div className="mt-2 text-xs font-mono bg-white/80 p-2 rounded-lg border border-slate-200/60 text-slate-700 inline-block">
                      {step.details}
                    </div>
                  )}

                  {/* Officer override action button */}
                  {isOfficer && onAdvanceStep && !isCompleted && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60">
                      <button
                        onClick={() => onAdvanceStep(step.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
                          isCurrent
                            ? 'bg-kisan-700 hover:bg-kisan-800 text-white'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        }`}
                      >
                        <span>Mark {step.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Payment Tracking Card */}
      <div className="bg-gradient-to-br from-slate-900 to-kisan-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-gold-400">
              <Banknote className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-300">
                Simulated Payment Status
              </p>
              <h4 className="text-xl sm:text-2xl font-black tracking-tight">Direct Benefit Transfer (DBT)</h4>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400">Total Net Payable</span>
            <p className="text-3xl font-black text-gold-300 tracking-tight">
              ₹{procurement.totalAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-slate-400">1. Acceptance</p>
            <p className="font-bold text-white mt-1">Procurement Approved</p>
            <span className="text-[11px] text-emerald-400">✓ Digital Slip</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-slate-400">2. Billing</p>
            <p className="font-bold text-white mt-1">e-J-Form Generated</p>
            <span className="text-[11px] text-emerald-400">✓ Mandi Tax Paid</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-slate-400">3. Bank Transfer</p>
            <p className="font-bold text-white mt-1">PFMS Batch Dispatched</p>
            <span className="text-[11px] text-gold-300">⏳ In Process</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-slate-400">4. Credit Settlement</p>
            <p className="font-bold text-white mt-1">SBI A/C •••• 4821</p>
            <span className="text-[11px] text-slate-400">ETA: Within 24-48 hrs</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Guaranteed Minimum Support Price (MSP) as per Ministry of Agriculture guidelines.</span>
          </div>
          <span className="font-mono text-slate-300">DBT ID: {procurement.transactionId}</span>
        </div>
      </div>
    </div>
  );
};
