import React, { useState, useEffect } from 'react';
import { getUTCTime } from '../utils/helpers';
import './Header.css';

export default function Header() {
  const [time, setTime]       = useState(getUTCTime());
  const [activeView, setView] = useState('overview');

  useEffect(() => {
    const id = setInterval(() => setTime(getUTCTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-icon">✈</div>
        <div>
          <div className="logo-text">
            AirTraffic<span className="logo-accent">Decision</span>
          </div>
          <div className="logo-sub">Live Operations Dashboard</div>
        </div>
      </div>

      <div className="header-right">
        <div className="live-badge">
          <span className="live-pulse" />
          LIVE DATA
        </div>
        <div className="header-clock">{time}</div>
        <div className="header-views">
          {['overview', 'analytics'].map(v => (
            <button
              key={v}
              className={`filter-btn${activeView === v ? ' active' : ''}`}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
