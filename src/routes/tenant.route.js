const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenant.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/create", tenantController.createTenant);

router.get("/list", tenantController.listTenant);

router.put("/update/:id", authMiddleware, tenantController.updateTenant);
router.put("/delete/:id", authMiddleware, tenantController.softDeleteTenant);

module.exports = router;
