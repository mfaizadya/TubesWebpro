const express = require('express');
const router = express.Router();
const attemptController = require('../controllers/attemptController');
// Import Middleware
const { verifyLogin, onlyAdmin } = require('../middlewares/authMiddleware');

// Create (Admin Only) ---
router.post('/attempts', verifyLogin, onlyAdmin, attemptController.create);

// Read (Authenticated User) ---
// attempt bisa dilihat oleh admin maupun pelajar yang bersangkutan
router.get('/attempts', verifyLogin, attemptController.getAllAttempts);
router.get('/attempts/:id', verifyLogin, attemptController.getAttemptById);
router.get('/attempts/level/:levelId', verifyLogin, attemptController.getAttemptsByLevel);
router.get('/attempts/pelajar/:pelajarId', verifyLogin, attemptController.getAttemptsByPelajar);

// --- Update (Admin Only) ---
router.put('/attempts/:id', verifyLogin, onlyAdmin, attemptController.update);

// --- Delete (Admin Only) ---
router.delete('/attempts/:id', verifyLogin, onlyAdmin, attemptController.remove);

module.exports = router;