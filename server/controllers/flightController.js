// ============================================================
// FLIGHTS CONTROLLER
// ============================================================
const Flight = require('../models/Flight');

// GET /api/flights — all flights (optionally filtered)
exports.getFlights = async (req, res) => {
  try {
    const { status, origin, dest, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (origin) filter.origin = origin.toUpperCase();
    if (dest)   filter.dest   = dest.toUpperCase();

    const flights = await Flight.find(filter)
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .lean();

    res.json({ success: true, count: flights.length, data: flights });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/flights/:id
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findOne({ flightId: req.params.id }).lean();
    if (!flight) return res.status(404).json({ success: false, error: 'Flight not found' });
    res.json({ success: true, data: flight });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/flights — create a flight
exports.createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ success: true, data: flight });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// PUT /api/flights/:id — update flight status / data
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findOneAndUpdate(
      { flightId: req.params.id },
      { ...req.body, timestamp: Date.now() },
      { new: true, runValidators: true }
    );
    if (!flight) return res.status(404).json({ success: false, error: 'Flight not found' });
    res.json({ success: true, data: flight });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE /api/flights/:id
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findOneAndDelete({ flightId: req.params.id });
    if (!flight) return res.status(404).json({ success: false, error: 'Flight not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/flights/stats/summary — aggregated KPI summary
exports.getFlightStats = async (req, res) => {
  try {
    const [stats] = await Flight.aggregate([
      {
        $group: {
          _id: null,
          totalFlights:  { $sum: 1 },
          onTime:        { $sum: { $cond: [{ $eq: ['$status', 'on-time'] }, 1, 0] } },
          delayed:       { $sum: { $cond: [{ $eq: ['$status', 'delayed'] }, 1, 0] } },
          cancelled:     { $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] } },
          avgDelayMins:  { $avg: '$delay' },
        },
      },
      {
        $addFields: {
          onTimeRate: {
            $round: [{ $multiply: [{ $divide: ['$onTime', '$totalFlights'] }, 100] }, 1],
          },
        },
      },
    ]);

    res.json({ success: true, data: stats || {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/flights/stats/by-status — group by status
exports.getFlightsByStatus = async (req, res) => {
  try {
    const result = await Flight.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
