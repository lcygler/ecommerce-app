const { Router } = require('express');
const getCatalogHandler = require('../handlers/getCatalogHandler');

const router = Router();

router.get('/', getCatalogHandler);

module.exports = router;
