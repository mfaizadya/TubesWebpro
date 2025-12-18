const express = require('express')
const router = express.Router()
const levelController = require('../controllers/levelController')

//create
router.post('/levels', levelController.create)

//read
router.get('/levels', levelController.getAll)
router.get('/levels/:id', levelController.getById)

//update
router.put('/levels/:id', levelController.update)

//delete
router.delete('/levels/:id', levelController.remove)

module.exports = router