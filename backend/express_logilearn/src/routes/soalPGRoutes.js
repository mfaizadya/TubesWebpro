const express = require('express');
const router = express.Router();
const soalPGController = require('../controllers/soalPGController'); 
const { verifyLogin, onlyAdmin } = require('../middlewares/authMiddleware');

// Create
router.post('/soals-pg', verifyLogin, onlyAdmin, soalPGController.create);

// Read
router.get('/soals-pg', verifyLogin, soalPGController.getAll);
router.get('/soals-pg/level/:idLevel', verifyLogin, soalPGController.getByLevel);
router.get('/soals-pg/:id', verifyLogin, soalPGController.getById);

// Update
router.put('/soals-pg/:id', verifyLogin, onlyAdmin, soalPGController.update);

// Delete
router.delete('/soals-pg/:id', verifyLogin, onlyAdmin, soalPGController.delete);

module.exports = router;