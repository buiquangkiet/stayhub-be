const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contract.controller");
const { authMiddleware, verifyAdmin } = require("../middleware/auth.middleware");

// Tất cả các route về hợp đồng đều yêu cầu quyền Admin
router.get("/list", authMiddleware, verifyAdmin, contractController.listContract);
router.post("/create", authMiddleware, verifyAdmin, contractController.createContract);
router.put("/update/:id", authMiddleware, verifyAdmin, contractController.updateContract);
router.delete("/delete/:id", authMiddleware, verifyAdmin, contractController.deleteContract);
router.get("/list/:userId", authMiddleware, contractController.listContractByUser);

module.exports = router;
