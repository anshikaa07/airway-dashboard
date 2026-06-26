// ============================================================
// API SERVICE LAYER
// All HTTP calls to the Express/MongoDB backend live here.
// Change BASE_URL to point to your deployed server.
// ============================================================

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Generic fetch wrapper with error handling
async function apiFetch(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json.data;
}

// ── Flights ─────────────────────────────────────────────────
export const fetchFlights     = (params = '') => apiFetch(`/flights${params}`);
export const fetchFlightStats = ()            => apiFetch('/flights/stats/summary');
export const fetchByStatus    = ()            => apiFetch('/flights/stats/by-status');

// ── Airports ────────────────────────────────────────────────
export const fetchAirports    = ()            => apiFetch('/airports');
export const fetchHeatmap     = ()            => apiFetch('/airports/heatmap');

// ── Weather ─────────────────────────────────────────────────
export const fetchWeather     = ()            => apiFetch('/weather');

// ── KPI Snapshots (for charts) ───────────────────────────────
export const fetchKpiSnapshots = (hours = 24) => apiFetch(`/airports/kpi/snapshots?hours=${hours}`);

// ── Health check ─────────────────────────────────────────────
export const checkHealth = () => apiFetch('/health').catch(() => ({ status: 'offline' }));
