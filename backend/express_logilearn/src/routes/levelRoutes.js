const express = require('express')
const router = express.Router()
const levelController = require('../controllers/levelController')
const authMid = require('../middlewares/authMiddleware')

//create
router.post('/levels', levelController.create)

//read
router.get('/levels', levelController.getAll)
router.get('/levels/:id', levelController.getById)
router.get('/:slugSection/levels', authMid.verifyLogin, levelController.getAllBySection);
router.get('/:slugSection/levels/:id', authMid.verifyLogin, levelController.getById);

//update
router.put('/levels/:id', levelController.update)

//delete
router.delete('/levels/:id', levelController.remove)

module.exports = router