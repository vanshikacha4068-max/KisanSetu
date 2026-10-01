import React, { useState, useMemo } from 'react';
import { useKisan } from '../context/KisanContext';
import { Search, Filter, ArrowUpDown, Map as MapIcon, Grid, MapPin } from 'lucide-react';
import { CentreCard } from '../components/CentreCard';
import { MapView } from '../components/MapView';
import { ProcurementCentre } from '../types';

export const CentreSelectionPage: React.FC = () => {
  const { centres, selectedCentre, setSelectedCentre, getCongestionLevel } = useKisan();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'nearest' | 'lowest_queue' | 'earliest_slot'>('nearest');
  const [viewMode, setViewMode] = useState<'both' | 'cards' | 'map'>('both');

  // Filter centres based on search and crop
  const filteredCentres = useMemo(() => {
    return centres
      .filter(centre => {
        const matchesQuery =
          centre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          centre.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          centre.code.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCrop =
          selectedCrop === 'all' || centre.cropsSupported.includes(selectedCrop);

        return matchesQuery && matchesCrop;
      })
      .sort((a, b) => {
        if (sortBy === 'nearest') {
          return a.distanceKm - b.distanceKm;
        } else if (sortBy === 'lowest_queue') {
          return a.waitingCount - b.waitingCount;
        } else if (sortBy === 'earliest_slot') {
          const aAvailable = a.capacity - a.bookedCount;
          const bAvailable = b.capacity - b.bookedCount;
          return bAvailable - aAvailable;
        }
        return 0;
      });
  }, [centres, searchQuery, selectedCrop, sortBy]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Find a Procurement Centre
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare nearby APMC Mandis by queue congestion, estimated waiting time, and slot availability.
          </p>
        </div>

        {/* View mode toggle (Both, Grid, Map) */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'both' ? 'bg-kisan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'cards' ? 'bg-kisan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'map' ? 'bg-kisan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Search, Filter & Sorting Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search centre name, code (e.g. HR-KRN), or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-kisan-600"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Crop Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-500">Crop:</span>
            <select
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-kisan-600"
            >
              <option value="all">All Crops</option>
              <option value="Wheat">Wheat</option>
              <option value="Paddy">Paddy</option>
              <option value="Mustard">Mustard</option>
              <option value="Maize">Maize</option>
            </select>
          </div>

          {/* Sort By (Specified in Section 11) */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'nearest' | 'lowest_queue' | 'earliest_slot')}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-kisan-600"
            >
              <option value="nearest">Nearest Distance (km)</option>
              <option value="lowest_queue">Lowest Queue (Min Wait)</option>
              <option value="earliest_slot">Earliest Available Slot</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Map Section (if 'both' or 'map') */}
      {(viewMode === 'both' || viewMode === 'map') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-kisan-700" />
              <span>Interactive APMC Mandi Locator & Congestion Map</span>
            </span>
            <span className="text-slate-400 font-normal">Click any marker to view centre details</span>
          </div>
          <MapView
            centres={filteredCentres}
            selectedCentreId={selectedCentre.id}
            onSelectCentre={setSelectedCentre}
            getCongestionLevel={getCongestionLevel}
          />
        </div>
      )}

      {/* Centre Cards List (if 'both' or 'cards') */}
      {(viewMode === 'both' || viewMode === 'cards') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>Showing {filteredCentres.length} Procurement Centres in Karnal District</span>
            <span>Sorted by: <strong className="text-slate-800">{sortBy.replace('_', ' ')}</strong></span>
          </div>

          {filteredCentres.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
              <p className="text-3xl mb-2">🔍</p>
              <h3 className="text-base font-bold text-slate-800">No Procurement Centres Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try clearing your search query or choosing "All Crops".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCrop('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-kisan-700 text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCentres.map(centre => {
                const congestion = getCongestionLevel(centre.waitingCount);
                return (
                  <CentreCard
                    key={centre.id}
                    centre={centre}
                    congestion={congestion}
                    isSelected={selectedCentre.id === centre.id}
                    onSelect={setSelectedCentre}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
