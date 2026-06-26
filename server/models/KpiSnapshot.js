// ============================================================
// KPI SNAPSHOT MODEL
// Stores periodic KPI snapshots for historical charts
// ============================================================
const mongoose = require('mongoose');

const KpiSnapshotSchema = new mongoose.Schema(
  {
    activeFlights:  { type: Number, default: 0 },
    onTimeRate:     { type: Number, default: 0 },  // percentage 0-100
    avgDelay:       { type: Number, default: 0 },  // minutes
    cancellations:  { type: Number, default: 0 },
    weatherAlerts:  { type: Number, default: 0 },
    departures:     { type: Number, default: 0 },
    arrivals:       { type: Number, default: 0 },
    timestamp:      { type: Date, default: Date.now, index: true },
    hour:           { type: Number },  // 0-23, for grouping
  },
  {
    timestamps: true,
    collection: 'kpi_snapshots',
  }
);

// TTL index: auto-delete snapshots older than 7 days
KpiSnapshotSchema.index({ timestamp: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

module.exports = mongoose.model('KpiSnapshot', KpiSnapshotSchema);
