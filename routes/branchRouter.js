const Router = require('express')
const router = new Router()
const Branch = require('../controllers/branchController')

router.post('/',Branch.create)
router.get('/', Branch.getAll)




module.exports = router