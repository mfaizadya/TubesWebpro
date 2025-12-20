const express = require('express');
const router = express.Router();
const soalPGController = require('../controllers/soalPGController'); 
const { verifyLogin, onlyAdmin } = require('../middlewares/authMiddleware');

// --- Create (Admin Only) ---
router.post('/soal-pg', verifyLogin, onlyAdmin, soalPGController.create);

// --- Read (Authenticated User / Public) ---
router.get('/soal-pg', verifyLogin, soalPGController.getAllSoal);
router.get('/soal-pg/:id', verifyLogin, soalPGController.getSoalById);

// --- Update (Admin Only) ---
router.put('/soal-pg/:id', verifyLogin, onlyAdmin, soalPGController.update);

// --- Delete (Admin Only) ---
router.delete('/soal-pg/:id', verifyLogin, onlyAdmin, soalPGController.delete);

module.exports = router;