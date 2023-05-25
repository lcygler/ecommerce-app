const { Router } = require('express');
const adminRouter = require('./AdminRoutes');
const usersRouter = require('./users.js');
const categoriesRouter = require('./categories.js');
const productRouter = require('./ProductRoute.js');
const catalogRouter = require('./catalog.js');
const seasonsRouter = require('./seasons.js');
const gendersRouter = require('./genders.js');
const paymentRouter = require('./payment.js');
const reviewsRouter = require('./ReviewRoutes');
const stock = require('./StockRoute.js');

const router = Router();

router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/products', productRouter);
router.use('/review', reviewsRouter);
router.use('/stock', stock);
router.use('/catalog', catalogRouter); // temporal
router.use('/categories', categoriesRouter);
router.use('/seasons', seasonsRouter);
router.use('/genders', gendersRouter);
// router.use('/favorites', categoryRouter);
// router.use('/cart', cartRouter);
// router.use('/orders', ordersRouter);
// router.use('/reviews', reviewsRouter);
router.use("/payment", paymentRouter)

module.exports = router;
