const ApiError =  require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, UserInfo} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken')


const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async getUser(req, res){
        const {id} = req.params
        const user = await User.findOne({
            where: {id},
            include: {
                    association: "user_info"
            }
        })
        return res.json(user)
    }
    async registration(req, res, next){
        const {email, password} = req.body
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const {driveLicenseImg, passportImg} = req.files
        let fileName1 = uuid.v4() + ".png"
        let fileName2 = uuid.v4() + ".png"
        driveLicenseImg.mv(path.resolve(__dirname,'..', 'static', fileName1))
        passportImg.mv(path.resolve(__dirname,'..', 'static', fileName2))
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        const {firstName, lastName, patronymic, dateOfBirth, driveLicense, passport, phone, userPic, accessCode} = req.body
        const userInfo = await UserInfo.create({firstName, lastName, patronymic, dateOfBirth, driveLicense, driveLicenseImg:fileName1, passport,passportImg: fileName2, phone, userPic, accessCode, userId: user.id})
        return res.json({user, userInfo})
    }
    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email) 
        return res.json({user,token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({user})
    }
}


module.exports = new UserController()