const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/weatherController');
const { validateQuery } = require('../middleware/validateQuery');

router.get('/current', validateQuery, ctrl.current);
router.get('/forecast', validateQuery, ctrl.forecast);
router.get('/search', ctrl.search);
router.get('/astronomy', validateQuery, ctrl.astronomy);
router.get('/alerts', validateQuery, ctrl.alerts);
router.get('/air-quality', validateQuery, ctrl.airQuality);

module.exports = router;
