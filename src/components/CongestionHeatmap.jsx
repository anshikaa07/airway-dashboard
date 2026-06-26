import React, { useState, useEffect } from 'react';
import { fetchAirports } from '../services/api';
import { useApi } from '../hooks/useApi';
import { getHeatColor } from '../utils/helpers';
import { HEATMAP_HOURS, generateHeatmapValue } from '../data/mockData';
import './CongestionHeatmap.css';

export default function CongestionHeatmap() {
  const { data: airports, loading, error } = useApi(fetchAirports, [], 10000);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    if (!airports || airports.length === 0) return;
    // Build a time-series grid: each airport × each hour
    setGrid(
      airports.map(ap => ({
        airport: ap.code,
        values: HEATMAP_HOURS.map((_, i) => {
          // Use real congestion for current hour, simulate others
          const currentHour = new Date().getHours();
          const hourIdx = parseInt(HEATMAP_HOURS[i]);
          return Math.abs(hourIdx - currentHour) <= 1
            ? ap.congestion                      // real value from MongoDB
            : generateHeatmapValue();            // simulated for other hours
        }),
      }))
    );
  }, [airports]);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">🌡 Airport Congestion Heatmap</div>
        <span className="badge badge-amber">MongoDB · Live</span>
      </div>

      {error && <div className="db-status error">⚠ {error}</div>}

      <div className="heatmap-header-row">
        <div className="heatmap-ap-col" />
        {HEATMAP_HOURS.map(h => <div key={h} className="heatmap-hour">{h}</div>)}
      </div>

      {loading
        ? <div className="db-status loading">Loading congestion data…</div>
        : grid.map(row => (
            <div key={row.airport} className="heatmap-row">
              <div className="heatmap-ap-label">{row.airport}</div>
              {row.values.map((v, i) => {
                const { bg, color } = getHeatColor(v);
                return (
                  <div key={i} className="heat-cell" style={{ background: bg, color }}
                    title={`${row.airport} ${HEATMAP_HOURS[i]}:00 — ${v}% capacity`}>
                    {v}
                  </div>
                );
              })}
            </div>
          ))
      }

      <div className="heatmap-legend">
        {[['#1e3a5f','Low'],['#1d6a9f','Moderate'],['#b45309','High'],['#991b1b','Critical']].map(([bg,label])=>(
          <div key={label} className="legend-item">
            <div className="legend-swatch" style={{ background: bg }} /><span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
