const express = require('express')
const router = express.Router()
const soalPGController = require('../controllers/soalPGController')

// Create
router.post('/soals-pg', soalPGController.create)

// Read
router.get('/soals-pg', soalPGController.getAll)
router.get('/soals-pg/:id', soalPGController.getById)
router.get('/soals-pg/level/:idLevel', soalPGController.getByLevel)

// Update
router.put('/soals-pg/:id', soalPGController.update)

// Delete
router.delete('/soals-pg/:id', soalPGController.delete)

module.exports = router
