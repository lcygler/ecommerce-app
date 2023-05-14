const { Router } = require('express');
const usersRouter = require('./users.js');
const productRouter = require('./ProductRoute.js');

const router = Router();


router.use('/users', usersRouter);
router.use("/products", productRouter);


module.exports = router;
