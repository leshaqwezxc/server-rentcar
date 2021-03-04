const Router = require('express')
const router = new Router()
const Car = require('../controllers/carsController')


router.post('/', Car.create)
router.get('/', Car.getAll)
router.get('/:id',)




module.exports = router