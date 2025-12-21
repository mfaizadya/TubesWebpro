const express = require('express');
const router = express.Router();
const attemptController = require('../controllers/attemptController');
// Import Middleware
const { verifyLogin, onlyAdmin } = require('../middlewares/authMiddleware');

// Create
router.post('/attempts', verifyLogin, attemptController.create);

// Read (Authenticated User) ---
// attempt bisa dilihat oleh admin maupun pelajar yang bersangkutan
router.get('/attempts', verifyLogin, onlyAdmin, attemptController.getAllAttempts);
router.get('/attempts/:id', verifyLogin, onlyAdmin, attemptController.getAttemptById);
router.get('/attempts/level/:levelId', verifyLogin, attemptController.getAttemptsByLevel);
router.get('/attempts/pelajar/:pelajarId', verifyLogin, attemptController.getAttemptsByPelajar);

// Submit Attempt (Authenticated User)
router.post('/attempts/submit', verifyLogin, attemptController.submitAttempt);

// --- Update (Admin Only) ---
router.put('/attempts/:id', verifyLogin, onlyAdmin, attemptController.update);

// --- Delete (Admin Only) ---
router.delete('/attempts/:id', verifyLogin, onlyAdmin, attemptController.remove);

module.exports = router;