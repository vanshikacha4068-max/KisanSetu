import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarPlus, Ticket, PackageCheck, User } from 'lucide-react';
import { useKisan } from '../context/KisanContext';

export const MobileBottomNav: React.FC = () => {
  const { farmerToken } = useKisan();

  const links = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/book', label: 'Book', icon: CalendarPlus },
    { to: '/queue', label: 'Queue', icon: Ticket, badge: `#${farmerToken}` },
    { to: '/procurement', label: 'Status', icon: PackageCheck },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-kisan-800 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {link.badge && (
                  <span className="absolute -top-1.5 -right-3 text-[9px] font-mono px-1 rounded bg-kisan-700 text-white font-bold leading-tight">
                    {link.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
