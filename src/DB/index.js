const {connectDB,sequelize} = require('./connection')
const {User}= require('./models/user.model')
const {Post}= require('./models/post.model')
const {Comment} = require('./models/comment.model')


module.exports ={connectDB,sequelize,User,Post,Comment} 