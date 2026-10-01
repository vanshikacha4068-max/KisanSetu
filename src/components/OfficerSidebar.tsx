import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  PackageCheck,
  Activity,
  Bell,
  Settings,
  Building2,
  Zap
} from 'lucide-react';
import { useKisan } from '../context/KisanContext';

export const OfficerSidebar: React.FC = () => {
  const { currentToken, callNextToken } = useKisan();

  const links = [
    { to: '/officer', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/officer/queue', label: 'Live Queue', icon: Users, badge: `#${currentToken}` },
    { to: '/officer/appointments', label: 'Appointments', icon: CalendarCheck },
    { to: '/officer/procurement', label: 'Procurement', icon: PackageCheck },
    { to: '/officer/centre-status', label: 'Centre Status', icon: Activity },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/officer/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 min-h-[calc(100vh-6rem)] hidden lg:flex flex-col justify-between p-4 sticky top-24 self-start">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2.5 px-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">Centre A APMC</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Officer Station #1</p>
            </div>
          </div>

          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Officer Portal
          </p>
          <nav className="space-y-1">
            {links.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/officer'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Quick Call Next Box */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Current Token:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">#{currentToken}</span>
          </div>

          <button
            onClick={callNextToken}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>CALL NEXT TOKEN</span>
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        e-Procurement Terminal v2.4 • Ministry of Agriculture
      </div>
    </aside>
  );
};
