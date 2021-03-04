const ApiError =  require('../error/ApiError')
const {Car} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class CarsController {
    async create(req, res, next){
        try {
            const {carBrand, model, color, year,transmission,seats,power, carClass,stateNum,vin , carAccessCode, tariffId, branchId} = req.body
            const {carImg} = req.files
            let fileName = uuid.v4() + ".png"
            carImg.mv(path.resolve(__dirname,'..', 'static', fileName))
            const car = await Car.create({carBrand, model, color, year,transmission,seats,power, carClass,carImg: fileName,stateNum,vin, carAccessCode, tariffId, branchId})
            return res.json(car)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }


    }
    async getAll(req, res){
        const cars = await Car.findAll()
        return res.json(cars)
        
    }

}


module.exports = new CarsController()