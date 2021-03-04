const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const carsRouter = require('./carsRouter')
const branchRouter = require('./branchRouter')
const rentRouter = require('./rentRouters')
const tariffRouter = require('./tariffRouter')
const additionalRouter = require('./additionalRouter')

router.use('/user', userRouter)
router.use('/cars', carsRouter)
router.use('/rent', rentRouter)
router.use('/tariff', tariffRouter)
router.use('/branch', branchRouter)
router.use('/additional', additionalRouter)


module.exports = router