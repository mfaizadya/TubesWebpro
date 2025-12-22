const express = require('express');
const router = express.Router();
const soalPGController = require('../controllers/soalPGController'); 
const { verifyLogin, onlyAdmin } = require('../middlewares/authMiddleware');

router.post('/soal-pg', verifyLogin, onlyAdmin, soalPGController.create);

router.get('/soal-pg', verifyLogin, soalPGController.getAll);
router.get('/soal-pg/:id', verifyLogin, soalPGController.getById);

router.put('/soal-pg/:id', verifyLogin, onlyAdmin, soalPGController.update);

router.delete('/soal-pg/:id', verifyLogin, onlyAdmin, soalPGController.delete);

module.exports = router;