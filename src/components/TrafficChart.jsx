import React, { useEffect, useRef, useState } from 'react';
import { fetchKpiSnapshots } from '../services/api';
import { useApi } from '../hooks/useApi';

const SERIES = ['Departures', 'Arrivals', 'On-Time %'];

export default function TrafficChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);
  const [active, setActive] = useState([true, true, true]);
  const { data: snapshots, loading } = useApi(fetchKpiSnapshots, [], 10000);

  const toggleSeries = (i) => {
    const next = [...active];
    next[i] = !next[i];
    setActive(next);
    if (chartRef.current) {
      const meta = chartRef.current.getDatasetMeta(i);
      meta.hidden = !next[i];
      chartRef.current.update();
    }
  };

  useEffect(() => {
    if (!snapshots || !canvasRef.current) return;

    const buildChart = () => {
      const labels     = snapshots.map(s => new Date(s.timestamp).getHours() + ':00');
      const departures = snapshots.map(s => s.departures || 0);
      const arrivals   = snapshots.map(s => s.arrivals   || 0);
      const onTimeRate = snapshots.map(s => s.onTimeRate  || 0);

      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new window.Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: [
            { label: 'Departures', data: departures, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
            { label: 'Arrivals',   data: arrivals,   borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 },
            { label: 'On-Time %',  data: onTimeRate, borderColor: '#f59e0b', yAxisID: 'y2', tension: 0.4, pointRadius: 0, borderWidth: 1.5, borderDash: [4,3], fill: false },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(10,14,26,0.95)', titleColor: '#e2e8f0', bodyColor: '#94a3b8', borderColor: 'rgba(59,130,246,0.3)', borderWidth: 1 } },
          scales: {
            x:  { ticks: { color: '#475569', font: { size: 10 }, maxTicksLimit: 8 }, grid: { color: 'rgba(255,255,255,0.04)' } },
            y:  { ticks: { color: '#475569', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.06)' }, position: 'left' },
            y2: { ticks: { color: '#f59e0b', font: { size: 10 }, callback: v => v + '%' }, grid: { display: false }, position: 'right' },
          },
        },
      });
    };

    if (window.Chart) buildChart();
    else {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
      s.onload = buildChart;
      document.head.appendChild(s);
    }

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [snapshots]);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">📈 Traffic Volume & On-Time Performance — MongoDB 24h</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {SERIES.map((s, i) => (
            <button key={s} className={`filter-btn${active[i] ? ' active' : ''}`} onClick={() => toggleSeries(i)}>{s}</button>
          ))}
        </div>
      </div>
      {loading && <div className="db-status loading">Loading chart data…</div>}
      <div className="chart-container" style={{ height: 160 }}>
        <canvas ref={canvasRef} role="img" aria-label="24h traffic from MongoDB" />
      </div>
    </div>
  );
}
