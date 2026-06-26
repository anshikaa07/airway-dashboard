// ============================================================
// WEATHER ROUTES
// ============================================================
const express = require('express');
const router  = express.Router();
const {
  getWeatherAlerts,
  getWeatherByAirport,
  createAlert,
  updateAlert,
} = require('../controllers/weatherController');

router.route('/')
  .get(getWeatherAlerts)
  .post(createAlert);

router.get('/:airport', getWeatherByAirport);
router.put('/:id',      updateAlert);

module.exports = router;
