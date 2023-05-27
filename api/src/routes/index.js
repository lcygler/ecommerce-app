const { Router } = require('express');
const adminRouter = require('./AdminRoutes');
const usersRouter = require('./users.js');
const catalogRouter = require('./catalog.js');
const productRouter = require('./ProductRoute.js');
const categoriesRouter = require('./categories.js');
const seasonsRouter = require('./seasons.js');
const gendersRouter = require('./genders.js');
const cartRouter = require('./cart.js');
const paymentRouter = require('./payment.js');
const reviewsRouter = require('./ReviewRoutes');
const stockRouter = require('./StockRoute.js');
// const apiRouter = require('./apiChat');

const router = Router();

// router.use('/api', apiRouter);
router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/products', productRouter);
router.use('/stock', stockRouter);
router.use('/catalog', catalogRouter);
router.use('/categories', categoriesRouter);
router.use('/seasons', seasonsRouter);
router.use('/genders', gendersRouter);
// router.use('/favorites', categoryRouter);
router.use('/cart', cartRouter);
// router.use('/orders', ordersRouter);
router.use('/reviews', reviewsRouter);
router.use('/payment', paymentRouter);

module.exports = router;
