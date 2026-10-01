import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ProcurementCentre, CongestionLevel } from '../types';

interface MapViewProps {
  centres: ProcurementCentre[];
  selectedCentreId?: string;
  onSelectCentre?: (centre: ProcurementCentre) => void;
  getCongestionLevel: (waitingCount: number) => CongestionLevel;
}

export const MapView: React.FC<MapViewProps> = ({
  centres,
  selectedCentreId,
  onSelectCentre,
  getCongestionLevel,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Demo Farmer Location: Rampur Village (near Karnal)
  const farmerLoc: [number, number] = [29.6700, 77.0150];

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Map centered near Karnal agricultural belt
    const map = L.map(mapContainerRef.current, {
      center: [29.6857, 76.9905],
      zoom: 11,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Custom Icon Generator
    const createCustomIcon = (color: string, label: string, isFarmer: boolean = false) => {
      const svg = isFarmer
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="42" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${color}" stroke="#ffffff" stroke-width="1.5"/><circle cx="12" cy="9" r="3.5" fill="#ffffff"/></svg>`;

      return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="position:relative;display:flex;flex-direction:column;align-items:center;">
          ${svg}
          <span style="background:rgba(15,23,42,0.85);color:white;font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px;white-space:nowrap;margin-top:2px;box-shadow:0 2px 4px rgba(0,0,0,0.2);">${label}</span>
        </div>`,
        iconSize: [36, 48],
        iconAnchor: [18, isFarmer ? 18 : 42],
        popupAnchor: [0, -38],
      });
    };

    // Add Farmer Marker
    const farmerMarker = L.marker(farmerLoc, {
      icon: createCustomIcon('#2563eb', '👨🌾 You (Ramesh)', true),
    }).addTo(map);
    farmerMarker.bindPopup(`
      <div style="font-family:sans-serif;padding:4px;">
        <h4 style="font-weight:700;margin:0 0 4px 0;color:#1e3a8a;">👨🌾 Your Location</h4>
        <p style="font-size:12px;margin:0;color:#475569;">Rampur Village, Karnal</p>
      </div>
    `);

    // Add Centre Markers
    centres.forEach(centre => {
      const congestion = getCongestionLevel(centre.waitingCount);
      const color =
        congestion === 'LOW' ? '#16a34a' : congestion === 'MODERATE' ? '#d97706' : '#dc2626';

      const marker = L.marker([centre.latitude, centre.longitude], {
        icon: createCustomIcon(color, centre.name.split(' (')[0]),
      }).addTo(map);

      const popupHtml = `
        <div style="font-family:sans-serif;padding:4px;min-width:180px;">
          <h4 style="font-weight:700;margin:0 0 4px 0;color:#0f172a;font-size:13px;">${centre.name}</h4>
          <p style="font-size:11px;margin:2px 0;color:#64748b;">📍 ${centre.distanceKm} km away</p>
          <p style="font-size:11px;margin:2px 0;color:${color};font-weight:600;">Status: ${congestion} Congestion</p>
          <p style="font-size:11px;margin:2px 0;color:#334155;">👥 ${centre.waitingCount} farmers waiting (~${centre.waitingCount * centre.avgProcessingMinutes}m)</p>
          <p style="font-size:11px;margin:2px 0;color:#15803d;font-weight:600;">📅 ${Math.max(0, centre.capacity - centre.bookedCount)} slots available</p>
        </div>
      `;
      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        if (onSelectCentre) onSelectCentre(centre);
      });

      markersRef.current[centre.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [centres, getCongestionLevel, onSelectCentre]);

  // Center on selected centre
  useEffect(() => {
    if (selectedCentreId && mapInstanceRef.current && markersRef.current[selectedCentreId]) {
      const target = centres.find(c => c.id === selectedCentreId);
      if (target) {
        mapInstanceRef.current.setView([target.latitude, target.longitude], 12);
        markersRef.current[selectedCentreId].openPopup();
      }
    }
  }, [selectedCentreId, centres]);

  return (
    <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs relative">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 z-[400] bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200 shadow-xs text-[11px] font-medium text-slate-700 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 border-b border-slate-100 pb-1">
          <span>Map Legend</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span>Your Location</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span>Low Congestion</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
          <span>Moderate Congestion</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
          <span>High Congestion</span>
        </div>
      </div>
    </div>
  );
};
