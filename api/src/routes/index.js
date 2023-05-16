
const { Router } = require('express');
const usersRouter = require('./users.js');
const catalogRouter = require('./catalog.js');
const productRouter = require('./product.js');
const cartRouter = require('./cart.js');

const router = Router();


router.use('/users', usersRouter);

router.use('/catalog', catalogRouter);

router.use("/products", productRouter);

router.use("/cart", cartRouter)

module.exports = router;
