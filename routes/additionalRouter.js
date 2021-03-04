const Router = require('express')
const router = new Router()
const additionalController = require('../controllers/additionalController')

router.post('/', additionalController.create)
router.get('/', additionalController.getAll)




module.exports = router