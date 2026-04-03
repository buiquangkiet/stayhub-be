const express = require("express");
const roomController = require("../controllers/room.controller");
const router = express.Router();
const { authMiddleware, verifyAdmin } = require('../middleware/auth.middleware')

router.get("/list", roomController.listAllRoom);
router.get("/detail/:id", roomController.detail);
router.post("/create", authMiddleware, verifyAdmin, roomController.createRoom);
router.get("/get/:id", roomController.getRoomById);
router.put("/update/:id", authMiddleware, verifyAdmin, roomController.updateRoom);
router.delete("/delete/:id", authMiddleware, verifyAdmin, roomController.softDeleteRoom);

module.exports = router;