const express = require('express')
const router = express.Router()
const sectionController = require('../controllers/sectionController')

//create
router.post('/sections', sectionController.create)

//read
router.get('/sections', sectionController.getAll)
router.get('/sections/:id', sectionController.getById)

//update
router.put('/sections/:id', sectionController.update)

//delete
router.delete('/sections/:id', sectionController.remove)

module.exports = router