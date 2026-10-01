import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useKisan } from '../context/KisanContext';
import {
  Clock,
  MapPin,
  Calendar,
  Ticket,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  ChevronRight,
  Zap,
  Building2,
  Bell
} from 'lucide-react';
import { CongestionBadge } from '../components/StatusBadge';
import { DemoControlBar } from '../components/DemoControlBar';

export const LandingPage: React.FC = () => {
  const { centres, getCongestionLevel, setRole, currentToken, farmerToken, farmersAhead, estimatedWaitMinutes } = useKisan();
  const navigate = useNavigate();

  const handleFarmerDemo = () => {
    setRole('farmer');
    navigate('/dashboard');
  };

  const handleOfficerDemo = () => {
    setRole('officer');
    navigate('/officer');
  };

  return (
    <div className="min-h-screen bg-[#f8faf6] flex flex-col font-sans selection:bg-kisan-100 selection:text-kisan-900">
      <DemoControlBar />

      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-[33px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-kisan-700 to-kisan-900 text-white flex items-center justify-center shadow-md">
              <span className="text-xl">🌾</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">KisanSetu</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-kisan-100 text-kisan-800 uppercase tracking-wider">
                  Digital Portal
                </span>
              </div>
              <p className="text-[11px] font-semibold text-kisan-700 hidden sm:block">
                Smart Procurement Slot & Live Queue Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/farmer-login"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-kisan-800 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Farmer Login
            </Link>
            <Link
              to="/officer-login"
              className="text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors hidden sm:block"
            >
              Officer Portal
            </Link>
            <button
              onClick={handleFarmerDemo}
              className="text-xs sm:text-sm font-bold bg-kisan-700 hover:bg-kisan-800 text-white px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kisan-100/80 border border-kisan-200 text-kisan-900 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-kisan-700" />
                <span>Smart Agricultural Mandi Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Book Smart. <br />
                <span className="text-kisan-700">Wait Less.</span> <br />
                Sell Better.
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-600 max-w-xl mx-auto lg:mx-0">
                "Your digital bridge to smarter government procurement."
              </p>

              <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Check procurement centre availability, book your slot, track your live queue in real time, and know exactly when it is your turn. No more endless Mandi queues.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/book"
                  className="px-6 py-3.5 rounded-2xl bg-kisan-700 hover:bg-kisan-800 active:scale-98 text-white font-bold text-base shadow-lg shadow-kisan-700/25 flex items-center gap-2 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Your Slot</span>
                </Link>

                <Link
                  to="/queue"
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-98 text-slate-800 font-bold text-base border border-slate-300 shadow-xs flex items-center gap-2 transition-all"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Track Live Queue</span>
                </Link>
              </div>

              {/* Quick Demo Shortcuts */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-500 font-medium">
                <span className="font-semibold text-slate-700">Instant Demo Access:</span>
                <button
                  onClick={handleFarmerDemo}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold flex items-center gap-1 transition-colors"
                >
                  👨🌾 Demo Farmer (Ramesh Kumar)
                </button>
                <button
                  onClick={handleOfficerDemo}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold flex items-center gap-1 transition-colors"
                >
                  🏢 Demo Officer (Rajesh Sharma)
                </button>
              </div>
            </div>

            {/* Right Column: Visual Dashboard Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 relative z-10 space-y-5">
                {/* Mock Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Procurement Centre A</p>
                      <p className="text-[10px] text-slate-400">Karnal Central Krishi Mandi</p>
                    </div>
                  </div>
                  <CongestionBadge level="LOW" />
                </div>

                {/* Live Token Mock Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>CURRENTLY SERVING</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                      LIVE
                    </span>
                  </div>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black tracking-tight text-white">#{currentToken}</span>
                    <span className="text-xs text-slate-400">Gate #2 Weighbridge</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Your Token:</span>
                    <span className="font-bold text-gold-300 font-mono">#{farmerToken}</span>
                  </div>
                </div>

                {/* Live Stats Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">Farmers Ahead</span>
                    <p className="text-2xl font-black text-slate-900">{farmersAhead}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Moving smoothly</p>
                  </div>
                  <div className="bg-kisan-50/80 p-3.5 rounded-xl border border-kisan-100">
                    <span className="text-[11px] font-semibold text-kisan-800 uppercase">Estimated Wait</span>
                    <p className="text-2xl font-black text-kisan-900">~{estimatedWaitMinutes}m</p>
                    <p className="text-[10px] text-kisan-700 mt-0.5">🧠 Smart ETA</p>
                  </div>
                </div>

                {/* Progress bar preview */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span>Queue Progress</span>
                    <span>38 / 47</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full bg-kisan-600 rounded-full w-4/5" />
                  </div>
                </div>

                {/* Mini Notification Alert */}
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2.5">
                  <Bell className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-900">🟡 Turn Approaching Alert</p>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      SMS and in-app alerts notify you when you are within 5 tokens of the counter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Background Blob */}
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-kisan-200 rounded-full blur-2xl opacity-60 pointer-events-none" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-gold-200 rounded-full blur-2xl opacity-60 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* How KisanSetu Works Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-extrabold uppercase tracking-wider text-kisan-700 mb-2">
              Simple 4-Step Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How KisanSetu Works
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Say goodbye to unorganized overnight waiting. Complete your grain procurement transparently in 4 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#f8faf6] rounded-3xl p-6 border border-slate-200/80 hover:shadow-md transition-all relative">
              <div className="w-12 h-12 rounded-2xl bg-kisan-100 text-kisan-800 font-black text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <span>📍 Find a Centre</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Check nearby APMC procurement centres, current queue congestion (Low, Moderate, High), and available daily slots.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f8faf6] rounded-3xl p-6 border border-slate-200/80 hover:shadow-md transition-all relative">
              <div className="w-12 h-12 rounded-2xl bg-kisan-100 text-kisan-800 font-black text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <span>📅 Book a Slot</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your harvest crop, estimated quantity (Quintals), date, and preferred arrival time slot with intelligent capacity validation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f8faf6] rounded-3xl p-6 border border-slate-200/80 hover:shadow-md transition-all relative">
              <div className="w-12 h-12 rounded-2xl bg-kisan-100 text-kisan-800 font-black text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <span>🎫 Get Your Token</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an official digital gate token (e.g. #A-047) with arrival window recommendations and transparent queue allotment.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#f8faf6] rounded-3xl p-6 border border-slate-200/80 hover:shadow-md transition-all relative">
              <div className="w-12 h-12 rounded-2xl bg-kisan-100 text-kisan-800 font-black text-lg flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <span>⏱ Track Your Turn</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Watch the live counter move in real time from home. Get timely alerts as your token approaches and drive straight to the counter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 sm:py-20 bg-[#f8faf6] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-extrabold uppercase tracking-wider text-kisan-700 mb-2">
              Transforming Mandi Experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Key Benefits for Farmers & Officers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 w-fit mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Less Waiting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminate 6 to 12 hours of idling in tractor queues outside Mandis by scheduling guaranteed arrival windows.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 w-fit mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Smart Slot Booking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Capacity-aware booking prevents Mandi overcrowding and automatically suggests the next available time if a slot is full.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="p-3 rounded-2xl bg-kisan-50 text-kisan-700 w-fit mb-4">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Live Queue</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time synchronization lets farmers observe the active token changing live as the procurement officer calls each number.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 w-fit mb-4">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Turn Notifications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatic proactive alerts trigger when 5 and 2 farmers remain ahead of you, so you only arrive when your turn is imminent.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 w-fit mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Procurement Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track your harvest through every verification milestone: Gate Entry, Quality Check, Weighbridge, Acceptance, and DBT Payment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="p-3 rounded-2xl bg-gold-50 text-gold-700 w-fit mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Transparent Status</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full transparency on moisture testing, bag count, net weight deductions, and guaranteed MSP payment calculation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Centre Preview Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-kisan-700 mb-1">
                Real-Time Mandi Status
              </p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Live Centre Preview
              </h2>
            </div>
            <Link
              to="/centres"
              className="text-xs font-bold text-kisan-700 hover:text-kisan-800 flex items-center gap-1 hover:underline"
            >
              View All Centres on Map <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Centre A */}
            <div className="bg-[#f8faf6] rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Low Congestion
                  </span>
                  <span className="text-xs font-semibold text-slate-500">3.2 km</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Procurement Centre A</h3>
                <p className="text-xs text-slate-500 mt-0.5">Karnal Central Mandi</p>

                <div className="space-y-2 py-4 border-y border-slate-200/70 my-4 text-xs font-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">👥 Farmers waiting:</span>
                    <strong className="text-slate-900 font-bold">12 farmers</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">⏱ Estimated wait:</span>
                    <strong className="text-kisan-800 font-bold">~35 min</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">📅 Available slots:</span>
                    <strong className="text-emerald-700 font-bold">8 slots available</strong>
                  </div>
                </div>
              </div>

              <Link
                to="/book?centreId=centre_a"
                className="w-full py-2.5 px-3 rounded-xl bg-kisan-700 hover:bg-kisan-800 text-white font-bold text-xs text-center shadow-xs transition-colors"
              >
                Book Centre A
              </Link>
            </div>

            {/* Centre B */}
            <div className="bg-[#f8faf6] rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 uppercase">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    Moderate Congestion
                  </span>
                  <span className="text-xs font-semibold text-slate-500">8.5 km</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Procurement Centre B</h3>
                <p className="text-xs text-slate-500 mt-0.5">Taraori APMC Yard</p>

                <div className="space-y-2 py-4 border-y border-slate-200/70 my-4 text-xs font-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">👥 Farmers waiting:</span>
                    <strong className="text-slate-900 font-bold">34 farmers</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">⏱ Estimated wait:</span>
                    <strong className="text-amber-800 font-bold">~1 hr 45 min</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">📅 Available slots:</span>
                    <strong className="text-emerald-700 font-bold">2 slots available</strong>
                  </div>
                </div>
              </div>

              <Link
                to="/book?centreId=centre_b"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs text-center shadow-xs transition-colors"
              >
                Book Centre B
              </Link>
            </div>

            {/* Centre C */}
            <div className="bg-[#f8faf6] rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1.5 uppercase">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    High Congestion
                  </span>
                  <span className="text-xs font-semibold text-slate-500">14.1 km</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Procurement Centre C</h3>
                <p className="text-xs text-slate-500 mt-0.5">Gharaunda Kisan Sub-Centre</p>

                <div className="space-y-2 py-4 border-y border-slate-200/70 my-4 text-xs font-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">👥 Farmers waiting:</span>
                    <strong className="text-slate-900 font-bold">65 farmers</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">⏱ Estimated wait:</span>
                    <strong className="text-rose-700 font-bold">~4 hr 20 min</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">📅 Available slots:</span>
                    <strong className="text-rose-700 font-bold">No slots available</strong>
                  </div>
                </div>
              </div>

              <button
                disabled
                className="w-full py-2.5 px-3 rounded-xl bg-slate-200 text-slate-400 font-bold text-xs text-center cursor-not-allowed"
              >
                Full for Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Information Footer */}
      <footer className="mt-auto bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌾</span>
                <span className="text-lg font-black tracking-tight">KisanSetu</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart Procurement Slot & Live Queue Management Platform for transparent, efficient agricultural produce procurement.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Demo Credentials</h4>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li><strong className="text-white">Farmer:</strong> Ramesh Kumar (Token #A-047)</li>
                <li><strong className="text-white">Officer:</strong> Rajesh Sharma (ID: OFFICER001)</li>
                <li><strong className="text-white">Procurement Centre:</strong> Centre A (Karnal Central)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Live Presentation Tip</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open the Farmer screen in one window, and Officer portal in another. Click <strong>"CALL NEXT"</strong> to observe instantaneous real-time queue sync!
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 KisanSetu. Smart Agricultural Procurement Initiative.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Real-Time Broadcast Engine Active</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
