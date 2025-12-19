const jwt = require('jsonwebtoken');
const resp = require('../helpers/response');

function verifyLogin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return resp(401, null, 'Unauthorized', res);
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return resp(401, null, 'Invalid token format', res);
  }

  try {
    req.auth = jwt.verify(parts[1], process.env.JWT_SECRET);
    next();
  } catch (err) {
    return resp(401, null, 'Invalid token', res);
  }
}

module.exports = {
  verifyLogin
};
