import React from 'react';
import { fetchFlightStats, fetchWeather } from '../services/api';
import { useApi } from '../hooks/useApi';
import './KPIRow.css';

export default function KPIRow() {
  const { data: stats,   loading: sl } = useApi(fetchFlightStats, null, 5000);
  const { data: weather, loading: wl } = useApi(fetchWeather,     [],   10000);

  const activeFlights = stats?.totalFlights  ?? '—';
  const onTimeRate    = stats?.onTimeRate     ?? '—';
  const avgDelay      = stats?.avgDelayMins != null ? Math.round(stats.avgDelayMins) : '—';
  const cancellations = stats?.cancelled     ?? '—';
  const weatherAlerts = weather?.length      ?? '—';

  const cards = [
    { label: 'Active Flights',  value: sl ? '…' : activeFlights.toLocaleString?.() ?? activeFlights, delta: '↑ Live count',       dir: 'positive', color: 'blue'   },
    { label: 'On-Time Rate',    value: sl ? '…' : onTimeRate + '%',                                    delta: 'From DB aggregate',  dir: onTimeRate < 75 ? 'negative' : 'positive', color: 'green'  },
    { label: 'Avg Delay',       value: sl ? '…' : avgDelay + 'm',                                      delta: 'Current average',    dir: avgDelay > 20 ? 'negative' : 'neutral',    color: 'red'    },
    { label: 'Cancellations',   value: sl ? '…' : cancellations.toString(),                             delta: 'Active flights',     dir: 'neutral',  color: 'amber'  },
    { label: 'Weather Alerts',  value: wl ? '…' : weatherAlerts.toString(),                             delta: 'Active alerts',      dir: weatherAlerts > 10 ? 'negative' : 'neutral', color: 'purple' },
  ];

  return (
    <div className="kpi-row grid-kpi">
      {cards.map(c => (
        <div key={c.label} className={`kpi-card ${c.color}`}>
          <div className="kpi-label">{c.label}</div>
          <div className="kpi-value">{c.value}</div>
          <div className={`kpi-delta ${c.dir}`}>{c.delta}</div>
        </div>
      ))}
    </div>
  );
}
