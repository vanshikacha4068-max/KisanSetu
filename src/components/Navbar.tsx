import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useKisan } from '../context/KisanContext';
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Menu,
  X
} from 'lucide-react';
import { CongestionBadge } from './StatusBadge';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    farmer,
    officer,
    selectedCentre,
    getCongestionLevel,
    notifications,
    unreadCount,
    markAllNotificationsAsRead,
  } = useKisan();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const congestion = getCongestionLevel(selectedCentre.waitingCount);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-[33px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-kisan-700 to-kisan-900 text-white flex items-center justify-center shadow-md shadow-kisan-900/10 group-hover:scale-105 transition-transform">
                <span className="text-xl">🌾</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold text-slate-900 tracking-tight">KisanSetu</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-kisan-100 text-kisan-800 uppercase tracking-wider">
                    Govt Portal
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-kisan-700 hidden sm:block">
                  Book Smart. Wait Less. Sell Better.
                </p>
              </div>
            </Link>

            {/* Live Centre Congestion Pill */}
            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
              <span className="text-xs text-slate-500 font-medium">{selectedCentre.name.split(' (')[0]}:</span>
              <CongestionBadge level={congestion} />
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Navigation Links */}
            <div className="hidden md:flex items-center gap-1 mr-2 text-sm font-semibold text-slate-600">
              {role === 'farmer' ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-1.5 rounded-xl transition-colors ${
                      location.pathname === '/dashboard' ? 'text-kisan-800 bg-kisan-50' : 'hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/centres"
                    className={`px-3 py-1.5 rounded-xl transition-colors ${
                      location.pathname === '/centres' ? 'text-kisan-800 bg-kisan-50' : 'hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Find Centres
                  </Link>
                  <Link
                    to="/queue"
                    className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 ${
                      location.pathname === '/queue' ? 'text-kisan-800 bg-kisan-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Queue
                  </Link>
                  <Link
                    to="/procurement"
                    className={`px-3 py-1.5 rounded-xl transition-colors ${
                      location.pathname === '/procurement' ? 'text-kisan-800 bg-kisan-50' : 'hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Procurement
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/officer"
                    className={`px-3 py-1.5 rounded-xl transition-colors ${
                      location.pathname === '/officer' ? 'text-blue-800 bg-blue-50' : 'hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Officer Dashboard
                  </Link>
                  <Link
                    to="/officer/queue"
                    className={`px-3 py-1.5 rounded-xl transition-colors ${
                      location.pathname === '/officer/queue' ? 'text-blue-800 bg-blue-50' : 'hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Queue Control
                  </Link>
                </>
              )}
            </div>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center relative transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce-subtle">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <span>Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-rose-100 text-rose-800">
                          {unreadCount} new
                        </span>
                      )}
                    </h4>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs font-semibold text-kisan-700 hover:text-kisan-800"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 py-6 text-center">No notifications yet</p>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div
                          key={n.id}
                          className={`py-3 text-xs ${!n.read ? 'bg-kisan-50/40 -mx-4 px-4' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.createdAt}</span>
                          </div>
                          <p className="text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-center">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifDropdown(false)}
                      className="text-xs font-bold text-kisan-700 hover:text-kisan-800 flex items-center justify-center gap-1"
                    >
                      View All Notifications <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div className="flex items-center gap-2 pl-2">
              {role === 'farmer' ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-kisan-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    RK
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">{farmer.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Token #{farmer.activeToken}</p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/officer"
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    RS
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">{officer.name}</p>
                    <p className="text-[10px] text-blue-700 font-medium mt-0.5">Officer ID: {officer.officerId}</p>
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              🌾 Farmer Dashboard
            </Link>
            <Link
              to="/centres"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              📍 Find Centres
            </Link>
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              📅 Book Slot
            </Link>
            <Link
              to="/queue"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-bold text-kisan-700 hover:bg-kisan-50"
            >
              🎫 Live Queue Tracker
            </Link>
            <Link
              to="/procurement"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              📦 My Procurement
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              👤 Farmer Profile
            </Link>
            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/officer"
                onClick={() => {
                  setRole('officer');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-blue-700 hover:bg-blue-50"
              >
                🏢 Switch to Officer Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
