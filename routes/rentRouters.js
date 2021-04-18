const Router = require('express')
const router = new Router()
const Rent = require('../controllers/rentController')

router.post('/',Rent.create)
router.get('/', Rent.getAll)
router.get('/rentwithcar/:userId',Rent.getOneWithCar)
router.get('/:userId',Rent.getOne)




module.exports = router