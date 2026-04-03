const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenant.controller");

const { authMiddleware, verifyAdmin } = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, verifyAdmin, tenantController.createTenant);
router.get("/list", authMiddleware, verifyAdmin, tenantController.listTenant);
router.put("/update/:id", authMiddleware, verifyAdmin, tenantController.updateTenant);
router.put("/delete/:id", authMiddleware, verifyAdmin, tenantController.softDeleteTenant);

module.exports = router;
