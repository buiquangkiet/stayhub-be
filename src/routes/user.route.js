const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')

router.post("/create", userController.createUser);
router.post("/login", userController.login);
router.post("/change-password", userController.changePassword);
router.post("/forgot-password", userController.forgotPassword);

module.exports = router;