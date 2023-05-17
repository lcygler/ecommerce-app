const { Router } = require('express');
const getSeasonsHandler = require('../handlers/getSeasonsHandler.js');

const router = Router();

router.get('/', getSeasonsHandler);

module.exports = router;
