const ApiError =  require('../error/ApiError')
const {Rent} = require('../models/models')

class RentController {
    async create(req, res){
        const {start, end, getPlace, retrunPlace, isReturned, paid, price} = req.body
        const rent = await Rent.create({start, end, getPlace, retrunPlace, isReturned, paid, price})
        return res.json(rent)

    }
    async getAll(req, res){
        const rents = await Rent.findAll()
        return res.json(rents)
    }

}


module.exports = new RentController()