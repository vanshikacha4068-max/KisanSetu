import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Bell,
  ArrowRight,
  Printer,
  Share2,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useKisan } from '../context/KisanContext';
import { playNotificationSound } from '../utils/audio';

export const BookingConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { centres, selectedCentre, farmer } = useKisan();

  const token = searchParams.get('token') || 'A-047';
  const centreId = searchParams.get('centreId') || selectedCentre.id;
  const crop = searchParams.get('crop') || 'Wheat';
  const quantity = searchParams.get('quantity') || '25';
  const time = searchParams.get('time') || '11:00 AM';
  const date = searchParams.get('date') || '2026-09-29';

  const activeCentre = centres.find(c => c.id === centreId) || selectedCentre;

  // Celebratory Confetti effect on load
  useEffect(() => {
    playNotificationSound('success');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#15803d', '#22c55e', '#fbbf24', '#f59e0b'],
      });
    } catch (e) {
      console.debug('Confetti error:', e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleAddReminder = () => {
    alert(`Reminder added for ${date} at ${time}. You will receive an SMS alert 30 minutes before your slot.`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-scale-up pb-12">
      {/* Big Success Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

        {/* Large Success Icon (Section 15 Specification) */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Government Mandi Slot Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
          Slot Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
          Your procurement appointment has been registered on the central APMC portal.
        </p>

        {/* Big Prominent Token Card */}
        <div className="my-8 p-6 rounded-3xl bg-gradient-to-br from-kisan-800 to-kisan-950 text-white shadow-lg shadow-kisan-900/15 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-kisan-200 font-semibold tracking-wider uppercase mb-1">
            <span>Official Gate Token Number</span>
            <span className="bg-white/20 text-gold-300 px-2 py-0.5 rounded font-mono text-[11px]">
              Gate 2
            </span>
          </div>

          <div className="my-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-white flex items-center justify-center gap-1">
              <span className="text-gold-300 text-3xl font-bold">#</span>
              <span>{token}</span>
            </span>
            <p className="text-xs text-kisan-100 mt-1 font-medium">
              Farmer: {farmer.name} • {crop} ({quantity} Quintals)
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-left">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Centre</span>
              <strong className="text-white font-bold">{activeCentre.name.split(' (')[0]}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Arrival Window</span>
              <strong className="text-gold-300 font-bold">10:45 – 11:00 AM</strong>
            </div>
          </div>
        </div>

        {/* Booking Details List (Section 15 Specification) */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-xs text-slate-700 space-y-2.5 text-left mb-8">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Procurement Centre:</span>
            <strong className="text-slate-900 font-bold">{activeCentre.name}</strong>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Date:</span>
            <strong className="text-slate-900 font-bold">29 September 2026</strong>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Time Slot:</span>
            <strong className="text-slate-900 font-bold">{time}</strong>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Arrival Window:</span>
            <strong className="text-kisan-700 font-bold">10:45 – 11:00 AM</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Estimated Waiting Time:</span>
            <strong className="text-emerald-700 font-bold">~35 minutes</strong>
          </div>
        </div>

        {/* Action Buttons (Section 15 Specification) */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/queue"
            className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-kisan-700 hover:bg-kisan-800 text-white font-bold text-sm shadow-md shadow-kisan-700/20 flex items-center justify-center gap-2 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Track Live Queue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/procurement"
            className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <span>View Booking</span>
          </Link>

          <button
            onClick={handleAddReminder}
            type="button"
            className="w-full sm:w-auto py-3.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-1.5 transition-all"
          >
            <Bell className="w-4 h-4 text-slate-500" />
            <span>Add Reminder</span>
          </button>
        </div>

        {/* Secondary Actions: Print slip */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-xs font-semibold text-slate-500">
          <button onClick={handlePrint} className="hover:text-slate-900 flex items-center gap-1.5">
            <Printer className="w-4 h-4" />
            <span>Print Digital Token Slip</span>
          </button>
          <button
            onClick={() => alert(`Token link copied: ${window.location.origin}/queue`)}
            className="hover:text-slate-900 flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
