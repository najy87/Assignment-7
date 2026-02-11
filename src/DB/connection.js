const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ("sequelize","root","123456",{
    port:3307,
    host:'localhost',
    dialect:"mysql"
})



function connectDB (){
    sequelize.authenticate()
.then(()=>{
    console.log("DB connected successfully")
})
.catch(()=>{console.log("fail to connect to DB")
})
}


module.exports={connectDB,sequelize}