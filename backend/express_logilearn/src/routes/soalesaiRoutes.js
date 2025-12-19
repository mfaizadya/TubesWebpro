const express = require('express');
const router = express.Router();
const esaiController = require('../controllers/esaiController');
const verifyToken = require('../helpers/authmiddleware');

// CREATE
router.post('/soal-esai', verifyToken, esaiController.createEsai);

// READ 
router.get('/soal-esai', verifyToken, esaiController.getAllEsai);
router.get('/soal-esai/:id', verifyToken, esaiController.getEsaiById);
router.get('/soal-esai/level/:id_level', verifyToken, esaiController.getEsaiByLevel);

// UPDATE
router.put('/soal-esai/:id', verifyToken, esaiController.updateEsai);

// DELETE
router.delete('/soal-esai/:id', verifyToken, esaiController.deleteEsai);

module.exports = router;