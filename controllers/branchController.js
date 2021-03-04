const ApiError =  require('../error/ApiError')
const {Branch} = require('../models/models')

class BranchController {
    async create(req, res){
        const {city, phone, email, address} = req.body
        const branch = await Branch.create({city, phone, email, address})
        return res.json(branch)

    }
    async getAll(req, res){
        const branch = await Branch.findAll()
        return res.json(branch)
        
    }

}


module.exports = new BranchController()