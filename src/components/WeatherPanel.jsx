import React from 'react';
import { fetchWeather } from '../services/api';
import { useApi } from '../hooks/useApi';
import { getImpactStyle } from '../utils/helpers';
import { AIRCRAFT_TYPES } from '../data/mockData';
import './WeatherPanel.css';

export default function WeatherPanel() {
  const { data: alerts, loading, error } = useApi(fetchWeather, [], 10000);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">☁ Weather Impact Indicators</div>
        <span className="badge badge-red">{loading ? '…' : `${(alerts||[]).length} Active`}</span>
      </div>

      {error && <div className="db-status error">⚠ {error}</div>}

      <div className="weather-list">
        {(alerts || []).map(w => {
          const { bg, color } = getImpactStyle(w.impact);
          return (
            <div key={w._id || w.airport} className="weather-row">
              <div className="weather-icon">{w.icon}</div>
              <div className="weather-info">
                <div className="weather-airport">{w.airport}</div>
                <div className="weather-desc">{w.desc}</div>
              </div>
              <div className="weather-impact" style={{ background: bg, color }}>{w.impact}</div>
            </div>
          );
        })}
      </div>

      <hr className="divider" />

      <div className="aircraft-section">
        <div className="aircraft-title">Traffic Density by Aircraft Type</div>
        {AIRCRAFT_TYPES.map(a => (
          <div key={a.type} className="aircraft-row">
            <div className="aircraft-type">{a.type}</div>
            <div className="progress-bar-outer">
              <div className="progress-bar-inner" style={{ width: `${a.pct}%`, background: a.color }} />
            </div>
            <div className="aircraft-pct">{a.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
