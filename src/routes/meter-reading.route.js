const express = require("express");
const router = express.Router();
const meterReadingController = require("../controllers/meter-reading.controller");
const { authMiddleware, verifyAdmin } = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, verifyAdmin, meterReadingController.create);
router.put("/update/:id", authMiddleware, verifyAdmin, meterReadingController.update);
router.get("/get/:roomId", authMiddleware, verifyAdmin, meterReadingController.getMeterReadingByRoomId);

module.exports = router;
