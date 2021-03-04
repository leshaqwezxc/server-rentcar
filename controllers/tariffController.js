const ApiError =  require('../error/ApiError')
const {Tariff} = require('../models/models')

class TariffController {
    async create(req, res){
        const {milage, pricePerKil, for1_2days, for3_7days, from8days, deposit} = req.body
        const tariff = await Tariff.create({milage, pricePerKil, for1_2days, for3_7days, from8days, deposit})
        return res.json(tariff)

    }
    async getAll(req, res){
        const tariffs = await Tariff.findAll()
        return res.json(tariffs)
        
    }

}


module.exports = new TariffController()