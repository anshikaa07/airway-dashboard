// ============================================================
// AIRPORTS CONTROLLER
// ============================================================
const Airport    = require('../models/Airport');
const KpiSnapshot = require('../models/KpiSnapshot');

// GET /api/airports
exports.getAirports = async (req, res) => {
  try {
    const airports = await Airport.find().sort({ congestion: -1 }).lean();
    res.json({ success: true, count: airports.length, data: airports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/airports/:code
exports.getAirport = async (req, res) => {
  try {
    const airport = await Airport.findOne({ code: req.params.code.toUpperCase() }).lean();
    if (!airport) return res.status(404).json({ success: false, error: 'Airport not found' });
    res.json({ success: true, data: airport });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT /api/airports/:code — update congestion / metrics
exports.updateAirport = async (req, res) => {
  try {
    const airport = await Airport.findOneAndUpdate(
      { code: req.params.code.toUpperCase() },
      { ...req.body, timestamp: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: airport });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /api/airports/stats/heatmap — congestion grid data for all airports
exports.getHeatmapData = async (req, res) => {
  try {
    const airports = await Airport.find({}, 'code congestion delayAvg').lean();
    res.json({ success: true, data: airports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/kpi/snapshots — last N KPI snapshots for charts
exports.getKpiSnapshots = async (req, res) => {
  try {
    const { hours = 24 } = req.query;
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const snapshots = await KpiSnapshot.find({ timestamp: { $gte: since } })
      .sort({ timestamp: 1 })
      .lean();
    res.json({ success: true, count: snapshots.length, data: snapshots });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
