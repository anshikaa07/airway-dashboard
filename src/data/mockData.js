// ============================================================
// MOCK DATA — Airway Traffic Decision Dashboard
// Replace these with real API calls (FAA ASDI, FlightAware, etc.)
// ============================================================

// --- Live Flights ---
export const FLIGHTS = [
  { id: 'AA-1042', route: 'LAX → JFK', origin: 'LAX', dest: 'JFK', status: 'on-time',  delay: 0,    eta: '14:32', aircraft: 'B737', airline: 'American' },
  { id: 'UA-889',  route: 'ORD → MIA', origin: 'ORD', dest: 'MIA', status: 'delayed',  delay: 47,   eta: '15:19', aircraft: 'A320', airline: 'United' },
  { id: 'DL-2241', route: 'ATL → LAX', origin: 'ATL', dest: 'LAX', status: 'on-time',  delay: 0,    eta: '16:05', aircraft: 'B777', airline: 'Delta' },
  { id: 'SW-447',  route: 'DAL → DEN', origin: 'DAL', dest: 'DEN', status: 'delayed',  delay: 18,   eta: '13:48', aircraft: 'B737', airline: 'Southwest' },
  { id: 'B6-901',  route: 'JFK → BOS', origin: 'JFK', dest: 'BOS', status: 'on-time',  delay: 0,    eta: '12:55', aircraft: 'A320', airline: 'JetBlue' },
  { id: 'AA-3312', route: 'PHX → ORD', origin: 'PHX', dest: 'ORD', status: 'cancelled',delay: null, eta: 'N/A',   aircraft: 'B737', airline: 'American' },
  { id: 'UA-554',  route: 'SFO → DFW', origin: 'SFO', dest: 'DFW', status: 'delayed',  delay: 63,   eta: '17:22', aircraft: 'B787', airline: 'United' },
  { id: 'DL-777',  route: 'SEA → JFK', origin: 'SEA', dest: 'JFK', status: 'on-time',  delay: 5,    eta: '18:40', aircraft: 'A320', airline: 'Delta' },
  { id: 'WN-209',  route: 'LAS → LAX', origin: 'LAS', dest: 'LAX', status: 'on-time',  delay: 0,    eta: '13:12', aircraft: 'B737', airline: 'Southwest' },
  { id: 'AS-118',  route: 'PDX → SFO', origin: 'PDX', dest: 'SFO', status: 'delayed',  delay: 31,   eta: '14:07', aircraft: 'B737', airline: 'Alaska' },
  { id: 'F9-665',  route: 'DEN → ATL', origin: 'DEN', dest: 'ATL', status: 'on-time',  delay: 0,    eta: '16:55', aircraft: 'A320', airline: 'Frontier' },
  { id: 'NK-340',  route: 'MIA → ORD', origin: 'MIA', dest: 'ORD', status: 'cancelled',delay: null, eta: 'N/A',   aircraft: 'A320', airline: 'Spirit' },
];

// --- Airport Hub Data (for map) ---
export const AIRPORTS = [
  { code: 'LAX', name: 'Los Angeles',    x: 90,  y: 140, color: '#3b82f6', congestion: 72 },
  { code: 'JFK', name: 'New York JFK',   x: 380, y: 90,  color: '#ef4444', congestion: 91, alert: 'Storm' },
  { code: 'ORD', name: 'Chicago O\'Hare',x: 200, y: 105, color: '#10b981', congestion: 58 },
  { code: 'MIA', name: 'Miami',          x: 410, y: 130, color: '#3b82f6', congestion: 63 },
  { code: 'DFW', name: 'Dallas-Fort Worth', x: 285, y: 155, color: '#3b82f6', congestion: 44 },
  { code: 'DEN', name: 'Denver',         x: 150, y: 115, color: '#f59e0b', congestion: 67 },
  { code: 'SFO', name: 'San Francisco',  x: 70,  y: 110, color: '#f59e0b', congestion: 79 },
  { code: 'ATL', name: 'Atlanta',        x: 310, y: 140, color: '#3b82f6', congestion: 55 },
];

// --- Flight Routes (for SVG map) ---
export const ROUTES = [
  { from: { x: 90, y: 140 }, to: { x: 380, y: 90  }, color: 'rgba(59,130,246,0.4)',   label: 'LAX-JFK' },
  { from: { x: 200,y: 105 }, to: { x: 410, y: 130 }, color: 'rgba(16,185,129,0.4)',   label: 'ORD-MIA' },
  { from: { x: 90, y: 140 }, to: { x: 310, y: 140 }, color: 'rgba(245,158,11,0.35)',  label: 'LAX-ATL' },
  { from: { x: 150,y: 115 }, to: { x: 380, y: 90  }, color: 'rgba(139,92,246,0.4)',   label: 'DEN-JFK' },
  { from: { x: 70, y: 110 }, to: { x: 285, y: 155 }, color: 'rgba(6,182,212,0.35)',   label: 'SFO-DFW' },
];

// --- Congestion Heatmap ---
export const HEATMAP_AIRPORTS = ['JFK','LAX','ORD','ATL','DFW','DEN','SFO','MIA'];
export const HEATMAP_HOURS    = ['06','07','08','09','10','11','12','13'];

// --- Weather Alerts ---
export const WEATHER_ALERTS = [
  { icon: '⛈', airport: 'JFK', desc: 'Thunderstorms — Visibility 1.2 mi', impact: 'high',     temp: '64°F', wind: '32 kt' },
  { icon: '🌫', airport: 'SFO', desc: 'Dense Fog — 300 ft ceiling',          impact: 'moderate', temp: '58°F', wind: '8 kt'  },
  { icon: '❄',  airport: 'ORD', desc: 'Icing conditions — De-ice required',  impact: 'high',     temp: '28°F', wind: '18 kt' },
  { icon: '💨', airport: 'DFW', desc: 'Crosswind 28 kt — Above limits',       impact: 'moderate', temp: '72°F', wind: '28 kt' },
  { icon: '🌧', airport: 'MIA', desc: 'Heavy rain — Reduced capacity',        impact: 'low',      temp: '81°F', wind: '12 kt' },
];

// --- Aircraft Type Distribution ---
export const AIRCRAFT_TYPES = [
  { type: 'B737', count: 3726, pct: 38, color: '#3b82f6', desc: 'Boeing 737 family' },
  { type: 'A320', count: 2659, pct: 27, color: '#8b5cf6', desc: 'Airbus A320 family' },
  { type: 'B777', count: 1576, pct: 16, color: '#10b981', desc: 'Boeing 777' },
  { type: 'B787', count: 1182, pct: 12, color: '#f59e0b', desc: 'Boeing 787 Dreamliner' },
  { type: 'CRJ9', count:  704, pct: 7,  color: '#06b6d4', desc: 'Bombardier CRJ-900' },
];

// --- Delay Causes Breakdown ---
export const DELAY_CAUSES = [
  { label: 'Weather',     pct: 62, color: '#3b82f6' },
  { label: 'Air Traffic', pct: 21, color: '#8b5cf6' },
  { label: 'Carrier',     pct: 12, color: '#f59e0b' },
  { label: 'Security',    pct: 5,  color: '#ef4444' },
];

// --- KPI Defaults ---
export const KPI_DEFAULTS = {
  activeFlights: 9847,
  onTimeRate:    78.4,
  avgDelay:      23,
  cancellations: 142,
  weatherAlerts: 17,
};

// --- Helpers to generate chart data ---
export function generateHourlyData() {
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0') + ':00'
  );
  const departures = hours.map((_, i) =>
    Math.floor(200 + Math.sin(i / 4) * 80 + Math.random() * 40)
  );
  const arrivals = hours.map((_, i) =>
    Math.floor(190 + Math.sin(i / 4 + 1) * 70 + Math.random() * 40)
  );
  const onTimeRate = hours.map((_, i) =>
    Math.floor(65 + Math.sin(i / 3) * 12 + Math.random() * 8)
  );
  return { hours, departures, arrivals, onTimeRate };
}

export function generateDelayData() {
  const labels = Array.from({ length: 12 }, (_, i) =>
    String(i * 2).padStart(2, '0') + ':00'
  );
  const avgDelay      = labels.map(() => Math.floor(5  + Math.random() * 45));
  const cancellations = labels.map(() => Math.floor(Math.random() * 15));
  return { labels, avgDelay, cancellations };
}

export function generateHeatmapValue() {
  return Math.floor(20 + Math.random() * 80);
}
