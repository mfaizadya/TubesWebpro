const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMid = require('../middlewares/authMiddleware')
const { verifyLogin } = require('../middlewares/authMiddleware');
const resp = require('../helpers/response');

router.post('/login-admin', authController.loginAdmin);
router.post('/login-pelajar', authController.loginPelajar);

router.get('/test-login-admin', authMid.verifyLogin, authMid.onlyAdmin, (req, res) => {
  if (!req.auth) {
    return resp(401, null, 'Unauthorized', res);
  }

  return resp(200, null, 'admin profile', res);
});

router.get('/test-login-pelajar', verifyLogin, (req, res) => {
  if (!req.auth) {
    return resp(401, null, 'Unauthorized', res);
  }

  return resp(200, null, 'pelajar profile', res);
});

module.exports = router;
