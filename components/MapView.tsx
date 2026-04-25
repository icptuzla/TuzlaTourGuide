import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Language } from '../types';
import { TUZLA_CENTER } from '../constants';
import { AppFeatures } from '../utils/platform';
import { tuzlaHotelData, HotelData } from '../tuzlaHotelData';
import { WeatherWidget } from './WeatherWidget';

interface MapViewProps {
  lang: Language;
  features: AppFeatures;
}

const MapView: React.FC<MapViewProps> = ({ lang, features }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const userMarker = useRef<maplibregl.Marker | null>(null);
  const [zoom, setZoom] = useState(17);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.jawg.io/styles/jawg-sunny.json?access-token=MJ1UjbO1irardUqAtZPQAzlWULZIZAFIsQdTrqkdC9bA34vgAGVMi20z7kP9ZRWX`,
      center: [TUZLA_CENTER[1], TUZLA_CENTER[0]], // MapLibre uses [lng, lat]
      zoom: zoom,
      pitch: 75, // Steep 3D angle
      bearing: -15, // Slight rotation for better perspective
    });

    map.current.on('load', () => {
      setIsLoaded(true);

      // Add a scale control
      map.current?.addControl(new maplibregl.ScaleControl(), 'bottom-left');

      // Add hotel markers
      tuzlaHotelData.forEach((hotel: HotelData) => {
        if (!hotel.latitude || !hotel.longitude) return;

        const el = document.createElement('div');
        el.className = 'hotel-marker-container';
        el.style.cursor = 'pointer';
        
        // Premium Teardrop Pin Shape for hotels (matching MapQuestView)
        el.innerHTML = `
          <div style="position: relative; width: 44px; height: 56px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));">
            <svg viewBox="0 0 44 56" style="width: 100%; height: 100%; fill: #1e40af;">
              <path d="M22 0C9.8 0 0 9.8 0 22C0 38.5 22 56 22 56C22 56 44 38.5 44 22C44 9.8 34.2 0 22 0Z" />
              <circle cx="22" cy="22" r="18" fill="white" fill-opacity="0.2" />
            </svg>
            <div style="position: absolute; top: 6px; left: 50%; translate: -50% 0; width: 32px; height: 32px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
              <img src="/assets/Gallery/QuestQRLocations/hotel.svg" alt="Hotel" style="width: 20px; height: 20px;" />
            </div>
          </div>`;

        const popup = new maplibregl.Popup({ offset: 30 })
          .setHTML(`
            <div style="padding: 16px; font-family: 'Quicksand', sans-serif; background: #0f172a; color: white; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
              <h3 style="margin: 0; font-size: 16px; font-weight: 900; color: #60a5fa;">${hotel.name}</h3>
              <p style="margin: 4px 0 12px 0; font-size: 11px; color: #94a3b8; line-height: 1.4;">
                🏨 Hotel &bull; ⭐ ${hotel.rating} (${hotel.user_ratings_total})
              </p>
              ${hotel.phone ? `<p style="margin: 0; font-size: 10px; color: #60a5fa; font-weight: 700;">📞 ${hotel.phone}</p>` : ''}
              ${hotel.website ? `
                <a href="${hotel.website}" target="_blank" rel="noopener noreferrer" 
                   style="font-size: 11px; color: white; text-decoration: none; font-weight: 900; display: block; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.1em; background: #1e40af; padding: 10px; border-radius: 12px; text-align: center; box-shadow: 0 10px 20px rgba(30,64,175,0.4);">
                  Visit Website →
                </a>` : ''}
            </div>
          `);

        new maplibregl.Marker(el)
          .setLngLat([hotel.longitude, hotel.latitude])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    map.current?.on('zoom', () => {
      setZoom(map.current?.getZoom() || 0);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Geolocation effect
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    let watchId: number;

    const startTracking = () => {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          if (!userMarker.current) {
            const el = document.createElement('div');
            el.innerHTML = `<div style="background:#3b82f6;width:24px;height:24px;border-radius:50%;border:3px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 20px rgba(59,130,246,0.6);"><div style="width:8px;height:8px;background:#fff;border-radius:50%;" /></div>`;
            userMarker.current = new maplibregl.Marker(el)
              .setLngLat([longitude, latitude])
              .addTo(map.current!);

            // Fly to user location on first GPS hit
            map.current.flyTo({ center: [longitude, latitude], zoom: 16 });
          } else {
            userMarker.current.setLngLat([longitude, latitude]);
          }
        },
        (err) => console.error(err),
        { enableHighAccuracy: features.mapGpsHighAccuracy }
      );
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        startTracking();
      } else {
        if (watchId) navigator.geolocation.clearWatch(watchId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    if (document.visibilityState === 'visible') {
      startTracking();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isLoaded, features.mapGpsHighAccuracy]);

  return (
    <div className="h-[calc(100vh-64px)] w-full relative flex flex-col">
      <WeatherWidget className="bottom-4 right-4 top-auto" />

      {/* Map Layer Controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-1 sm:gap-2 w-max">
        <div className="flex items-center gap-0.5 px-3 py-1.5 rounded-full backdrop-blur-md border border-blue-400 bg-blue-600 text-white shadow-lg">
          <span className="text-sm">🏨</span>
          <span className="text-[11px] font-black uppercase tracking-widest font-quicksand">
            {lang === 'bs' ? 'Hoteli' : 'Hotels'}
          </span>
        </div>
      </div>

      {/* Map Pitch Slider */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg border border-blue-200">
        <span className="text-[10px] font-black text-blue-800 uppercase" style={{ writingMode: 'vertical-rl' }}>3D</span>
        <input 
          type="range" min="30" max="90" 
          defaultValue="75"
          onChange={(e) => map.current?.setPitch(parseInt(e.target.value))}
          className="appearance-none bg-blue-200 rounded-full h-24 w-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ appearance: 'slider-vertical' as any, WebkitAppearance: 'slider-vertical', writingMode: 'vertical-rl' }}
        />
      </div>

      <div ref={mapContainer} className="flex-grow w-full h-full" />
    </div>
  );
};

export default MapView;
