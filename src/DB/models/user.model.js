const {sequelize} = require('../connection')
const {DataTypes} = require('sequelize')
//model >> class
const User = sequelize.define("User",{
    name:{type: DataTypes.STRING,allowNull : false },
    email :{type: DataTypes.STRING(200),allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false}
})  


module.exports = {User}