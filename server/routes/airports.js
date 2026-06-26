// ============================================================
// AIRPORT + KPI ROUTES
// ============================================================
const express = require('express');
const router  = express.Router();
const {
  getAirports,
  getAirport,
  updateAirport,
  getHeatmapData,
  getKpiSnapshots,
} = require('../controllers/airportController');

router.get('/heatmap',       getHeatmapData);
router.get('/kpi/snapshots', getKpiSnapshots);

router.route('/')
  .get(getAirports);

router.route('/:code')
  .get(getAirport)
  .put(updateAirport);

module.exports = router;
