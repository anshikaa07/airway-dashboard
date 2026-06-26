// ============================================================
// SERVER ENTRY POINT
// Express + MongoDB + Live Data Simulation
// ============================================================
require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const morgan    = require('morgan');
const connectDB = require('./config/db');

// Models (for live simulation)
const Flight      = require('./models/Flight');
const Airport     = require('./models/Airport');
const KpiSnapshot = require('./models/KpiSnapshot');
const WeatherAlert= require('./models/WeatherAlert');

// Route files
const flightRoutes  = require('./routes/flights');
const airportRoutes = require('./routes/airports');
const weatherRoutes = require('./routes/weather');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB ──────────────────────────────────────
connectDB();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// ── Routes ──────────────────────────────────────────────────
app.use('/api/flights',  flightRoutes);
app.use('/api/airports', airportRoutes);
app.use('/api/weather',  weatherRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    db: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message || 'Server Error' });
});

// ── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API base: http://localhost:${PORT}/api`);

  // Start live data simulation after DB connects
  setTimeout(startLiveSimulation, 3000);
});

// ── Live Data Simulation ────────────────────────────────────
// Mimics a WebSocket feed from FAA ASDI or FlightAware
// Replace this block with real API polling in production

const STATUSES = ['on-time', 'on-time', 'on-time', 'delayed', 'delayed', 'cancelled'];

async function startLiveSimulation() {
  const INTERVAL = parseInt(process.env.DATA_REFRESH_INTERVAL) || 5000;
  console.log(`⚡ Live simulation started (every ${INTERVAL / 1000}s)`);

  setInterval(async () => {
    try {
      // 1. Randomly update a few flight statuses
      const flights = await Flight.find().lean();
      if (flights.length > 0) {
        const toUpdate = flights.slice(0, Math.ceil(flights.length * 0.3)); // update 30%
        for (const f of toUpdate) {
          const newStatus = STATUSES[Math.floor(Math.random() * STATUSES.length)];
          const newDelay  = newStatus === 'delayed'   ? Math.floor(5 + Math.random() * 80)
                          : newStatus === 'cancelled' ? null
                          : 0;
          await Flight.findByIdAndUpdate(f._id, {
            status: newStatus,
            delay:  newDelay,
            timestamp: new Date(),
          });
        }
      }

      // 2. Update airport congestion levels
      await Airport.updateMany({}, [
        {
          $set: {
            congestion: {
              $round: [
                { $add: ['$congestion', { $multiply: [{ $rand: {} }, 20] }] },
                0,
              ],
            },
            timestamp: new Date(),
          },
        },
      ]);
      // Clamp congestion to 0-100
      await Airport.updateMany({ congestion: { $gt: 100 } }, { congestion: 100 });
      await Airport.updateMany({ congestion: { $lt: 0   } }, { congestion: 20  });

      // 3. Save KPI snapshot
      const [kpiStats] = await Flight.aggregate([
        {
          $group: {
            _id: null,
            totalFlights: { $sum: 1 },
            onTime:       { $sum: { $cond: [{ $eq: ['$status', 'on-time']   }, 1, 0] } },
            cancelled:    { $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] } },
            avgDelay:     { $avg: '$delay' },
          },
        },
      ]);

      if (kpiStats) {
        const now = new Date();
        await KpiSnapshot.create({
          activeFlights: kpiStats.totalFlights,
          onTimeRate:    +((kpiStats.onTime / kpiStats.totalFlights) * 100).toFixed(1),
          avgDelay:      Math.round(kpiStats.avgDelay || 0),
          cancellations: kpiStats.cancelled,
          weatherAlerts: await WeatherAlert.countDocuments({ active: true }),
          timestamp:     now,
          hour:          now.getHours(),
        });
      }

    } catch (err) {
      console.error('Simulation error:', err.message);
    }
  }, INTERVAL);
}

module.exports = app;
