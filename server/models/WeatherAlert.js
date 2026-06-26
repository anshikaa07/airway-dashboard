// ============================================================
// WEATHER ALERT MODEL
// ============================================================
const mongoose = require('mongoose');

const WeatherAlertSchema = new mongoose.Schema(
  {
    airport:   { type: String, required: true, uppercase: true },
    icon:      { type: String },
    condition: { type: String },              // "Thunderstorms"
    desc:      { type: String },              // full description
    impact:    { type: String, enum: ['low', 'moderate', 'high'], default: 'low' },
    temp:      { type: String },              // "64°F"
    wind:      { type: String },              // "32 kt"
    visibility:{ type: String },
    ceiling:   { type: String },
    active:    { type: Boolean, default: true },
    expiresAt: { type: Date },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'weather_alerts',
  }
);

WeatherAlertSchema.index({ airport: 1, active: 1 });

module.exports = mongoose.model('WeatherAlert', WeatherAlertSchema);
