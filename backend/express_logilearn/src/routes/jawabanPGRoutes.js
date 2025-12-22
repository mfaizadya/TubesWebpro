const express = require('express');
const router = express.Router();
const JwbPGController = require('../controllers/jawabanPGController');
const { verifyLogin, onlyAdmin } = require('../middlewares/authMiddleware');

router.post('/attempts/:idAttempt/jawaban-pg', verifyLogin, JwbPGController.create);

router.get('/jawaban-pgs', verifyLogin, JwbPGController.getAll);
router.get('/jawaban-pgs/:id', verifyLogin, JwbPGController.getById);

module.exports = router;