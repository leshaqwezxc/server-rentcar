const Router = require('express')
const router = new Router()
const Car = require('../controllers/carsController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', Car.create)
router.get('/',authMiddleware , Car.getCarsAndPrice)
router.get('/get', Car.GetCars)
router.get('/:id', Car.getOne)




module.exports = router