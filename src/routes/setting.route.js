const express = require("express");
const router = express.Router();
const settingController = require("../controllers/setting.controller");
const { authMiddleware, verifyAdmin } = require("../middleware/auth.middleware");

router.get("/", authMiddleware, verifyAdmin, settingController.get);
router.put("/update", authMiddleware, verifyAdmin, settingController.update);

module.exports = router;
