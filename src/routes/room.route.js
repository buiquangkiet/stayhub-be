const express = require("express");
const roomController = require("../controllers/room.controller");
const router = express.Router();

router.get("/list", roomController.listAllRoom);
router.post("/create", roomController.createRoom);
router.get("/get/:roomId", roomController.getRoomById);
router.put("/update/:roomId", roomController.updateRoom);
router.delete("/delete/:roomId", roomController.softDeleteRoom);

module.exports = router;