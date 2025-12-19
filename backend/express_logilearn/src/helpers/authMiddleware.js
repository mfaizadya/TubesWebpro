const jwt = require('jsonwebtoken');
const response = require('../helpers/response');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return response(403, null, "Token tidak ditemukan, akses ditolak!", res);
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next(); 
  } catch (err) {
    return response(401, null, "Token tidak valid!", res);
  }
};

module.exports = verifyToken;