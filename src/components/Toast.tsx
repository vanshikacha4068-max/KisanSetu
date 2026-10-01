import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, Bell, X } from 'lucide-react';
import { useKisan } from '../context/KisanContext';
import { useNavigate } from 'react-router-dom';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useKisan();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto rounded-2xl p-4 shadow-xl border backdrop-blur-md flex items-start gap-3 relative ${
              toast.type === 'alert'
                ? 'bg-amber-900/95 text-white border-amber-600 shadow-amber-950/20'
                : toast.type === 'warning'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-medium'
                : toast.type === 'success'
                ? 'bg-emerald-800/95 text-white border-emerald-500 shadow-emerald-950/20'
                : 'bg-slate-900/95 text-white border-slate-700 shadow-slate-950/20'
            }`}
          >
            <div className="p-1 rounded-lg shrink-0 mt-0.5">
              {toast.type === 'alert' || toast.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-amber-300" />
              ) : toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              ) : (
                <Info className="w-5 h-5 text-blue-300" />
              )}
            </div>

            <div className="flex-1 pr-4">
              <h5 className="text-sm font-bold leading-tight">{toast.title}</h5>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">{toast.message}</p>

              {(toast.title.includes('turn') || toast.title.includes('Turn')) && (
                <button
                  onClick={() => {
                    clearToast();
                    navigate('/queue');
                  }}
                  className="mt-2 text-xs font-bold underline hover:no-underline flex items-center gap-1"
                >
                  <Bell className="w-3.5 h-3.5" />
                  View Live Queue Screen →
                </button>
              )}
            </div>

            <button
              onClick={clearToast}
              className="absolute top-3 right-3 text-white/70 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
