import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useKisan } from '../context/KisanContext';
import { Building2, Lock, ArrowRight, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';
import { DemoControlBar } from '../components/DemoControlBar';

export const OfficerLoginPage: React.FC = () => {
  const { setRole, officer } = useKisan();
  const navigate = useNavigate();

  const [officerId, setOfficerId] = useState('OFFICER001');
  const [password, setPassword] = useState('demo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('officer');
    navigate('/officer');
  };

  const handleDemoLogin = () => {
    setRole('officer');
    navigate('/officer');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      <DemoControlBar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-3xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20 mb-3">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Procurement Officer Portal</h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              e-NAM / State APMC Mandi Administration Console
            </p>
          </div>

          {/* Demo Login Callout */}
          <div className="mb-6 p-4 rounded-2xl bg-blue-950/60 border border-blue-500/40 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Officer Demo Access
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                Pre-Filled
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Log in as Mandi In-Charge: <strong className="text-white">{officer.name}</strong> <br />
              Centre: Procurement Centre A (Karnal Central)
            </p>
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-98 transition-all"
            >
              <span>Continue Demo as Officer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <span className="relative px-3 bg-slate-800 text-xs text-slate-400 font-medium">
              Or Enter Officer Credentials
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Officer ID
              </label>
              <input
                type="text"
                value={officerId}
                onChange={e => setOfficerId(e.target.value)}
                placeholder="e.g. OFFICER001"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="demo"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login to Officer Terminal</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-700 text-center">
            <p className="text-xs text-slate-400">
              Are you a farmer looking for queue status?{' '}
              <Link to="/farmer-login" className="font-bold text-emerald-400 hover:underline">
                Farmer Login Portal →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
