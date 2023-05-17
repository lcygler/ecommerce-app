const { Router } = require('express');
const getCatalogHandler = require('../handlers/getCatalogHandler.js');
const getCatalogByIdHandler = require('../handlers/getCatalogByIdHandler.js');

const router = Router();

router.get('/:productId', getCatalogByIdHandler);
router.get('/', getCatalogHandler);

module.exports = router;
