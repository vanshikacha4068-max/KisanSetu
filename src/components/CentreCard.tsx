import React from 'react';
import { MapPin, Users, Clock, Calendar, ArrowRight } from 'lucide-react';
import { ProcurementCentre, CongestionLevel } from '../types';
import { CongestionBadge } from './StatusBadge';
import { Link } from 'react-router-dom';

interface CentreCardProps {
  centre: ProcurementCentre;
  congestion: CongestionLevel;
  onSelect?: (centre: ProcurementCentre) => void;
  isSelected?: boolean;
}

export const CentreCard: React.FC<CentreCardProps> = ({
  centre,
  congestion,
  onSelect,
  isSelected = false,
}) => {
  const availableSlots = Math.max(0, centre.capacity - centre.bookedCount);
  const estimatedWait = Math.round(centre.waitingCount * centre.avgProcessingMinutes);

  return (
    <div
      className={`bg-white rounded-3xl p-6 border transition-all duration-200 relative flex flex-col justify-between ${
        isSelected
          ? 'border-kisan-600 shadow-md ring-2 ring-kisan-500/20'
          : 'border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <CongestionBadge level={congestion} />
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-kisan-600" />
            {centre.distanceKm} km away
          </span>
        </div>

        {/* Title & Location */}
        <h3 className="text-lg font-bold text-slate-900 leading-snug">{centre.name}</h3>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <span className="font-mono text-slate-400">[{centre.code}]</span> {centre.location}
        </p>

        {/* Supported Crops */}
        <div className="flex flex-wrap gap-1.5 my-4">
          {centre.cropsSupported.map(crop => (
            <span
              key={crop}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-earth-50 text-earth-800 border border-earth-200/70"
            >
              🌾 {crop}
            </span>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-slate-100 mb-5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <Users className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-bold text-slate-900">{centre.waitingCount}</p>
            <p className="text-[11px] text-slate-500 font-medium">waiting</p>
          </div>

          <div className="text-center border-x border-slate-100">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-bold text-kisan-800">
              {estimatedWait > 60 ? `~${Math.round(estimatedWait / 60)}h ${estimatedWait % 60}m` : `~${estimatedWait}m`}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">est. wait</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-0.5">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <p className={`text-base font-bold ${availableSlots === 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
              {availableSlots === 0 ? 'Full' : `${availableSlots} left`}
            </p>
            <p className="text-[11px] text-slate-500 font-medium">slots</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        {onSelect && (
          <button
            onClick={() => onSelect(centre)}
            type="button"
            className="flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            View Details
          </button>
        )}
        <Link
          to={`/book?centreId=${centre.id}`}
          className="flex-1 text-xs font-bold py-2.5 px-3 rounded-xl bg-kisan-700 hover:bg-kisan-800 text-white flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <span>Book Slot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
