const { Router } = require('express');
const UserAdmin = require('./AdminRoutes');
const usersRouter = require('./users.js');
const categoriesRouter = require('./CategoryRoute.js');
const productRouter = require('./ProductRoute.js');
const catalogRouter = require('./catalog.js');
const seasonsRouter = require('./seasons.js');

const router = Router();

router.use('/users', usersRouter);
router.use('/admin', UserAdmin);
router.use('/products', productRouter);
router.use('/catalog', catalogRouter); // temporal
router.use('/categories', categoriesRouter);
router.use('/seasons', seasonsRouter);
// router.use('/favorites', categoryRouter);
// router.use('/cart', cartRouter);
// router.use('/orders', ordersRouter);
// router.use('/reviews', reviewsRouter);

module.exports = router;
