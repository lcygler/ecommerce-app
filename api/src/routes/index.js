
const { Router } = require('express');
const usersRouter = require('./users.js');
const catalogRouter = require('./catalog.js');
const authRouter = require("./auth.js")

const router = Router();

router.use("/auth", authRouter)

router.use('/users', usersRouter);

router.use('/catalog', catalogRouter);


module.exports = router;
