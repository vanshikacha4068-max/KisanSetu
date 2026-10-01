import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useKisan } from '../context/KisanContext';
import { INITIAL_SLOTS } from '../data/initialData';
import { SlotCard } from '../components/SlotCard';
import { TimeSlot } from '../types';
import {
  Calendar,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Building2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Info
} from 'lucide-react';
import { CongestionBadge } from '../components/StatusBadge';

export const SlotBookingPage: React.FC = () => {
  const { centres, selectedCentre, setSelectedCentre, bookSlot, getCongestionLevel } = useKisan();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected centre from URL or context
  const centreParam = searchParams.get('centreId');
  const activeCentre = centres.find(c => c.id === centreParam) || selectedCentre;

  // Form states
  const [crop, setCrop] = useState<string>('Wheat');
  const [quantity, setQuantity] = useState<number>(25);
  const [date, setDate] = useState<string>('2026-09-29');
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('11:00 AM');
  const [fullSlotError, setFullSlotError] = useState<{ message: string; nextAvailableTime: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // MSP rates
  const mspRates: { [key: string]: number } = {
    Wheat: 2275,
    Paddy: 2203,
    Maize: 2090,
    Mustard: 5650,
    Other: 2000,
  };

  const rate = mspRates[crop] || 2275;
  const estimatedTotalMsp = quantity * rate;

  const handleSlotSelect = (slot: TimeSlot) => {
    const isFull = slot.isFull || (slot.totalSlots - slot.bookedSlots <= 0);
    if (isFull) {
      // Find the next available non-full slot
      const nextAvailable = INITIAL_SLOTS.find(
        s => !s.isFull && (s.totalSlots - s.bookedSlots > 0)
      );
      setFullSlotError({
        message: 'Sorry, this slot is currently full.',
        nextAvailableTime: nextAvailable ? nextAvailable.time : '02:00 PM',
      });
      setSelectedSlotTime(slot.time);
    } else {
      setFullSlotError(null);
      setSelectedSlotTime(slot.time);
    }
  };

  const handleSelectNextAvailable = () => {
    if (fullSlotError?.nextAvailableTime) {
      setSelectedSlotTime(fullSlotError.nextAvailableTime);
      setFullSlotError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Smart Validation Check: ensure slot is not full
    const slotObj = INITIAL_SLOTS.find(s => s.time === selectedSlotTime);
    if (slotObj && (slotObj.isFull || slotObj.totalSlots - slotObj.bookedSlots <= 0)) {
      setFullSlotError({
        message: 'Sorry, this slot is currently full.',
        nextAvailableTime: '02:00 PM',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedToken = await bookSlot({
        centreId: activeCentre.id,
        crop,
        quantityQuintals: quantity,
        date,
        timeSlot: selectedSlotTime,
      });

      // Navigate to confirmation page
      navigate(`/booking-confirmation?token=${generatedToken}&centreId=${activeCentre.id}&crop=${crop}&quantity=${quantity}&time=${selectedSlotTime}&date=${date}`);
    } catch (err) {
      console.error('Booking failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const congestion = getCongestionLevel(activeCentre.waitingCount);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Book Your Procurement Slot
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Schedule your guaranteed arrival window at the government procurement centre to avoid physical waiting.
        </p>
      </div>

      {/* Selected Centre Summary Pill */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-kisan-50 text-kisan-700">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Selected Mandi:</span>
              <CongestionBadge level={congestion} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">{activeCentre.name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {activeCentre.location} • {activeCentre.distanceKm} km away
            </p>
          </div>
        </div>

        <Link
          to="/centres"
          className="text-xs font-bold text-kisan-700 hover:text-kisan-800 underline"
        >
          Change Centre
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Section 1: Crop & Quantity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-xl bg-kisan-100 text-kisan-800 flex items-center justify-center text-xs font-black">
              1
            </span>
            Crop Details & Harvest Estimation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Crop Type
              </label>
              <select
                value={crop}
                onChange={e => setCrop(e.target.value)}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-kisan-600"
              >
                <option value="Wheat">🌾 Wheat (Gehun) — MSP ₹2,275/Q</option>
                <option value="Paddy">🌾 Paddy / Rice (Dhan) — MSP ₹2,203/Q</option>
                <option value="Maize">🌽 Maize (Makka) — MSP ₹2,090/Q</option>
                <option value="Mustard">🌻 Mustard Seed (Sarson) — MSP ₹5,650/Q</option>
                <option value="Other">📦 Other Certified Grain</option>
              </select>
            </div>

            {/* Estimated Quantity Input (Quintals) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Estimated Quantity (Quintals)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  placeholder="e.g. 25"
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-kisan-600"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  Quintals (1 Q = 100 kg)
                </span>
              </div>
            </div>
          </div>

          {/* Real-Time MSP Estimation Preview Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-earth-50 to-kisan-50 border border-kisan-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-kisan-600 text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-semibold">Government Minimum Support Price (MSP) Calculation:</p>
                <p className="text-xs text-slate-500 font-medium">
                  {quantity} Quintals × ₹{rate.toLocaleString('en-IN')}/Quintal
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Est. Bank Deposit</span>
              <p className="text-xl font-black text-kisan-900">
                ₹{estimatedTotalMsp.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Form Section 2: Date & Available Slots */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-xl bg-kisan-100 text-kisan-800 flex items-center justify-center text-xs font-black">
              2
            </span>
            Select Date & Available Time Slot
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Procurement Date
            </label>
            <div className="relative max-w-sm">
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                min="2026-09-29"
                max="2026-10-15"
                className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-kisan-600"
                required
              />
            </div>
          </div>

          {/* Time Slot Selection (Section 13 Specification) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Available Slot Windows (1 Hour Arrival Window)
            </label>

            {/* Smart Slot Validation Alert (Section 14 Specification) */}
            {fullSlotError && (
              <div className="mb-4 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500 text-white shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-rose-900 uppercase">Capacity Full Warning</h5>
                    <p className="text-xs text-rose-800 font-medium">{fullSlotError.message}</p>
                    <p className="text-xs text-rose-900 font-bold mt-0.5">
                      Suggested next available slot: {fullSlotError.nextAvailableTime}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSelectNextAvailable}
                  className="px-3.5 py-2 rounded-xl bg-kisan-700 hover:bg-kisan-800 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Select Next Available ({fullSlotError.nextAvailableTime})
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INITIAL_SLOTS.map(slot => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isSelected={selectedSlotTime === slot.time}
                  onSelect={handleSlotSelect}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Submit Confirmation Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-kisan-700 hover:bg-kisan-800 active:scale-98 text-white font-black text-base shadow-lg shadow-kisan-700/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Digital Token...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirm Slot & Generate Token</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">
            No booking fee. Your token will be stored in your digital passbook and accessible offline.
          </p>
        </div>
      </form>
    </div>
  );
};
