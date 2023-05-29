const { Router } = require('express');
const adminRouter = require('./AdminRoutes');
const usersRouter = require('./users.js');
const catalogRouter = require('./catalog.js');
const productRouter = require('./ProductRoute.js');
const categoriesRouter = require('./categories.js');
const seasonsRouter = require('./seasons.js');
const gendersRouter = require('./genders.js');
const cartRouter = require('./cart.js');
const purchasesRouter = require('./purchases.js');
const favoritesRouter = require('./favorites.js');
const paymentRouter = require('./payment.js');
const reviewsRouter = require('./ReviewRoutes');
const stockRouter = require('./StockRoute.js');
// const apiRouter = require('./apiChat');
const chartRoutes = require('./chartRoutes');

const router = Router();

// router.use('/api', apiRouter);
router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/catalog', catalogRouter);
router.use('/products', productRouter);
router.use('/stock', stockRouter);
router.use('/categories', categoriesRouter);
router.use('/seasons', seasonsRouter);
router.use('/genders', gendersRouter);
router.use('/cart', cartRouter);
router.use('/purchases', purchasesRouter);
router.use('/favorites', favoritesRouter);
router.use('/payment', paymentRouter);
router.use('/reviews', reviewsRouter);
router.use('/charts', chartRoutes);

module.exports = router;
