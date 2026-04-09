const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");
const { authMiddleware, verifyAdmin } = require("../middleware/auth.middleware");

router.get("/list", authMiddleware, verifyAdmin, invoiceController.list);

router.post("/create", authMiddleware, verifyAdmin, invoiceController.create);
router.get("/detail/:id", authMiddleware, verifyAdmin, invoiceController.detail);
router.put("/update/:id", authMiddleware, verifyAdmin, invoiceController.update);
router.delete("/delete/:id", authMiddleware, verifyAdmin, invoiceController.remove);
router.patch("/status/:id", authMiddleware, verifyAdmin, invoiceController.updateStatus);
router.get("/list/:userId", authMiddleware, invoiceController.listInvoicesByUser);

module.exports = router;
