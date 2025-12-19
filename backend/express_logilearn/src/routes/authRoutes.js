const express = require('express');
const router = express.Router();

const { loginAdmin } = require('../controllers/authController');
const { verifyLogin } = require('../middlewares/authMiddleware');
const resp = require('../helpers/response');

router.post('/login-admin', loginAdmin);

router.get('/test-login-admin', verifyLogin, (req, res) => {
  if (!req.auth) {
    return resp(401, null, 'Unauthorized', res);
  }

  if (req.auth.type !== 'ADMIN') {
    return resp(403, null, 'Admin only', res);
  }

  return resp(200, null, 'admin profile', res);
});

module.exports = router;
