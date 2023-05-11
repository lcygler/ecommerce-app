const { Router } = require("express");

const { usersRouter, authRouter } = require("./users.js");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;
