import React, { useEffect, useRef } from 'react';
import { generateDelayData, DELAY_CAUSES } from '../data/mockData';
import './DelayAnalytics.css';

export default function DelayAnalytics() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Dynamically load Chart.js from CDN if not present
    const init = () => {
      const { labels, avgDelay, cancellations } = generateDelayData();
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new window.Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Avg Delay (min)',
              data: avgDelay,
              backgroundColor: 'rgba(239,68,68,0.6)',
              borderColor: '#ef4444',
              borderWidth: 1,
              borderRadius: 3,
            },
            {
              label: 'Cancellations',
              data: cancellations,
              backgroundColor: 'rgba(245,158,11,0.5)',
              borderColor: '#f59e0b',
              borderWidth: 1,
              borderRadius: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#475569', font: { size: 9 } }, grid: { display: false } },
            y: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
          },
        },
      });
    };

    if (window.Chart) {
      init();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">📊 Delay & Cancellation Analytics</div>
        <span className="badge badge-red">24h view</span>
      </div>

      <div className="chart-container" style={{ height: 180 }}>
        <canvas ref={canvasRef} role="img" aria-label="Delay analytics over 24 hours" />
      </div>

      <div className="delay-causes">
        <div className="delay-causes-title">Delay Causes</div>
        {DELAY_CAUSES.map(c => (
          <div key={c.label} className="delay-bar-row">
            <div className="delay-label">{c.label}</div>
            <div className="progress-bar-outer">
              <div
                className="progress-bar-inner"
                style={{ width: `${c.pct}%`, background: c.color }}
              />
            </div>
            <div className="delay-pct">{c.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
