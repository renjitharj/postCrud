const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
router.post('/registration', userController.userRegister)
router.post('/login' ,userController.userLogin)
module.exports = router;