import React from 'react';
import { fetchFlights } from '../services/api';
import { useApi } from '../hooks/useApi';
import { getStatusColor, formatDelay } from '../utils/helpers';
import './FlightMonitor.css';

export default function FlightMonitor() {
  const { data: flights, loading, error } = useApi(fetchFlights, [], 5000);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">⚡ Live Flight Monitor</div>
        <span className="badge badge-green">MongoDB · 5s refresh</span>
      </div>

      {loading && <div className="db-status loading">Loading from database…</div>}
      {error   && <div className="db-status error">⚠ {error} — check server</div>}

      <div className="flight-scroll scroll-area">
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flight</th><th>Route</th><th>Status</th><th>Delay</th><th>ETA</th>
            </tr>
          </thead>
          <tbody>
            {(flights || []).map(f => (
              <tr key={f.flightId || f._id}>
                <td><span className="flight-id">{f.flightId}</span></td>
                <td className="flight-route">{f.route}</td>
                <td>
                  <span className={`status-dot status-${f.status === 'on-time' ? 'on-time' : f.status}`} />
                  <span style={{ fontSize: 11, color: getStatusColor(f.status) }}>{f.status}</span>
                </td>
                <td className={`flight-delay${f.delay ? ' has-delay' : ''}`}>{formatDelay(f.delay)}</td>
                <td className="flight-eta">{f.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
