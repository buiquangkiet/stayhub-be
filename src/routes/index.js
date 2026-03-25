const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const tenantRoute = require("./tenant.route");

router.use("/user", userRoute);
router.use("/tenant", tenantRoute);

module.exports = router;