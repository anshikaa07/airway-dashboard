// ============================================================
// FLIGHT MODEL
// Stores live and historical flight data
// ============================================================
const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema(
  {
    flightId:  { type: String, required: true, index: true },   // e.g. "AA-1042"
    airline:   { type: String, required: true },                 // e.g. "American"
    origin:    { type: String, required: true, uppercase: true },// e.g. "LAX"
    dest:      { type: String, required: true, uppercase: true },// e.g. "JFK"
    route:     { type: String },                                  // "LAX → JFK"
    aircraft:  { type: String },                                  // "B737"
    status: {
      type: String,
      enum: ['on-time', 'delayed', 'cancelled', 'diverted', 'landed'],
      default: 'on-time',
      index: true,
    },
    delay:     { type: Number, default: 0 },   // minutes
    eta:       { type: String },               // "14:32"
    gate:      { type: String },
    altitude:  { type: Number },               // feet
    speed:     { type: Number },               // knots
    latitude:  { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,   // adds createdAt / updatedAt
    collection: 'flights',
  }
);

// Compound index for efficient querying
FlightSchema.index({ status: 1, timestamp: -1 });
FlightSchema.index({ origin: 1, dest: 1 });

module.exports = mongoose.model('Flight', FlightSchema);
