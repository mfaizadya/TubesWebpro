const express = require('express');
const router = express.Router();
const attemptController = require('../controllers/attemptController');

// Create
router.post('/attempts', attemptController.create);

// Read
router.get('/attempts', attemptController.getAllAttempts);
router.get('/attempts/:id', attemptController.getAttemptById);
router.get('/attempts/level/:levelId', attemptController.getAttemptsByLevel);
router.get('/attempts/pelajar/:pelajarId', attemptController.getAttemptsByPelajar);

// Update
router.put('/attempts/:id', attemptController.update);

// Delete
router.delete('/attempts/:id', attemptController.remove);

module.exports = router;
