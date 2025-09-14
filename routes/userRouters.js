const express = require('express');
const { registerController, loginController } = require('../controllers/userController');

const router = express.Router();


// Register || post

router.post("/register", registerController)

// Login || post

router.post('/login',loginController)






module.exports = router