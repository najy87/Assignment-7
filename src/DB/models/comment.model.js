const {sequelize} = require('../connection')
const {DataTypes} = require('sequelize')
const { Post } = require('./post.model')

const Comment = sequelize.define("comment",{
    title:{type:DataTypes.STRING,allowNull:false},
    content:{type:DataTypes.TEXT},
    description:{type:DataTypes.TEXT,allowNull:false}
})

Comment.belongsTo(Post,{ foreignKey : {name:"post_id"}})
Post.hasMany(Comment,{ foreignKey : {name:"post_id"}})

module.exports = {Comment}