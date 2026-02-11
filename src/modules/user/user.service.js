const {User} = require('../../DB')
const isUserExist = async (condition)=>{
    // check user existence 
   const user = await User.findOne({ where : condition })
   if(!user) return false;
   return true;
}

// {} || null

const getUser = async (id)=>{
    const user = await User.findByPk(id)
    if(!user)  throw new Error ('no user found',{cause:404}) 
    return user;
}


const getUserByEmail = async (condition)=>{
    const user = await User.findOne({where:condition})
    if(!user) throw new Error  ('no user found',{cause:404})
        return user 
}

const createUser = async (userData)=>{
    // prepare data 
    // const user = new User(userData)

    // const createdUser = await user.save()
    
    const createdUser = await User.create(userData)
    return createdUser;
}



const updateUser = async (newData,condition)=>{
   const affectedUsers =  await User.update(newData,{where:condition})
   if(affectedUsers==0)  throw new Error ('user not updated',{cause:400})
    return true;
     
}

const deleteUser = async (condition)=>{
  const deletedUsers =  await User.destroy({where:condition})
  if(deletedUsers==0) throw new Error ('user not found',{cause:404})
    return true; 
} 



module.exports={isUserExist,getUser,createUser,updateUser,deleteUser,getUserByEmail}