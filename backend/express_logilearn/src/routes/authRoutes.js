const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');

router.post('/login-admin', loginAdmin);

module.exports = router;