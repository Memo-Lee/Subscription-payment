const express = require("express");
const mongoose = require('mongoose');
const  db = require('./client/db');
const paymentRouter = require("./routes/PaymentRoutes");
const memberRouter = require("./routes/MemberRoutes");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/payments", paymentRouter);
app.use("/members", memberRouter);

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});

module.exports = app;
