const Router = require('express')
const router = new Router()
const tariffController = require('../controllers/tariffController')

router.post('/', tariffController.create)
router.get('/', tariffController.getAll)




module.exports = router