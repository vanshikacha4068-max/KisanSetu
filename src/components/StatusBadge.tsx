import React from 'react';
import { CongestionLevel, QueueStatus } from '../types';

interface CongestionBadgeProps {
  level: CongestionLevel;
  className?: string;
  showIcon?: boolean;
}

export const CongestionBadge: React.FC<CongestionBadgeProps> = ({ level, className = '', showIcon = true }) => {
  const config = {
    LOW: {
      label: 'Low Congestion',
      dot: 'bg-emerald-500',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      emoji: '🟢',
    },
    MODERATE: {
      label: 'Moderate Congestion',
      dot: 'bg-amber-500',
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      emoji: '🟡',
    },
    HIGH: {
      label: 'High Congestion',
      dot: 'bg-rose-500',
      bg: 'bg-rose-50 text-rose-800 border-rose-200/80',
      emoji: '🔴',
    },
  }[level];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border tracking-wide uppercase shadow-xs ${config.bg} ${className}`}
    >
      {showIcon && <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />}
      <span>{config.label}</span>
    </span>
  );
};

interface QueueStatusBadgeProps {
  status: QueueStatus;
  className?: string;
}

export const QueueStatusBadge: React.FC<QueueStatusBadgeProps> = ({ status, className = '' }) => {
  const config = {
    serving: {
      label: 'Now Serving',
      bg: 'bg-kisan-100 text-kisan-900 border-kisan-300',
      dot: 'bg-kisan-600',
    },
    waiting: {
      label: 'In Queue',
      bg: 'bg-amber-50 text-amber-900 border-amber-200',
      dot: 'bg-amber-500',
    },
    completed: {
      label: 'Completed',
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
    },
    absent: {
      label: 'Absent',
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-400',
    },
    cancelled: {
      label: 'Cancelled',
      bg: 'bg-slate-100 text-slate-500 border-slate-200',
      dot: 'bg-slate-300',
    },
  }[status] || {
    label: status,
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'serving' ? 'animate-ping' : ''}`} />
      <span>{config.label}</span>
    </span>
  );
};
