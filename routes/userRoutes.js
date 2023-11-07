// routes/authRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/addUser', userController.createUser);
router.get('/users', userController.listUser);

module.exports = router;
