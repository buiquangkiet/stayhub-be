const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const tenantRoute = require("./tenant.route");

router.use("/users", userRoute);
router.use("/tenants", tenantRoute);

module.exports = router;