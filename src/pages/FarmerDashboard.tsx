import React from 'react';
import { Link } from 'react-router-dom';
import { useKisan } from '../context/KisanContext';
import {
  Calendar,
  Ticket,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { QueueProgress } from '../components/QueueProgress';
import { CongestionBadge } from '../components/StatusBadge';

export const FarmerDashboard: React.FC = () => {
  const {
    farmer,
    selectedCentre,
    currentToken,
    farmerToken,
    farmersAhead,
    estimatedWaitMinutes,
    procurement,
    getCongestionLevel,
  } = useKisan();

  const congestion = getCongestionLevel(selectedCentre.waitingCount);

  // Find active step label for procurement
  const currentStepObj = procurement.steps.find(s => s.id === procurement.currentStep);
  const currentStepLabel = currentStepObj?.label || 'Quality Check';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Greeting & Mandi Status Bar */}
      <div className="bg-gradient-to-r from-kisan-800 via-kisan-700 to-kisan-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-kisan-900/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-gold-300 text-xs font-bold tracking-wide mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KisanSetu • Digital Procurement Gateway</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Namaste, {farmer.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-kisan-100 font-medium mt-1">
              Village: {farmer.village}, {farmer.district} • Khasra: {farmer.khasraNumber}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/book"
              className="px-4 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book New Slot</span>
            </Link>
            <Link
              to="/queue"
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Queue</span>
            </Link>
          </div>
        </div>

        {/* Background Subtle Wheat Graphic */}
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none text-9xl">
          🌾
        </div>
      </div>

      {/* Grid of Key Status Cards (Section 10 Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Current Booking */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Current Booking</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                🟢 Confirmed
              </span>
            </div>
            <div className="my-2">
              <span className="text-xs text-slate-400 font-medium">Assigned Token:</span>
              <p className="text-3xl font-black text-slate-900 tracking-tight">#{farmerToken}</p>
            </div>
            <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Centre:</span>
                <strong className="text-slate-800 font-semibold truncate max-w-[140px]">
                  {selectedCentre.name.split(' (')[0]}
                </strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Slot Time:</span>
                <strong className="text-slate-800 font-semibold">11:00 AM (Today)</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Arrival Window:</span>
                <strong className="text-kisan-700 font-bold">10:45 – 11:00 AM</strong>
              </p>
            </div>
          </div>
          <Link
            to="/procurement"
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-kisan-700 hover:text-kisan-800 flex items-center justify-between"
          >
            <span>View Booking Details</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 2: Live Queue Mini Widget */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Live Queue</span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Sync
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-2">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Current</span>
                <p className="text-xl font-black text-slate-900">#{currentToken}</p>
              </div>
              <div className="bg-kisan-50 p-2.5 rounded-xl border border-kisan-100">
                <span className="text-[10px] text-kisan-800 uppercase font-semibold">Your Token</span>
                <p className="text-xl font-black text-kisan-900">#{farmerToken}</p>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Farmers ahead:</span>
                <strong className="text-slate-900 font-bold">{farmersAhead} farmers</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Estimated wait:</span>
                <strong className="text-kisan-700 font-bold">~{estimatedWaitMinutes} min</strong>
              </p>
            </div>
          </div>

          <Link
            to="/queue"
            className="mt-4 pt-3 border-t border-slate-100 w-full py-2 rounded-xl bg-kisan-700 hover:bg-kisan-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <span>Track Live Queue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 3: Centre Status */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Centre Status</span>
              <CongestionBadge level={congestion} />
            </div>

            <div className="my-2">
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {selectedCentre.name.split(' (')[0]}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">{selectedCentre.location}</p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Operation:</span>
                <strong className="text-emerald-700 font-bold">🟢 Operating Normally</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Weighbridges:</span>
                <strong className="text-slate-800 font-semibold">3 Active Platforms</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Gate Speed:</span>
                <strong className="text-slate-800 font-semibold">~4 min / tractor</strong>
              </p>
            </div>
          </div>

          <Link
            to="/centres"
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center justify-between"
          >
            <span>Check Other Centres</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Card 4: Procurement Status */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Procurement Status</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                In Progress
              </span>
            </div>

            <div className="my-2">
              <span className="text-xs text-slate-400 font-medium">Current Stage:</span>
              <p className="text-xl font-extrabold text-kisan-900 tracking-tight flex items-center gap-1.5 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-kisan-600 animate-pulse" />
                {currentStepLabel}
              </p>
            </div>

            <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Harvest:</span>
                <strong className="text-slate-800 font-semibold">Wheat (25 Quintals)</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Estimated MSP:</span>
                <strong className="text-emerald-700 font-bold">₹56,875</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-slate-400">Payout Mode:</span>
                <strong className="text-slate-800 font-semibold">Direct DBT (PFMS)</strong>
              </p>
            </div>
          </div>

          <Link
            to="/procurement"
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-kisan-700 hover:text-kisan-800 flex items-center justify-between"
          >
            <span>View Full Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Feature: Live Queue Visual Hero Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-kisan-700" />
            Live Queue Status at Your Centre
          </h2>
          <Link
            to="/queue"
            className="text-xs font-bold text-kisan-700 hover:text-kisan-800 flex items-center gap-1"
          >
            Open Dedicated Queue Screen <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <QueueProgress
          currentToken={currentToken}
          farmerToken={farmerToken}
          farmersAhead={farmersAhead}
          estimatedWaitMinutes={estimatedWaitMinutes}
          avgProcessingMinutes={selectedCentre.avgProcessingMinutes}
          centreName={selectedCentre.name}
        />
      </div>

      {/* Quick Services & Mandi Daily Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mandi MSP Official Rates Ticker */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold-600" />
              Government Minimum Support Price (MSP) — Rabi/Kharif 2026
            </h3>
            <span className="text-xs text-slate-400">Govt. Notified Rates</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-kisan-50/70 border border-kisan-200/70">
              <span className="text-xs font-bold text-slate-600">Wheat (Common)</span>
              <p className="text-xl font-black text-kisan-900 mt-1">₹2,275</p>
              <p className="text-[10px] text-slate-500">per Quintal</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-600">Paddy (Grade A)</span>
              <p className="text-xl font-black text-slate-900 mt-1">₹2,203</p>
              <p className="text-[10px] text-slate-500">per Quintal</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-600">Mustard Seed</span>
              <p className="text-xl font-black text-slate-900 mt-1">₹5,650</p>
              <p className="text-[10px] text-slate-500">per Quintal</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-600">Maize</span>
              <p className="text-xl font-black text-slate-900 mt-1">₹2,090</p>
              <p className="text-[10px] text-slate-500">per Quintal</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Direct payment within 48 hours to registered bank account.
            </span>
            <Link to="/book" className="font-bold text-kisan-700 hover:underline">
              Sell at Mandi →
            </Link>
          </div>
        </div>

        {/* Quick Documents & Gate Pass */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-kisan-700" />
              Digital Gate Pass
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Show this QR code at Mandi entry gate for instant weighbridge scan.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
              <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center mb-2">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                  <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h20v10H40zM0 40h10v20H0zM40 40h20v20H40zM70 40h30v10H70zM70 60h10v20H70zM40 70h20v10H40zM40 90h10v10H40zM90 70h10v30H90zM60 90h20v10H60z" />
                </svg>
              </div>
              <p className="text-xs font-mono font-bold text-slate-900">PASS: #{farmerToken}-2026-QC</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Valid for {selectedCentre.name.split(' (')[0]}</p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full mt-4 py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Print Gate Slip / Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
