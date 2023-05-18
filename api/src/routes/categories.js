const { Router } = require('express');
const getCategoriesHandler = require('../handlers/getCategoriesHandler.js');

const router = Router();

router.get('/', getCategoriesHandler);

module.exports = router;
