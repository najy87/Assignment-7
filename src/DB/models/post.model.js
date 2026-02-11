const {sequelize} = require('../connection')
const {DataTypes} = require('sequelize')
const { User } = require('./user.model')

const Post = sequelize.define("Post",{
    title:{type:DataTypes.STRING,allowNull:false},
    content:{type:DataTypes.TEXT},
    description:{type:DataTypes.TEXT,allowNull:false}
})

Post.belongsTo(User,{ foreignKey : {name:"u_id"}})
User.hasMany(Post,{ foreignKey : {name:"u_id"}})

module.exports = {Post}