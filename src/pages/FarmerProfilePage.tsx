import React from 'react';
import { useKisan } from '../context/KisanContext';
import {
  User,
  ShieldCheck,
  Building2,
  MapPin,
  Phone,
  FileCheck,
  CreditCard,
  History,
  RotateCcw,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FarmerProfilePage: React.FC = () => {
  const { farmer, selectedCentre, resetDemo, setRole } = useKisan();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setRole('guest');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-kisan-700 text-white font-black text-2xl flex items-center justify-center shadow-md">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{farmer.name}</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Farmer
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Kisan Registration ID: <strong className="text-slate-700">HR-AGRI-2026-88192</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemo}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
          <button
            onClick={handleSignOut}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Farm Location */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-kisan-700" />
            <span>Personal & Village Details</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Full Name:</span>
              <strong className="text-slate-900 font-bold">{farmer.name}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Mobile Number:</span>
              <strong className="text-slate-900 font-bold">{farmer.phone}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Village:</span>
              <strong className="text-slate-900 font-bold">{farmer.village}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">District & State:</span>
              <strong className="text-slate-900 font-bold">{farmer.district}, {farmer.state}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Preferred Mandi:</span>
              <strong className="text-kisan-800 font-bold">{selectedCentre.name.split(' (')[0]}</strong>
            </div>
          </div>
        </div>

        {/* Land Records & Banking (PFMS Direct Benefit Transfer) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard className="w-4 h-4 text-blue-700" />
            <span>Land Ownership & DBT Bank Link</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Khasra / Jamabandi No:</span>
              <strong className="text-slate-900 font-mono font-bold">{farmer.khasraNumber}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Cultivated Area:</span>
              <strong className="text-slate-900 font-bold">{farmer.landAreaAcres} Acres (Wheat)</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Bank Name:</span>
              <strong className="text-slate-900 font-bold">{farmer.bankName}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Account Number:</span>
              <strong className="text-slate-900 font-mono font-bold">{farmer.accountNumberMasked}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">DBT Direct Transfer Status:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                ✓ Active & Aadhaar Linked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Mandi Procurements */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
          <History className="w-4 h-4 text-gold-600" />
          <span>Past Procurement History (Government MSP Records)</span>
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Wheat (Rabi 2025)</p>
              <p className="text-slate-500 text-[11px]">Procurement Centre A • Token #A-022</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">30 Quintals</p>
              <p className="text-emerald-700 font-bold">₹68,250 (Paid via DBT)</p>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Paddy / Rice (Kharif 2024)</p>
              <p className="text-slate-500 text-[11px]">Procurement Centre B • Token #B-015</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">40 Quintals</p>
              <p className="text-emerald-700 font-bold">₹87,320 (Paid via DBT)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
