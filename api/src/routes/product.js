const { Router } = require("express");
const uploader = require("../utils/multer.js");
const {
  getProductsHandler,
  createProductHandler,
} = require("../handlers/productHandler.js");

const router = Router();

router.get("/", getProductsHandler);
router.post("/", uploader.single("file"), createProductHandler);

module.exports = router;
