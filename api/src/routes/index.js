const { Router } = require('express');
const usersRouter = require('./users.js');
const categoryRoute = require('./CategoryRoute.js');
const productRouter = require('./ProductRoute.js');
const catalogRouter = require('./catalog.js');

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productRouter);
router.use('/category', categoryRoute);
router.use('/catalog', catalogRouter); //! temporalmente

module.exports = router;
