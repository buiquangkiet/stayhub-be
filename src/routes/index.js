const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const tenantRoute = require("./tenant.route");
const roomRoute = require("./room.route");

router.use("/users", userRoute);
router.use("/tenants", tenantRoute);
router.use("/rooms", roomRoute);

module.exports = router;