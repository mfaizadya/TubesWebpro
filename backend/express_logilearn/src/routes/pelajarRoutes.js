const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, changePassword } = require('../controllers/pelajarController');
const { verifyLogin } = require('../middlewares/authMiddleware');

router.get('/profile', verifyLogin, getProfile);
router.put('/profile/change-password', verifyLogin, changePassword);

module.exports = router;