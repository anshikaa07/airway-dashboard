// ============================================================
// WEATHER CONTROLLER
// ============================================================
const WeatherAlert = require('../models/WeatherAlert');

// GET /api/weather — all active alerts
exports.getWeatherAlerts = async (req, res) => {
  try {
    const alerts = await WeatherAlert.find({ active: true })
      .sort({ impact: -1, timestamp: -1 })
      .lean();
    res.json({ success: true, count: alerts.length, data: alerts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/weather/:airport
exports.getWeatherByAirport = async (req, res) => {
  try {
    const alerts = await WeatherAlert.find({
      airport: req.params.airport.toUpperCase(),
      active: true,
    }).lean();
    res.json({ success: true, data: alerts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/weather — create alert
exports.createAlert = async (req, res) => {
  try {
    const alert = await WeatherAlert.create(req.body);
    res.status(201).json({ success: true, data: alert });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// PUT /api/weather/:id — update / deactivate
exports.updateAlert = async (req, res) => {
  try {
    const alert = await WeatherAlert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!alert) return res.status(404).json({ success: false, error: 'Alert not found' });
    res.json({ success: true, data: alert });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
