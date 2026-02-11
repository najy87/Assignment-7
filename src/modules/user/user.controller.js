const { Router } = require("express");
const { isUserExist ,createUser, updateUser, deleteUser, getUser, getUserByEmail} = require("./user.service");


const router = Router()




// router.get('/:id',async (req,res,next)=>{
//     try {
//         const {id}= req.params
//         const user =  await getUser(id)
//         if(getUser) return res.status(200).json({user})
//     } catch (error) {
//     return res.status(error.cause || 500 ).json({massege:error.massege,succsess:false})
//     }
// })


router.get('/by-email',async (req,res,next)=>{
    try {
        const {email}= req.query.email
        const user =  await getUserByEmail(email)
        if(user) return res.status(200).json({user})
    } catch (error) {
    return res.status(error.cause || 500 ).json({massege:error.massege,succsess:false})
    }
})






router.post('/signup',async (req,res,next)=>{      // create user 
try {
    // get data from req
    const {name ,email,password} = req.body;

    // check user exist 
   const userExist =  await isUserExist({email});
   if (userExist) throw new Error("user is already exist.",{cause:409})
   
   // create user 
    const createdUser = await createUser({name ,email,password})
    return res.status(201).json({massege:"user created successfully",succsess:true,data:{user:createdUser}})
    

    // send res 
} catch (error) {
    return res.status(error.cause || 500 ).json({massege:error.massege,succsess:false})
}
})



router.put('/:id',async (req,res,next)=>{
try {
    // get data from req 
    const {id} = req.params;
    const {name, email , password } = req.body; 
    await updateUser({name, email , password },{id});
    return res.status(200).json({massege:"user updated successfully",succsess:true})
     
} catch (error) {
    return res.status(error.cause || 500).json({massege:error.massege,succsess:false})
}
})





router.delete('/:id',async (req,res,next)=>{
    try {
        const {id} = req.params
        await deleteUser({id}) 
        return res.status(200).json({massege:"user deleted successfully",succsess:true})
    } catch (error) {
        return res.status(error.cause || 500).json({massege:error.massege,succsess:false})
    }
})

module.exports ={userRouter : router}