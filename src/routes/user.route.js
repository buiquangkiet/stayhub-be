const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')
const { verifyAdmin, authMiddleware } = require('../middleware/auth.middleware')

router.post("/create", authMiddleware, verifyAdmin, userController.createUser);
router.get("/list", authMiddleware, verifyAdmin, userController.list);
router.post("/login", userController.login);
router.post("/change-password", authMiddleware, userController.changePassword);
router.post("/forgot-password", authMiddleware, userController.forgotPassword);
router.put("/activate/:id", authMiddleware, verifyAdmin, userController.activateUser);
router.put("/update/:id", authMiddleware, verifyAdmin, userController.updateUser);
router.delete("/delete/:id", authMiddleware, verifyAdmin, userController.deleteUser);

module.exports = router;