// ============================================================
// FLIGHT ROUTES
// ============================================================
const express = require('express');
const router  = express.Router();
const {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
  getFlightStats,
  getFlightsByStatus,
} = require('../controllers/flightController');

// Stats (must come before /:id to avoid route conflict)
router.get('/stats/summary',   getFlightStats);
router.get('/stats/by-status', getFlightsByStatus);

// CRUD
router.route('/')
  .get(getFlights)
  .post(createFlight);

router.route('/:id')
  .get(getFlightById)
  .put(updateFlight)
  .delete(deleteFlight);

module.exports = router;
