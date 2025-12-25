const express = require('express')
const router = express.Router()
const sectionController = require('../controllers/sectionController')
const authMid = require('../middlewares/authMiddleware')


//create
router.post('/sections', authMid.verifyLogin, authMid.onlyAdmin, sectionController.create)

//read
router.get('/sections', authMid.verifyLogin, sectionController.getAll)
router.get('/sections/:id', authMid.verifyLogin, authMid.onlyAdmin, sectionController.getById)

//update
router.put('/sections/:id', authMid.verifyLogin, authMid.onlyAdmin, sectionController.update)
//delete
router.delete('/sections/:id', authMid.verifyLogin, authMid.onlyAdmin, sectionController.remove)

module.exports = router