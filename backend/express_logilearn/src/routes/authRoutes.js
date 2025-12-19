const express = require('express');
const router = express.Router();

const { loginAdmin, registerPelajar, loginPelajar } = require('../controllers/authController');
const { verifyLogin, onlyAdmin, onlyPelajar } = require('../middlewares/authMiddleware');
const resp = require('../helpers/response');

router.post('/login-admin', loginAdmin);
router.post('/login-pelajar', loginPelajar);
router.post('/register-pelajar', registerPelajar);
router.get('/test-login-admin', verifyLogin, onlyAdmin, (req, res) => {
  if (!req.auth) {
    return resp(401, null, 'Unauthorized', res);
  }

  return resp(200, null, 'admin profile', res);
});

router.get('/test-login-pelajar', verifyLogin, onlyPelajar, (req, res) => {
  if (!req.auth) {
    return resp(401, null, 'Unauthorized', res);
  }

  return resp(200, null, 'pelajar profile', res);
});

module.exports = router;
