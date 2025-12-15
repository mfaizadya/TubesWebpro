const express = require('express')
const router = express.Router()
const sectionController = require('../controllers/sectionController')

router.get('/sections', sectionController.getAll)
router.get('/sections/:id', sectionController.getById)

router.post('/sections', sectionController.create)

module.exports = router