const { Router } = require('express');
const { getChartData } = require('../controllers/ChartController');

const router = Router();

router.get('/', getChartData);

module.exports = router;
