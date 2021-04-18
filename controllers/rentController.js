const ApiError =  require('../error/ApiError')
const {Rent} = require('../models/models')

class RentController {
    async create(req, res){
        const {start, end, getPlace, returnPlace, isReturned, paid, price, userId, carId} = req.body
        const rent = await Rent.create({start, end, getPlace, returnPlace, isReturned, paid, price, userId, carId})
        return res.json(rent)
    }
    async getOneWithCar(req, res){
        const { userId } = req.params
        const rents = await Rent.findAll({
            where: { userId },
            order: [ [ 'createdAt', 'DESC' ]],
            include: 
            {
                association: "car"
            }
        })
        return res.json(rents)
    }
    async getOne(req, res){
        const { userId } = req.params
        const rents = await Rent.findOne({
            where: { userId }
        })
        return res.json(rents)
    }
    async getAll(req, res){
        const rents = await Rent.findAll()
        return res.json(rents)
    }
    

}


module.exports = new RentController()