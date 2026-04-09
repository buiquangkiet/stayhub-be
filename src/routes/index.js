const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const tenantRoute = require("./tenant.route");
const roomRoute = require("./room.route");
const meterReadingRoute = require("./meter-reading.route");
const contractRoute = require("./contract.route");
const invoiceRoute = require("./invoice.route");
const settingRoute = require("./setting.route");

router.use("/users", userRoute);
router.use("/tenants", tenantRoute);
router.use("/rooms", roomRoute);
router.use("/meter-readings", meterReadingRoute);
router.use("/contracts", contractRoute);
router.use("/invoices", invoiceRoute);
router.use("/settings", settingRoute);

module.exports = router;