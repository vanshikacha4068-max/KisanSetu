import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useKisan } from '../context/KisanContext';
import { Phone, ShieldCheck, ArrowRight, Sparkles, Lock, ArrowLeft } from 'lucide-react';
import { DemoControlBar } from '../components/DemoControlBar';

export const FarmerLoginPage: React.FC = () => {
  const { setRole, farmer } = useKisan();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['4', '8', '2', '1', '', '']);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    setRole('farmer');
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    // Instant demo login as specified in Section 9
    setRole('farmer');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8faf6] flex flex-col font-sans">
      <DemoControlBar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl relative">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-kisan-700 to-kisan-900 text-white flex items-center justify-center mx-auto shadow-md shadow-kisan-900/10 mb-3">
              <span className="text-2xl">🌾</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Farmer Portal Login</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Access your digital slot bookings, live queue tokens, and MSP payments
            </p>
          </div>

          {/* PROMINENT DEMO LOGIN BUTTON (Requirement #9 & #28) */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-kisan-50 to-emerald-50 border-2 border-kisan-500/40 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-kisan-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-kisan-600" />
                Quick Demo Access
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-kisan-600 text-white">
                1-Click
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Instantly log in with pre-loaded demo farmer profile: <br />
              <strong className="text-slate-900 font-bold">{farmer.name}</strong> • Token #{farmer.activeToken}
            </p>
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-kisan-700 hover:bg-kisan-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-kisan-700/20 active:scale-98 transition-all"
            >
              <span>Continue with Demo Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-3 bg-white text-xs text-slate-400 font-medium">
              Or Sign In via Mobile OTP
            </span>
          </div>

          {/* Standard Mobile + OTP Form */}
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number (Kisan Portal)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-semibold text-xs">
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit number"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-kisan-600 text-sm font-semibold text-slate-900"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Get OTP on Phone</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Enter 6-Digit OTP
                  </label>
                  <span className="text-[11px] text-emerald-700 font-bold">OTP sent to +91 {phone}</span>
                </div>
                <div className="flex gap-2 justify-between">
                  {[0, 1, 2, 3, 4, 5].map(idx => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={otp[idx] || ''}
                      onChange={e => {
                        const val = e.target.value;
                        const newOtp = [...otp];
                        newOtp[idx] = val;
                        setOtp(newOtp);
                      }}
                      className="w-12 h-12 text-center text-lg font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-kisan-600 bg-slate-50"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-kisan-700 hover:bg-kisan-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Login</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Procurement Officer or Mandi In-Charge?{' '}
              <Link to="/officer-login" className="font-bold text-blue-700 hover:underline">
                Officer Login Portal →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
