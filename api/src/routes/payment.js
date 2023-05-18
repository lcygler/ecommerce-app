const { Router } = require("express");
const { createPayment } = require("../utils/payment");

const router = Router();

// Genera un link de pago
router.post("/", async function (req, res) {
  try {
    const paymentData = await createPayment(req);

    res.json(paymentData.init_point);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to create payment" });
  }
});

module.exports = router;
