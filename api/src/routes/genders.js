const { Router } = require('express');
const getGendersHandler = require('../handlers/getGendersHandler.js');

const router = Router();

router.get('/', getGendersHandler);

module.exports = router;
