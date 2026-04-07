const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const tenantRoute = require("./tenant.route");
const roomRoute = require("./room.route");
const meterReadingRoute = require("./meter-reading.route");

router.use("/users", userRoute);
router.use("/tenants", tenantRoute);
router.use("/rooms", roomRoute);
router.use("/meter-readings", meterReadingRoute);

module.exports = router;