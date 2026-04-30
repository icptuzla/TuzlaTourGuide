import type { StyleSpecification } from 'maplibre-gl';

const OFFLINE_BUILDING_SOURCES = [
  '/MAP/overture-2026-03-18.0-building-18.669,44.534,18.692,44.546.geojson',
  '/MAP/overture-2026-03-18.0-building-18.672,44.530,18.695,44.542.geojson',
  '/MAP/overture-2026-03-18.0-building_part-18.669,44.534,18.692,44.546.geojson',
  '/MAP/overture-2026-03-18.0-building_part-18.672,44.530,18.695,44.542.geojson',
];

export const createOfflineMapStyle = (): StyleSpecification => {
  const style: StyleSpecification = {
    version: 8,
    name: 'tuzla-offline-3d',
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      'offline-tiles': {
        type: 'raster',
        tiles: ['/MAP/tiles/{z}/{x}/{y}.png'],
        tileSize: 256,
        minzoom: 14,
        maxzoom: 18,
      },
    },
    layers: [
      { id: 'background', type: 'background', paint: { 'background-color': '#0f172a' } },
      { id: 'offline-raster', type: 'raster', source: 'offline-tiles' },
    ],
  };

  OFFLINE_BUILDING_SOURCES.forEach((src, index) => {
    const sourceId = `offline-buildings-${index}`;
    const layerId = `offline-buildings-fill-${index}`;
    style.sources[sourceId] = { type: 'geojson', data: src };
    style.layers.push({
      id: layerId,
      type: 'fill-extrusion',
      source: sourceId,
      paint: {
        'fill-extrusion-color': '#94a3b8',
        'fill-extrusion-height': ['coalesce', ['get', 'height'], 12],
        'fill-extrusion-base': ['coalesce', ['get', 'min_height'], 0],
        'fill-extrusion-opacity': 0.75,
      },
    });
  });

  return style;
};
