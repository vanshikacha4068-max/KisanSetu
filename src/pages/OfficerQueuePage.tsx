import React, { useState } from 'react';
import { useKisan } from '../context/KisanContext';
import { Zap, Search, Filter, RefreshCw, CheckCircle2 } from 'lucide-react';
import { QueueStatusBadge } from '../components/StatusBadge';

export const OfficerQueuePage: React.FC = () => {
  const { queue, currentToken, callNextToken, resetDemo, selectedCentre } = useKisan();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = queue.filter(item => {
    const matchesSearch =
      item.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      item.tokenNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.crop.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Live Queue Roster Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time control desk for {selectedCentre.name.split(' (')[0]}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2">
            <span className="text-xs text-slate-400">Serving:</span>
            <span className="text-xl font-mono font-black text-emerald-400">#{currentToken}</span>
          </div>

          <button
            onClick={callNextToken}
            className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>CALL NEXT</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by farmer name, token #, or crop..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="serving">Now Serving</option>
            <option value="waiting">Waiting in Queue</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={resetDemo}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
            title="Reset Queue"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
              <th className="py-3 px-4 rounded-l-xl">Seq</th>
              <th className="py-3 px-4">Token #</th>
              <th className="py-3 px-4">Farmer Details</th>
              <th className="py-3 px-4">Crop</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Slot Window</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filtered.map((item, idx) => {
              const isServing = item.status === 'serving';

              return (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isServing ? 'bg-emerald-50/80 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{idx + 1}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 text-sm">
                    #{item.tokenNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{item.farmerName}</p>
                    <p className="text-[11px] text-slate-400">{item.farmerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{item.crop}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">{item.quantityQuintals} Q</td>
                  <td className="py-3.5 px-4 text-slate-600">{item.slotTime}</td>
                  <td className="py-3.5 px-4">
                    <QueueStatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {isServing ? (
                      <button
                        onClick={callNextToken}
                        className="py-1 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                      >
                        Finish & Call Next
                      </button>
                    ) : item.status === 'waiting' ? (
                      <button
                        onClick={callNextToken}
                        className="py-1 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                      >
                        Call
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs">Completed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
