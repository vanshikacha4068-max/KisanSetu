import React from 'react';
import { useKisan } from '../context/KisanContext';
import { ProcurementTimeline } from '../components/ProcurementTimeline';
import { PackageCheck, ShieldCheck, Zap } from 'lucide-react';

export const OfficerProcurementPage: React.FC = () => {
  const { procurement, updateProcurementStep, selectedCentre } = useKisan();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
          <PackageCheck className="w-4 h-4" />
          <span>Procurement Verification Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Grain Inspection & Acceptance Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review laboratory quality grades, weighbridge tare weight, and authorize digital receipts for {selectedCentre.name.split(' (')[0]}.
        </p>
      </div>

      {/* Main Procurement Timeline with Officer Advance Actions Enabled */}
      <ProcurementTimeline
        procurement={procurement}
        onAdvanceStep={updateProcurementStep}
        isOfficer={true}
      />
    </div>
  );
};
