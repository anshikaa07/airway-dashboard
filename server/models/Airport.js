// ============================================================
// AIRPORT MODEL
// Stores airport metadata + live congestion snapshots
// ============================================================
const mongoose = require('mongoose');

const AirportSchema = new mongoose.Schema(
  {
    code:        { type: String, required: true, unique: true, uppercase: true }, // "JFK"
    name:        { type: String, required: true },
    city:        { type: String },
    state:       { type: String },
    lat:         { type: Number },
    lng:         { type: Number },
    congestion:  { type: Number, default: 0, min: 0, max: 100 }, // % capacity
    delayAvg:    { type: Number, default: 0 },  // avg delay in minutes
    departures:  { type: Number, default: 0 },  // active departures
    arrivals:    { type: Number, default: 0 },   // active arrivals
    weatherAlert:{ type: String, default: null },
    timestamp:   { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'airports',
  }
);

module.exports = mongoose.model('Airport', AirportSchema);
