const sequalize = require('../db');
const {DataTypes} = require('sequelize');


const User = sequalize.define('user', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type:DataTypes.STRING, unique: true, allowNull:false},
    password: {type:DataTypes.STRING, allowNull:false}
});
const UserInfo = sequalize.define('user_info', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type:DataTypes.STRING, allowNull:false},
    lastName: {type:DataTypes.STRING, allowNull:false},
    patronymic: {type:DataTypes.STRING},
    dateOfBirth: {type:DataTypes.DATEONLY, allowNull:false},
    driveLicense: {type:DataTypes.STRING, unique: true, allowNull:false},
    driveLicenseImg: {type:DataTypes.STRING, allowNull:false},
    passport: {type:DataTypes.STRING, unique: true, allowNull:false},
    passportImg: {type:DataTypes.STRING, allowNull:false},
    phone: {type:DataTypes.STRING, unique: true, allowNull:false},
    userPic: {type:DataTypes.STRING, allowNull:true},
    accessCode: {type:DataTypes.INTEGER, defaultValue: 1, allowNull:false}
});
const Car = sequalize.define('car', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    carbrand: {type:DataTypes.STRING, allowNull:false},
    model: {type:DataTypes.STRING, allowNull:false},
    color: {type:DataTypes.STRING, allowNull:false},
    year: {type:DataTypes.DATEONLY, allowNull:false},
    transmission: {type:DataTypes.STRING, allowNull:false},
    seats: {type:DataTypes.INTEGER, allowNull:false},
    power: {type:DataTypes.INTEGER, allowNull:false},
    carclass: {type:DataTypes.STRING, allowNull:false},
    carimg: {type:DataTypes.STRING,allowNull:false},
    statenum: {type:DataTypes.STRING, unique: true, allowNull:false},
    vin: {type:DataTypes.INTEGER,  unique: true, allowNull:false},
    caraccesscode: {type:DataTypes.INTEGER, allowNull:false}
});
const Tariff = sequalize.define('tariff', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    milage: {type:DataTypes.INTEGER, allowNull:false},
    pricePerKil: {type:DataTypes.FLOAT,allowNull:false},
    for1_2days: {type:DataTypes.FLOAT, allowNull:false},
    for3_7days: {type:DataTypes.FLOAT, allowNull:false},
    from8days: {type:DataTypes.FLOAT, allowNull:false},
    deposit: {type:DataTypes.FLOAT, allowNull:false}
});
const Branch = sequalize.define('branch', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city: {type:DataTypes.STRING, allowNull:false},
    phone: {type:DataTypes.STRING, allowNull:false},
    email: {type:DataTypes.STRING, allowNull:false},
    address: {type:DataTypes.STRING, allowNull:false}
});
const Rent = sequalize.define('rent', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    start: {type:DataTypes.DATE},
    end: {type:DataTypes.DATE},
    getPlace: {type:DataTypes.STRING},
    returnPlace: {type:DataTypes.STRING},
    isReturned: {type:DataTypes.BOOLEAN},
    paid:{type:DataTypes.BOOLEAN},
    price: {type:DataTypes.FLOAT}
});
const Additional = sequalize.define('additional', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, allowNull:false},
    price: {type:DataTypes.FLOAT, allowNull:false}
});
const Incident = sequalize.define('incident', {
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type:DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING, allowNull:false}
});

const RentAdditional = sequalize.define('rent_additional', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});
User.hasOne(UserInfo);
UserInfo.belongsTo(User);

User.hasMany(Rent);
Rent.belongsTo(User);

Tariff.hasMany(Car);
Car.belongsTo(Tariff);

Branch.hasMany(Car);
Car.belongsTo(Branch);

Car.hasMany(Rent);
Rent.belongsTo(Car);

Rent.hasOne(Incident);
Incident.belongsTo(Rent);

Additional.belongsToMany(Rent, {
    through: RentAdditional
});
Rent.belongsToMany(Additional, {
    through: RentAdditional
});

module.exports = {
   User,
   UserInfo, 
   Tariff,
   Branch,
   Car,
   Rent,
   Additional,
   RentAdditional,
   Incident
}
