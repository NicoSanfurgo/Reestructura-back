const passport = require("passport");
const passportLocal = require("passport-local");
const { REGISTER_STRATEGY, LOGIN_STRATEGY, JWT_STRATEGY, PRIVATE_KEY_JWT, COOKIE_USER } = require("../config/config");
const { hashPassword, comparePassword } = require("./hashpassword");
const {Strategy, ExtractJwt } = require('passport-jwt');
const { generateToken } = require("./jwt");
const userModel = require("../dao/models/user.model");
const sessionManager = require("../dao/sessionManager");




const cookieEstractor = (req) =>{
  let token = null;
  if(req && req.cookies) {
    token = req.cookies[COOKIE_USER]
  }
   return token;
} 


const initPassaport = () => {

passport.use(
  JWT_STRATEGY, new Strategy ({
     jwtFromRequest:ExtractJwt.fromExtractors([cookieEstractor]),
     secretOrKey: PRIVATE_KEY_JWT
}, async(jwt_payload, done) => {
    try {
          
          const {payload} = jwt_payload
          const user = await userModel.findById(payload.id);
          delete user._doc.password
          console.log(user)
          done (null, {user:user._doc})
    } catch (error) {
      done(error)
    }
})
);



  passport.use(
    REGISTER_STRATEGY ,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },async (req, username, password, done) => {
          const { firstName, lastName, age } = req.body;
        try {
           
           const exitEmail = await sessionManager.getEmail({email:username});
            if (exitEmail) {
              done('register Error', false,{message:"Usuario Existente con ese Emial"} );
            } else {
              const hash = await hashPassword(password);
              if (username === "adminCoder@coder.com") {
                const user = await sessionManager.createUser({
                  firstName: firstName,
                  lastName: lastName,
                  age:age,
                  email: username,
                  password: hash,
                  rol: "administrador",
                });
                done(null, user);
              } else {
                const user = await sessionManager.createUser({
                  firstName: firstName,
                  lastName: lastName,
                  age:age,
                  email: username,
                  password: hash,
                });
               
                done(null, user);
              }
            }
            
        } catch (error) {
            done(error)
        }
      }
    )
  );
 

  passport.use(
    LOGIN_STRATEGY ,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },async (req, username, password, done) => {
       
        try {

          const user = await sessionManager.getEmail({email:username})
          const isVadidPassword = await comparePassword(password, user.password)
          if (user && isVadidPassword) {
            const token = generateToken({id:user.id, rol:user.rol})
            if (token) {
              done(null, {token:token})

            } else{
              done(null, false); 
            }
           
          }else{
            done(null, false);  
          }
         
         } catch (error) {
          done(null, false);
              
        }
      }
    )
  );
  
};




module.exports =  initPassaport