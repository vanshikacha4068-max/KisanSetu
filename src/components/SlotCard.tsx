import React from 'react';
import { Clock, Check } from 'lucide-react';
import { TimeSlot } from '../types';

interface SlotCardProps {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: (slot: TimeSlot) => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot, isSelected, onSelect }) => {
  const available = Math.max(0, slot.totalSlots - slot.bookedSlots);
  const isFull = slot.isFull || available === 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(slot)}
      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden flex items-center justify-between ${
        isFull
          ? 'bg-rose-50/60 border-rose-200 cursor-pointer hover:bg-rose-50'
          : isSelected
          ? 'bg-kisan-50/90 border-kisan-600 ring-2 ring-kisan-500/20 shadow-xs'
          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-xl shrink-0 ${
            isFull
              ? 'bg-rose-100 text-rose-700'
              : isSelected
              ? 'bg-kisan-600 text-white'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{slot.time}</p>
          <p className="text-xs text-slate-500 mt-0.5">
            {isFull ? (
              <span className="font-semibold text-rose-700 flex items-center gap-1">
                🔴 Full (0 left)
              </span>
            ) : (
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                🟢 {available} slots available
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="shrink-0 pl-2">
        {isFull ? (
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
            Full
          </span>
        ) : isSelected ? (
          <div className="w-6 h-6 rounded-full bg-kisan-600 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
        ) : (
          <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600">Select</span>
        )}
      </div>
    </button>
  );
};
