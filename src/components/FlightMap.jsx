import React from 'react';
import { AIRPORTS, ROUTES } from '../data/mockData';
import './FlightMap.css';

export default function FlightMap() {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">
          ✈ Live Flight Tracking Map
          <span className="badge badge-blue">US Corridor</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="filter-btn active">US</button>
          <button className="filter-btn">Intl</button>
          <button className="filter-btn">All</button>
        </div>
      </div>

      <div className="map-area">
        <svg className="map-svg" viewBox="0 0 520 270" aria-label="US Flight Tracking Map">
          {/* Background */}
          <rect width="520" height="270" fill="#0d1829" />

          {/* US outline */}
          <path
            d="M60,80 L100,60 L160,50 L220,45 L280,50 L340,48 L400,55 L440,65
               L460,80 L455,120 L440,150 L420,170 L400,180 L380,185 L350,188
               L310,190 L280,185 L240,190 L200,195 L160,185 L130,175 L100,160
               L70,140 L55,110 Z"
            fill="#1a2235"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="1.5"
          />

          {/* State grid lines */}
          {[200, 280, 340].map(x => (
            <line key={x} x1={x} y1="45" x2={x + 5} y2="190"
              stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
          ))}
          <line x1="60" y1="120" x2="460" y2="120"
            stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />

          {/* Flight routes */}
          {ROUTES.map((r, i) => (
            <path
              key={i}
              d={`M${r.from.x},${r.from.y} Q${(r.from.x + r.to.x) / 2},${Math.min(r.from.y, r.to.y) - 30} ${r.to.x},${r.to.y}`}
              stroke={r.color}
              strokeWidth="1"
              fill="none"
              strokeDasharray="4,3"
            />
          ))}

          {/* Airport markers */}
          {AIRPORTS.map(ap => (
            <g key={ap.code}>
              <circle cx={ap.x} cy={ap.y} r={ap.alert ? 22 : 0}
                fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)"
                strokeWidth="1" strokeDasharray="3,2" />
              {ap.alert && (
                <text x={ap.x - 10} y={ap.y - 27} fill="#ef4444" fontSize="8" fontWeight="600">
                  ⚠ {ap.alert}
                </text>
              )}
              <circle cx={ap.x} cy={ap.y} r="5" fill={ap.color + 'cc'} stroke={ap.color} strokeWidth="1.5" />
              <text x={ap.x - 12} y={ap.y + 16} fill={ap.color} fontSize="9" fontWeight="700">
                {ap.code}
              </text>
            </g>
          ))}

          {/* Animated plane dots */}
          {[
            { cx: 180, cy: 112, fill: '#3b82f6', dur: '8s',  delay: '0s'  },
            { cx: 300, cy: 96,  fill: '#10b981', dur: '6s',  delay: '1s'  },
            { cx: 240, cy: 130, fill: '#f59e0b', dur: '10s', delay: '3s'  },
            { cx: 350, cy: 105, fill: '#8b5cf6', dur: '7s',  delay: '2s'  },
            { cx: 130, cy: 125, fill: '#06b6d4', dur: '9s',  delay: '4s'  },
          ].map((p, i) => (
            <circle
              key={i}
              cx={p.cx} cy={p.cy} r="3.5"
              fill={p.fill} opacity="0.9"
              style={{
                animation: `plane-move ${p.dur} ${p.delay} infinite alternate ease-in-out`
              }}
            />
          ))}

          {/* Legend */}
          <rect x="10" y="215" width="130" height="48" rx="4"
            fill="rgba(10,14,26,0.85)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
          {[
            { color: '#3b82f6', label: 'On time' },
            { color: '#f59e0b', label: 'Delayed' },
            { color: '#ef4444', label: 'Alert / Cancelled' },
          ].map((l, i) => (
            <g key={l.label}>
              <circle cx="22" cy={228 + i * 12} r="3" fill={l.color} />
              <text x="28" y={231 + i * 12} fill="#94a3b8" fontSize="8">{l.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
