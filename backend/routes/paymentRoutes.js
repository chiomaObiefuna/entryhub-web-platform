const express = require("express");
const router = express.Router();

const { flutterwaveWebhook } = require("../controllers/paymentController");

router.post("/payments/flutterwave-webhook", flutterwaveWebhook);

module.exports = router;