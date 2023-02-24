const express = require("express");

const {
  getListPayments,
  createPayment,
  getPaymentById
} = require("../controllers/PaymentController");

const router = express.Router();

router.route("/")
        .get(getListPayments)
        .post(createPayment);

router.route("/:id").get(getPaymentById);

module.exports = router;
