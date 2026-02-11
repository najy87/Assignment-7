const express = require('express')
const port = 3000;
const {connectDB ,User, sequelize} = require('./DB');
const { userRouter,postRouter } = require('./modules');
const app = express() 
connectDB();
app.use(express.json()) // parse data from req.body >> raw json
// sequelize 
// define a user 
//sync tables 
// sequelize.sync({alter:true})
// User.create({name:"3laa",email:'3laa@g.com',password:"1234"})

app.use('/user',userRouter)
app.use('/Post',postRouter)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
}) 