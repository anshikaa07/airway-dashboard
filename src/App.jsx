import React from 'react';
import Header            from './components/Header';
import NavBar            from './components/NavBar';
import KPIRow            from './components/KPIRow';
import FlightMap         from './components/FlightMap';
import FlightMonitor     from './components/FlightMonitor';
import CongestionHeatmap from './components/CongestionHeatmap';
import DelayAnalytics    from './components/DelayAnalytics';
import WeatherPanel      from './components/WeatherPanel';
import TrafficChart      from './components/TrafficChart';
import './styles/index.css';
import './styles/components.css';
import './App.css';

export default function App() {
  return (
    <div className="app">
      {/* ── Sticky Header ── */}
      <Header />

      {/* ── Navigation Tabs ── */}
      <NavBar onTabChange={(tab) => console.log('Tab:', tab)} />

      {/* ── Main Content ── */}
      <main className="main-content">

        {/* Row 1 — KPI Cards */}
        <KPIRow />

        {/* Row 2 — Map + Live Flight Monitor */}
        <div className="grid-2col">
          <FlightMap />
          <FlightMonitor />
        </div>

        {/* Row 3 — Heatmap + Delay Analytics + Weather */}
        <div className="grid-3col">
          <CongestionHeatmap />
          <DelayAnalytics />
          <WeatherPanel />
        </div>

        {/* Row 4 — Traffic Chart (full width) */}
        <TrafficChart />

      </main>
    </div>
  );
}
