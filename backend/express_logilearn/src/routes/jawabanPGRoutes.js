const express = require('express')
const router = express.Router()
const JwbPGController = require('../controllers/jawabanPGController')
const authMid = require('../middlewares/authMiddleware')

//create
router.post('/attempts/:idAttempt/jawaban-pg', authMid.verifyLogin, JwbPGController.create)

//read
router.get('/jawaban-pgs', authMid.verifyLogin, JwbPGController.getAll)
router.get('/jawaban-pgs/:id', authMid.verifyLogin, JwbPGController.getById)

module.exports = router