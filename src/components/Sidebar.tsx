import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  MapPin,
  CalendarPlus,
  Ticket,
  PackageCheck,
  Bell,
  User,
  ShieldCheck,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useKisan } from '../context/KisanContext';

export const Sidebar: React.FC = () => {
  const { unreadCount, farmerToken } = useKisan();

  const navLinks = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/centres', label: 'Find Centre', icon: MapPin },
    { to: '/book', label: 'Book Slot', icon: CalendarPlus },
    { to: '/queue', label: 'My Queue', icon: Ticket, badge: `#${farmerToken}` },
    { to: '/procurement', label: 'Procurement', icon: PackageCheck },
    { to: '/notifications', label: 'Notifications', icon: Bell, count: unreadCount },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 min-h-[calc(100vh-6rem)] hidden lg:flex flex-col justify-between p-4 sticky top-24 self-start">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Farmer Portal
          </p>
          <nav className="space-y-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-kisan-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/20 text-white font-bold">
                      {link.badge}
                    </span>
                  )}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
                      {link.count}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Farmer Quick Info Card */}
        <div className="bg-gradient-to-br from-earth-50 to-kisan-50 rounded-2xl p-4 border border-kisan-200/70">
          <div className="flex items-center gap-2 text-kisan-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-kisan-700" />
            <span>Govt. Verified Farmer</span>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Kisan Credit Card & PFMS bank link active for direct MSP deposit.
          </p>
        </div>
      </div>

      {/* Support / Helpline Info */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 px-3 py-1">
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Kisan Toll-Free:</span>
          </span>
          <span className="font-bold text-slate-700">1800-180-1551</span>
        </div>
      </div>
    </aside>
  );
};
