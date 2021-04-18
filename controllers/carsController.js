const ApiError =  require('../error/ApiError')
const {Car,Tariff, Rent} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const sequalize = require('sequelize')
const db = require('../db')

class CarsController {
    async create(req, res, next){
        try {
            const {carbrand, model, color, year,transmission,seats,power, carclass,statenum,vin , caraccesscode, tariffId, branchId} = req.body
            const {carimg} = req.files
            let fileName = uuid.v4() + ".png"
            carimg.mv(path.resolve(__dirname,'..', 'static', fileName))
            const car = await Car.create({carbrand, model, color, year,transmission,seats,power, carclass,carimg: fileName,statenum,vin, caraccesscode, tariffId, branchId})
            return res.json(car)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }


    }
    async GetCars(req, res, next){
        const cars = await db.query('select cars.id, branches.city from cars inner join branches on cars.branchId = branches', {
            type: sequalize.QueryTypes.SELECT
        })
        return res.json(cars)
    }
    async getAll(req, res){
        const cars = await Car.findAll()
        return res.json(cars)
    }

    async getOne(req, res){
        const {id} = req.params
        const car = await Car.findOne({
            where: {id},
            include: [
                {
                    association: "tariff",
                    attributes:   ["deposit","for1_2days", "milage", "for3_7days", "from8days"]
                },
                {
                    association: "branch"
                }
            ]
        } )
        return res.json(car)
    }
    async getCarsAndPrice(req, res, next) {
        try {
            const cars = await Car.findAll({
                include: [
                    {
                        association: "tariff",
                        attributes:   ["deposit","for1_2days", "milage", "for3_7days", "from8days"]
                    },
                    {
                        association: "branch"
                    }
                ]
            })
            return res.json(cars)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }



}


module.exports = new CarsController()