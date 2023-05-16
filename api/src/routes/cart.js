const { Router } = require("express");
const {
  getCartHandler,
  createCartHandler,
} = require("../handlers/cartHandler.js");

const router = Router();

router.get("/", getCartHandler);
router.post("/", createCartHandler);

module.exports = router;
