// ============================================================
// SEED SCRIPT — Populates MongoDB with initial dashboard data
// Run: npm run seed  (from /server directory)
// ============================================================
require('dotenv').config({ path: '../.env.example' });
// Override with actual .env if present
try { require('dotenv').config(); } catch {}

const mongoose    = require('mongoose');
const Flight      = require('../models/Flight');
const Airport     = require('../models/Airport');
const WeatherAlert= require('../models/WeatherAlert');
const KpiSnapshot = require('../models/KpiSnapshot');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/airway_dashboard';

// ── Seed Data ───────────────────────────────────────────────

const AIRPORTS_DATA = [
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles',  state: 'CA', lat: 33.9425, lng: -118.4081, congestion: 72, delayAvg: 18, departures: 142, arrivals: 138 },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', state: 'NY', lat: 40.6413, lng: -73.7781,  congestion: 91, delayAvg: 41, departures: 98,  arrivals: 102, weatherAlert: 'Storm' },
  { code: 'ORD', name: "Chicago O'Hare International", city: 'Chicago',   state: 'IL', lat: 41.9742, lng: -87.9073,  congestion: 58, delayAvg: 12, departures: 201, arrivals: 197 },
  { code: 'MIA', name: 'Miami International',          city: 'Miami',     state: 'FL', lat: 25.7959, lng: -80.2870,  congestion: 63, delayAvg: 22, departures: 87,  arrivals: 90  },
  { code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas', state: 'TX', lat: 32.8998, lng: -97.0403,  congestion: 44, delayAvg: 8,  departures: 176, arrivals: 171 },
  { code: 'DEN', name: 'Denver International',         city: 'Denver',    state: 'CO', lat: 39.8561, lng: -104.6737, congestion: 67, delayAvg: 25, departures: 119, arrivals: 122 },
  { code: 'SFO', name: 'San Francisco International',  city: 'San Francisco', state: 'CA', lat: 37.6213, lng: -122.3790, congestion: 79, delayAvg: 35, departures: 104, arrivals: 101 },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta',   city: 'Atlanta',   state: 'GA', lat: 33.6407, lng: -84.4277,  congestion: 55, delayAvg: 14, departures: 233, arrivals: 229 },
];

const FLIGHTS_DATA = [
  { flightId: 'AA-1042', airline: 'American',  origin: 'LAX', dest: 'JFK', route: 'LAX → JFK', aircraft: 'B737', status: 'on-time',  delay: 0,    eta: '14:32', altitude: 35000, speed: 490 },
  { flightId: 'UA-889',  airline: 'United',    origin: 'ORD', dest: 'MIA', route: 'ORD → MIA', aircraft: 'A320', status: 'delayed',  delay: 47,   eta: '15:19', altitude: 32000, speed: 465 },
  { flightId: 'DL-2241', airline: 'Delta',     origin: 'ATL', dest: 'LAX', route: 'ATL → LAX', aircraft: 'B777', status: 'on-time',  delay: 0,    eta: '16:05', altitude: 37000, speed: 510 },
  { flightId: 'SW-447',  airline: 'Southwest', origin: 'DAL', dest: 'DEN', route: 'DAL → DEN', aircraft: 'B737', status: 'delayed',  delay: 18,   eta: '13:48', altitude: 28000, speed: 445 },
  { flightId: 'B6-901',  airline: 'JetBlue',   origin: 'JFK', dest: 'BOS', route: 'JFK → BOS', aircraft: 'A320', status: 'on-time',  delay: 0,    eta: '12:55', altitude: 18000, speed: 420 },
  { flightId: 'AA-3312', airline: 'American',  origin: 'PHX', dest: 'ORD', route: 'PHX → ORD', aircraft: 'B737', status: 'cancelled',delay: 0,    eta: 'N/A',   altitude: 0,     speed: 0   },
  { flightId: 'UA-554',  airline: 'United',    origin: 'SFO', dest: 'DFW', route: 'SFO → DFW', aircraft: 'B787', status: 'delayed',  delay: 63,   eta: '17:22', altitude: 36000, speed: 505 },
  { flightId: 'DL-777',  airline: 'Delta',     origin: 'SEA', dest: 'JFK', route: 'SEA → JFK', aircraft: 'A320', status: 'on-time',  delay: 5,    eta: '18:40', altitude: 38000, speed: 520 },
  { flightId: 'WN-209',  airline: 'Southwest', origin: 'LAS', dest: 'LAX', route: 'LAS → LAX', aircraft: 'B737', status: 'on-time',  delay: 0,    eta: '13:12', altitude: 22000, speed: 430 },
  { flightId: 'AS-118',  airline: 'Alaska',    origin: 'PDX', dest: 'SFO', route: 'PDX → SFO', aircraft: 'B737', status: 'delayed',  delay: 31,   eta: '14:07', altitude: 25000, speed: 450 },
  { flightId: 'F9-665',  airline: 'Frontier',  origin: 'DEN', dest: 'ATL', route: 'DEN → ATL', aircraft: 'A320', status: 'on-time',  delay: 0,    eta: '16:55', altitude: 35000, speed: 490 },
  { flightId: 'NK-340',  airline: 'Spirit',    origin: 'MIA', dest: 'ORD', route: 'MIA → ORD', aircraft: 'A320', status: 'cancelled',delay: 0,    eta: 'N/A',   altitude: 0,     speed: 0   },
  { flightId: 'AA-2201', airline: 'American',  origin: 'DFW', dest: 'LAX', route: 'DFW → LAX', aircraft: 'B777', status: 'on-time',  delay: 0,    eta: '15:44', altitude: 36000, speed: 505 },
  { flightId: 'UA-1120', airline: 'United',    origin: 'DEN', dest: 'JFK', route: 'DEN → JFK', aircraft: 'B737', status: 'delayed',  delay: 22,   eta: '16:10', altitude: 34000, speed: 480 },
  { flightId: 'DL-880',  airline: 'Delta',     origin: 'SFO', dest: 'ATL', route: 'SFO → ATL', aircraft: 'B787', status: 'on-time',  delay: 0,    eta: '17:30', altitude: 38000, speed: 515 },
];

const WEATHER_DATA = [
  { airport: 'JFK', icon: '⛈', condition: 'Thunderstorms', desc: 'Thunderstorms — Visibility 1.2 mi', impact: 'high',     temp: '64°F', wind: '32 kt', visibility: '1.2 mi', active: true },
  { airport: 'SFO', icon: '🌫', condition: 'Dense Fog',     desc: 'Dense Fog — 300 ft ceiling',        impact: 'moderate', temp: '58°F', wind: '8 kt',  visibility: '0.5 mi', active: true },
  { airport: 'ORD', icon: '❄',  condition: 'Icing',         desc: 'Icing conditions — De-ice required', impact: 'high',     temp: '28°F', wind: '18 kt', visibility: '3 mi',   active: true },
  { airport: 'DFW', icon: '💨', condition: 'High Winds',    desc: 'Crosswind 28 kt — Above limits',     impact: 'moderate', temp: '72°F', wind: '28 kt', visibility: '8 mi',   active: true },
  { airport: 'MIA', icon: '🌧', condition: 'Heavy Rain',    desc: 'Heavy rain — Reduced capacity',      impact: 'low',      temp: '81°F', wind: '12 kt', visibility: '4 mi',   active: true },
];

// Generate 24h of KPI snapshots
function generateKpiHistory() {
  const snapshots = [];
  const now = Date.now();
  for (let i = 23; i >= 0; i--) {
    const ts = new Date(now - i * 60 * 60 * 1000);
    snapshots.push({
      activeFlights: Math.floor(8000 + Math.sin(i / 4) * 1000 + Math.random() * 500),
      onTimeRate:    +(65 + Math.sin(i / 3) * 12 + Math.random() * 5).toFixed(1),
      avgDelay:      Math.floor(10 + Math.cos(i / 4) * 8 + Math.random() * 10),
      cancellations: Math.floor(80 + Math.random() * 60),
      weatherAlerts: 17,
      departures:    Math.floor(200 + Math.sin(i / 4) * 80 + Math.random() * 40),
      arrivals:      Math.floor(190 + Math.sin(i / 4 + 1) * 70 + Math.random() * 40),
      timestamp:     ts,
      hour:          ts.getHours(),
    });
  }
  return snapshots;
}

// ── Run Seed ─────────────────────────────────────────────────
async function seed() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected.');

    // Clear existing
    console.log('🗑  Clearing old data...');
    await Promise.all([
      Flight.deleteMany({}),
      Airport.deleteMany({}),
      WeatherAlert.deleteMany({}),
      KpiSnapshot.deleteMany({}),
    ]);

    // Insert fresh data
    console.log('📦 Inserting airports...');
    await Airport.insertMany(AIRPORTS_DATA);

    console.log('✈  Inserting flights...');
    await Flight.insertMany(FLIGHTS_DATA);

    console.log('☁  Inserting weather alerts...');
    await WeatherAlert.insertMany(WEATHER_DATA);

    console.log('📊 Inserting 24h KPI history...');
    await KpiSnapshot.insertMany(generateKpiHistory());

    console.log('\n✅ Seed complete!');
    console.log(`   Airports:      ${AIRPORTS_DATA.length}`);
    console.log(`   Flights:       ${FLIGHTS_DATA.length}`);
    console.log(`   Weather alerts:${WEATHER_DATA.length}`);
    console.log(`   KPI snapshots: 24`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
