import React, { useState } from 'react';
import { useKisan } from '../context/KisanContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ticket,
  Clock,
  Users,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Building2,
  Zap,
  HelpCircle,
  Volume2,
  VolumeX,
  RefreshCw,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { QueueStatusBadge, CongestionBadge } from '../components/StatusBadge';
import { playNotificationSound } from '../utils/audio';

export const LiveQueuePage: React.FC = () => {
  const {
    currentToken,
    farmerToken,
    farmersAhead,
    estimatedWaitMinutes,
    selectedCentre,
    queue,
    callNextToken,
    resetDemo,
    getCongestionLevel,
  } = useKisan();

  const [soundOn, setSoundOn] = useState(true);
  const [showFormulaTooltip, setShowFormulaTooltip] = useState(false);

  const avgMinutes = selectedCentre.avgProcessingMinutes || 4;
  const congestion = getCongestionLevel(selectedCentre.waitingCount);

  // Parse sequence numbers
  const parseSeq = (tok: string) => {
    const num = parseInt(tok.replace(/\D/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const currSeq = parseSeq(currentToken);
  const targetSeq = parseSeq(farmerToken);

  // Progress relative to batch
  const baseStart = Math.max(1, targetSeq - 15);
  const totalRange = Math.max(1, targetSeq - baseStart);
  const completedSteps = Math.min(totalRange, Math.max(0, currSeq - baseStart));
  const progressPct = currSeq >= targetSeq ? 100 : Math.round((completedSteps / totalRange) * 100);

  const isFarmerTurnNow = currentToken === farmerToken || farmersAhead === 0;
  const isUrgent = farmersAhead > 0 && farmersAhead <= 2;
  const isApproaching = farmersAhead > 2 && farmersAhead <= 5;

  const handleSimulateCallNext = () => {
    if (soundOn) {
      playNotificationSound('subtle');
    }
    callNextToken();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Page Title & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Real-Time Queue Tracker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Live Queue Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automated remote monitoring. Stay at home or nearby until your turn is called.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
            title={soundOn ? 'Mute Chimes' : 'Unmute Chimes'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Simulate Call Next (Interactive Demo Helper for Judges) */}
          <button
            onClick={handleSimulateCallNext}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all"
            title="Advance Queue by 1 Token (Test Real-Time Sync)"
          >
            <Zap className="w-4 h-4" />
            <span>Simulate "Call Next"</span>
          </button>

          {/* Reset Demo */}
          <button
            onClick={resetDemo}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 shadow-xs"
            title="Reset Queue to Token #A-038"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Centre Status Banner */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-kisan-50 text-kisan-700">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Mandi Campus:</span>
              <CongestionBadge level={congestion} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedCentre.name}</h3>
            <p className="text-xs text-slate-500 font-medium">
              Status: <strong className="text-emerald-700 font-bold">🟢 Operating Normally</strong> • Electronic Weighbridge Active
            </p>
          </div>
        </div>

        <div className="text-right text-xs">
          <span className="text-slate-400 block font-semibold uppercase">Total Waiting in Mandi</span>
          <span className="text-xl font-black text-slate-900">{selectedCentre.waitingCount} Farmers</span>
        </div>
      </div>

      {/* DYNAMIC TURN APPROACHING ALERT BANNERS (Section 19 Specification) */}
      <AnimatePresence mode="wait">
        {isFarmerTurnNow ? (
          <motion.div
            key="turn-now"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-3xl bg-emerald-600 text-white shadow-xl shadow-emerald-700/25 flex flex-wrap items-center justify-between gap-4 animate-bounce-subtle"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  Now Serving You
                </span>
                <h3 className="text-2xl font-black mt-1">🟢 It's Your Turn! Token #{farmerToken}</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Please drive your vehicle immediately to <strong>Counter #2 (Weighbridge Platform A)</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white/10 px-4 py-2 rounded-xl text-center border border-white/20">
              <span className="text-[10px] text-emerald-200 block uppercase font-bold">Report To</span>
              <strong className="text-base font-bold">Gate Counter #2</strong>
            </div>
          </motion.div>
        ) : isUrgent ? (
          <motion.div
            key="turn-urgent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 shadow-lg flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md animate-pulse">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                  Immediate Turn Alert (Farmers Ahead ≤ 2)
                </span>
                <h3 className="text-xl font-black text-emerald-950 mt-1">
                  🟢 Your turn is next!
                </h3>
                <p className="text-xs text-emerald-800 mt-0.5 font-medium">
                  "Please proceed to the procurement counter." Only {farmersAhead} farmer(s) ahead of you.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-700 block uppercase font-bold">Est. Call Time</span>
              <strong className="text-lg font-black text-emerald-900">~{estimatedWaitMinutes} minutes</strong>
            </div>
          </motion.div>
        ) : isApproaching ? (
          <motion.div
            key="turn-approaching"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-400 text-amber-950 shadow-md flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                  Approach Alert (Farmers Ahead ≤ 5)
                </span>
                <h3 className="text-xl font-black text-amber-950 mt-1">
                  🟡 Your turn is approaching!
                </h3>
                <p className="text-xs text-amber-800 mt-0.5 font-medium">
                  "When only a few farmers remain ahead of you, please start moving toward the procurement counter."
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-amber-700 block uppercase font-bold">Est. Wait</span>
              <strong className="text-lg font-black text-amber-900">~{estimatedWaitMinutes} minutes</strong>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* TWO PRIMARY TOKEN DISPLAY CARDS (Section 16 Specification) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CURRENTLY SERVING HERO CARD */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Currently Serving</span>
              </span>
              <span className="bg-white/10 text-emerald-400 px-2 py-0.5 rounded font-mono text-[11px]">
                Counter #2
              </span>
            </div>

            <div className="my-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentToken}
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="text-6xl sm:text-7xl font-black tracking-tight text-white flex items-baseline gap-1"
                >
                  <span className="text-kisan-400 text-3xl font-bold">#</span>
                  <span>{currentToken}</span>
                </motion.div>
              </AnimatePresence>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Active at Weighbridge & Quality Inspection Counter
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span>Avg. Service Pace:</span>
            <span className="font-bold text-white">~{avgMinutes} mins per farmer</span>
          </div>
        </div>

        {/* YOUR TOKEN HERO CARD */}
        <div className="bg-gradient-to-br from-kisan-800 via-kisan-700 to-kisan-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-kisan-600 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-kisan-200 uppercase tracking-wider mb-2">
              <span>Your Assigned Token</span>
              <span className="bg-white/15 text-gold-300 px-2 py-0.5 rounded font-mono text-[11px]">
                Gate 2 Entry
              </span>
            </div>

            <div className="my-4">
              <div className="text-6xl sm:text-7xl font-black tracking-tight text-white flex items-baseline gap-1">
                <span className="text-gold-300 text-3xl font-bold">#</span>
                <span>{farmerToken}</span>
              </div>
              <p className="text-xs text-kisan-100 mt-2 font-medium">
                Assigned to: Ramesh Kumar • Wheat (25 Quintals)
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-kisan-100">
            <span>Guaranteed Slot Window:</span>
            <span className="font-bold text-gold-300">11:00 AM – 12:00 PM</span>
          </div>
        </div>
      </div>

      {/* LARGE VISUAL PROGRESS INDICATOR (Section 16 Specification) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Current Queue Position</h3>
            <p className="text-xs text-slate-500">Relative progression of your token in this batch</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500">Position: </span>
            <strong className="text-slate-900 font-bold text-sm">
              {currSeq} / {targetSeq}
            </strong>
            <span className="ml-2 font-mono text-xs font-bold text-kisan-700 bg-kisan-50 px-2 py-0.5 rounded">
              {progressPct}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1 shadow-inner border border-slate-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-kisan-500 via-kisan-600 to-emerald-400"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1">
          <span>#A-030 (Batch Start)</span>
          <span>Currently at #{currentToken}</span>
          <span className="font-bold text-slate-700">#{farmerToken} (Your Token)</span>
        </div>
      </div>

      {/* METRICS ROW: FARMERS AHEAD & SMART ETA (Section 16 & 18 Specification) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Farmers Ahead Card with Smooth Counter Transition */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Farmers Ahead</p>
            <div className="flex items-baseline gap-2 mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={farmersAhead}
                  initial={{ scale: 1.4, color: '#15803d' }}
                  animate={{ scale: 1, color: '#0f172a' }}
                  exit={{ scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl font-black tracking-tight"
                >
                  {farmersAhead}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-semibold text-slate-500">farmers in line</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {farmersAhead > 0 ? `${farmersAhead} vehicles ahead of your gate pass` : 'No one ahead! You are up next.'}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 text-slate-700">
            <Users className="w-8 h-8" />
          </div>
        </div>

        {/* Smart ETA Card (Section 18 Specification) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between relative group">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">🧠 Smart ETA</p>
              <button
                type="button"
                onClick={() => setShowFormulaTooltip(!showFormulaTooltip)}
                className="text-slate-400 hover:text-slate-600"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={estimatedWaitMinutes}
                  initial={{ scale: 1.2, color: '#ca8a04' }}
                  animate={{ scale: 1, color: '#15803d' }}
                  className="text-5xl font-black tracking-tight"
                >
                  ~{estimatedWaitMinutes}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-semibold text-slate-500">minutes</span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Based on {farmersAhead} ahead × {avgMinutes} min avg processing
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gold-50 text-gold-700">
            <Clock className="w-8 h-8" />
          </div>

          {/* Transparent Formula Tooltip (Requirement #18) */}
          <div className="absolute -top-16 left-4 right-4 sm:right-auto sm:w-80 bg-slate-900 text-white text-xs p-3 rounded-2xl shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <p className="font-bold text-gold-300">Transparent ETA Formula:</p>
            <p className="text-slate-300 mt-0.5">
              Estimated Waiting Time = Farmers Ahead ({farmersAhead}) × Average Processing Time ({avgMinutes} min) = {estimatedWaitMinutes} minutes.
            </p>
          </div>
        </div>
      </div>

      {/* UPCOMING QUEUE STREAM (Demonstrates Live Queue Real-Time Changes) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tokens Currently in Sequence</h3>
            <p className="text-xs text-slate-500">Live roster for Procurement Centre A</p>
          </div>
          <span className="text-xs text-slate-500">
            Updated via <strong className="text-slate-900 font-bold">Realtime Engine</strong>
          </span>
        </div>

        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
          {queue.slice(0, 10).map((item) => {
            const isServing = item.status === 'serving';
            const isTarget = item.tokenNumber === farmerToken;

            return (
              <div
                key={item.id}
                className={`py-3 px-3 rounded-xl flex items-center justify-between transition-colors ${
                  isServing
                    ? 'bg-emerald-50/80 border border-emerald-200 my-1'
                    : isTarget
                    ? 'bg-kisan-50/70 border border-kisan-200 my-1'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono font-black text-sm px-2.5 py-1 rounded-lg ${
                      isServing
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isTarget
                        ? 'bg-kisan-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    #{item.tokenNumber}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{item.farmerName}</span>
                      {isTarget && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-kisan-200 text-kisan-900">
                          YOU
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {item.crop} • {item.quantityQuintals} Quintals • Slot {item.slotTime}
                    </p>
                  </div>
                </div>

                <div>
                  <QueueStatusBadge status={item.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
