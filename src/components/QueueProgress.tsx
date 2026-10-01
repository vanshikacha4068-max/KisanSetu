import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Sparkles, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QueueProgressProps {
  currentToken: string;
  farmerToken: string;
  farmersAhead: number;
  estimatedWaitMinutes: number;
  avgProcessingMinutes?: number;
  centreName?: string;
  isCompact?: boolean;
}

export const QueueProgress: React.FC<QueueProgressProps> = ({
  currentToken,
  farmerToken,
  farmersAhead,
  estimatedWaitMinutes,
  avgProcessingMinutes = 4,
  centreName,
  isCompact = false,
}) => {
  // Extract token sequence number (e.g. A-038 -> 38, A-047 -> 47)
  const parseSeq = (tok: string) => {
    const num = parseInt(tok.replace(/\D/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const currSeq = parseSeq(currentToken);
  const targetSeq = parseSeq(farmerToken);

  // Calculate progress percentage relative to start of batch (e.g. 30 to targetSeq)
  const baseStart = Math.max(1, targetSeq - 15);
  const totalRange = Math.max(1, targetSeq - baseStart);
  const completedSteps = Math.min(totalRange, Math.max(0, currSeq - baseStart));
  const progressPct = currSeq >= targetSeq ? 100 : Math.round((completedSteps / totalRange) * 100);

  const isFarmerTurnNow = currentToken === farmerToken || farmersAhead === 0;
  const isUrgent = farmersAhead > 0 && farmersAhead <= 2;
  const isApproaching = farmersAhead > 2 && farmersAhead <= 5;

  if (isCompact) {
    return (
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-kisan-300 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
              Live Queue Tracker
            </span>
          </div>
          <Link
            to="/queue"
            className="text-xs font-semibold text-kisan-700 hover:text-kisan-800 flex items-center gap-1 hover:underline"
          >
            Full Queue <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Serving Now</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentToken}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="text-2xl font-black text-slate-900 tracking-tight"
              >
                #{currentToken}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="bg-kisan-50/80 rounded-xl p-3 border border-kisan-100 text-center">
            <p className="text-[11px] font-semibold text-kisan-800 uppercase">Your Token</p>
            <p className="text-2xl font-black text-kisan-900 tracking-tight">#{farmerToken}</p>
          </div>
        </div>

        {/* Dynamic Alert Banner */}
        {isFarmerTurnNow ? (
          <div className="bg-emerald-500 text-white rounded-xl p-3 text-center mb-3 shadow-xs animate-bounce-subtle">
            <p className="text-xs font-bold uppercase tracking-wide">🟢 It's Your Turn!</p>
            <p className="text-xs text-emerald-100">Please proceed to Counter #2 immediately.</p>
          </div>
        ) : isUrgent ? (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-2.5 text-center mb-3 text-xs font-medium">
            <span className="font-bold text-emerald-700">🟢 Your turn is next!</span> Please proceed to the procurement counter.
          </div>
        ) : isApproaching ? (
          <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-2.5 text-center mb-3 text-xs font-medium">
            <span className="font-bold text-amber-800">🟡 Turn approaching!</span> Start moving toward the gate counter.
          </div>
        ) : null}

        <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Ahead:</span>
            <strong className="text-slate-900 font-bold">{farmersAhead} farmers</strong>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Est. Wait:</span>
            <strong className="text-kisan-700 font-bold">~{estimatedWaitMinutes} min</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg shadow-slate-100 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-kisan-100/40 via-transparent to-transparent -mr-20 -mt-20 pointer-events-none" />

      {/* Header with Live Ping */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping absolute" />
            <span className="w-3 h-3 rounded-full bg-emerald-600 relative" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Live Queue Tracker
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Real-Time
              </span>
            </h2>
            {centreName && <p className="text-xs text-slate-500 font-medium">{centreName}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Centre Operating Normally</span>
        </div>
      </div>

      {/* Two Hero Cards: Currently Serving & Your Token */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6">
        {/* CURRENTLY SERVING */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold tracking-wider uppercase mb-2">
            <span>Currently Serving</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-emerald-400 text-[11px] font-mono">
              Counter #2
            </span>
          </div>
          <div className="my-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentToken}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-baseline gap-1"
              >
                <span className="text-kisan-400 text-2xl font-bold">#</span>
                <span>{currentToken}</span>
              </motion.div>
            </AnimatePresence>
            <p className="text-xs text-slate-400 mt-1 font-medium">Gate Pass & Weighbridge Verification</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded-lg border border-white/10">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Avg. Service: {avgProcessingMinutes} mins per farmer</span>
          </div>
        </div>

        {/* YOUR TOKEN */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-kisan-800 via-kisan-700 to-kisan-900 text-white shadow-md relative overflow-hidden flex flex-col justify-between border border-kisan-600">
          <div className="flex items-center justify-between text-xs text-kisan-200 font-semibold tracking-wider uppercase mb-2">
            <span>Your Assigned Token</span>
            <span className="px-2 py-0.5 rounded bg-white/15 text-gold-300 text-[11px] font-mono">
              Gate 2 Entry
            </span>
          </div>
          <div className="my-3">
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-baseline gap-1">
              <span className="text-gold-300 text-2xl font-bold">#</span>
              <span>{farmerToken}</span>
            </div>
            <p className="text-xs text-kisan-100 mt-1 font-medium">Farmer: Ramesh Kumar • Wheat (25 Q)</p>
          </div>
          <div className="flex items-center justify-between text-xs text-kisan-100 bg-white/10 p-2 rounded-lg border border-white/15">
            <span className="font-semibold">Slot Window:</span>
            <span className="font-bold text-gold-200">11:00 AM - 12:00 PM</span>
          </div>
        </div>
      </div>

      {/* Dynamic Turn Alert Banner */}
      <AnimatePresence>
        {isFarmerTurnNow ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-600 text-white flex items-start gap-3 shadow-lg shadow-emerald-600/20"
          >
            <div className="p-2 rounded-xl bg-white/20 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold">🟢 It is your turn now!</h4>
              <p className="text-xs text-emerald-100 mt-0.5">
                Token #{farmerToken} has been called. Please drive your tractor/vehicle to Gate Counter #2 for sample collection.
              </p>
            </div>
          </motion.div>
        ) : isUrgent ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 flex items-start gap-3 shadow-md"
          >
            <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0 animate-pulse">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-emerald-900">🟢 Your turn is next!</h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Please proceed immediately to the procurement counter. Have your QR slip or Token #{farmerToken} ready.
              </p>
            </div>
          </motion.div>
        ) : isApproaching ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-950 flex items-start gap-3 shadow-md"
          >
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-amber-900">🟡 Your turn is approaching!</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                When only a few farmers remain ahead of you, please start moving toward the procurement counter.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
          <span>Queue Position: <strong className="text-slate-900 font-bold">{currSeq} / {targetSeq}</strong></span>
          <span className="font-mono text-kisan-700 font-bold">{progressPct}% completed</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-kisan-500 via-kisan-600 to-emerald-400"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Metrics Row: Farmers Ahead & Smart ETA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Farmers Ahead */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Farmers Ahead</p>
            <div className="flex items-baseline gap-2 mt-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={farmersAhead}
                  initial={{ scale: 1.3, color: '#15803d' }}
                  animate={{ scale: 1, color: '#0f172a' }}
                  className="text-3xl font-black tracking-tight"
                >
                  {farmersAhead}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs font-medium text-slate-500">farmers in line</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Smart ETA */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between group relative">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">🧠 Smart ETA</p>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-kisan-800 tracking-tight">
                ~{estimatedWaitMinutes}
              </span>
              <span className="text-xs font-medium text-slate-500">minutes</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {farmersAhead} farmers × {avgProcessingMinutes} mins avg
            </p>
          </div>
          <div className="p-3 rounded-xl bg-gold-50 text-gold-700">
            <Clock className="w-6 h-6" />
          </div>

          {/* Transparent Formula Tooltip */}
          <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl pointer-events-none z-20">
            <p className="font-bold text-gold-300 mb-0.5">Transparent Formula:</p>
            <p className="text-slate-300">
              Estimated Waiting Time = Farmers Ahead ({farmersAhead}) × Average Processing Time ({avgProcessingMinutes} min) = {estimatedWaitMinutes} minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
