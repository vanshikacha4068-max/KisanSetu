import React from 'react';
import { useKisan } from '../context/KisanContext';
import { ProcurementTimeline } from '../components/ProcurementTimeline';
import { PackageCheck, Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProcurementStatusPage: React.FC = () => {
  const { procurement, updateProcurementStep, role } = useKisan();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <PackageCheck className="w-4 h-4 text-kisan-700" />
            <span>APMC Mandi e-Samarth Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Procurement & Payment Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time status from gate weighing to direct benefit transfer (DBT) into your bank account.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>
      </div>

      {/* Main Procurement Timeline & Simulated Payment tracking */}
      <ProcurementTimeline
        procurement={procurement}
        onAdvanceStep={role === 'officer' ? updateProcurementStep : undefined}
        isOfficer={role === 'officer'}
      />
    </div>
  );
};
