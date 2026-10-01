import React, { useState } from 'react';
import { useKisan } from '../context/KisanContext';
import { Bell, CheckCheck, Filter, AlertCircle, CheckCircle2, Info, Ticket, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationCentrePage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, unreadCount } = useKisan();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !n.read;
    return n.type === filterType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'turn_next':
      case 'turn_approaching':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'slot_confirmed':
        return <Ticket className="w-5 h-5 text-kisan-600" />;
      case 'procurement_update':
        return <PackageCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-kisan-700" />
            <span>Notification Centre</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time updates regarding your token position, slot confirmations, and procurement status.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-kisan-700" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterType === 'all'
              ? 'bg-kisan-700 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilterType('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterType === 'unread'
              ? 'bg-kisan-700 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilterType('turn_approaching')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterType === 'turn_approaching'
              ? 'bg-kisan-700 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Queue Alerts
        </button>
        <button
          onClick={() => setFilterType('procurement_update')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterType === 'procurement_update'
              ? 'bg-kisan-700 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Procurement Updates
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {filteredNotifications.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold text-slate-700">No notifications to show</p>
            <p className="text-xs text-slate-400 mt-0.5">You are all caught up with your updates.</p>
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`py-4 transition-colors flex items-start gap-4 cursor-pointer ${
                !notif.read ? 'bg-kisan-50/40 -mx-6 px-6' : ''
              }`}
            >
              <div className="p-2.5 rounded-2xl bg-slate-100 shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>{notif.title}</span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    )}
                  </h4>
                  <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                    {notif.createdAt}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>

                {notif.type.includes('turn') && (
                  <div className="mt-2">
                    <Link
                      to="/queue"
                      className="text-xs font-bold text-kisan-700 hover:underline inline-flex items-center gap-1"
                    >
                      View Live Queue Tracker →
                    </Link>
                  </div>
                )}
                {notif.type.includes('procurement') && (
                  <div className="mt-2">
                    <Link
                      to="/procurement"
                      className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                    >
                      View Procurement Status Timeline →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
