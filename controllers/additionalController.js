const ApiError =  require('../error/ApiError')
const {Additional} = require('../models/models')

class AdditionalController {
    async create(req, res){
        const {name, price} = req.body
        const additional = await Additional.create({name, price} )
        return res.json(additional)

    }
    async getAll(req, res){
        const additionals = await Additional.findAll()
        return res.json(additionals)
        
    }

}


module.exports = new AdditionalController()