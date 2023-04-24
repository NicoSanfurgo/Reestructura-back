const { COOKIE_USER } = require("../utils/constants")


const sessionLogin = async (req,res)=>{
    
    res
    .cookie(COOKIE_USER, req.user.token, { maxAge: 300000, httpOnly: true })
    .send( req.user )
}

const loginRegister = async (req,res)=>{
    res.send(req.user) 
}  
const getCurrent = async (req,res)=>{
    res.send(req.user) 
}  




module.exports={
    sessionLogin,
    loginRegister,
    getCurrent
}