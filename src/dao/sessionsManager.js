const userModel = require ('../dao/models/user.model')

class sessionManager {
   
  getSession = async (email, password) => {
    return await userModel.findOne({email, password});
  }

  getEmail = async (email) => {
       return await userModel.findOne(email);
  }
 
  createUser = async (user)=>{
      const { firstName,lastName, email, age, password,rol} = user
      return await userModel.create({firstName , lastName, email, age, password, rol })
  }


}
 
module.exports = new sessionManager