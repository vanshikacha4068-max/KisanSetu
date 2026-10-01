import React from 'react';
import { useKisan } from '../context/KisanContext';
import { INITIAL_SLOTS } from '../data/initialData';
import { Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';

export const OfficerAppointmentsPage: React.FC = () => {
  const { selectedCentre } = useKisan();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Scheduled Mandi Slot Windows
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Hourly intake appointments configured for {selectedCentre.name.split(' (')[0]}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_SLOTS.map(slot => {
          const available = Math.max(0, slot.totalSlots - slot.bookedSlots);
          const isFull = slot.isFull || available === 0;

          return (
            <div
              key={slot.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-base font-bold text-slate-900">{slot.time}</span>
                </div>
                {isFull ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                    🔴 FULL
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    🟢 {available} Available
                  </span>
                )}
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Capacity Allocation:</span>
                  <strong className="text-slate-800 font-bold">{slot.totalSlots} farmers</strong>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Booked Tokens:</span>
                  <strong className="text-slate-800 font-bold">{slot.bookedSlots} tokens</strong>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${isFull ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.round((slot.bookedSlots / slot.totalSlots) * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
