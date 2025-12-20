const express = require('express')
const router = express.Router()
const JwbEsaiControler = require('../controllers/jawabanEsaiController')
const authMid = require('../middlewares/authMiddleware')

//create
router.post('/attempts/:idAttempt/jawaban-esai/:idSoal', authMid.verifyLogin, JwbEsaiControler.create)

//read
router.get('/jawaban-esais', authMid.verifyLogin, JwbEsaiControler.getAll)
router.get('/jawaban-esais/:id', authMid.verifyLogin, JwbEsaiControler.getById)

//update
router.put('/jawaban-esais/:id', authMid.verifyLogin, authMid.onlyAdmin, JwbEsaiControler.update)

module.exports = router