const dotenv = require('dotenv')

dotenv.config()


module.exports ={
  MONGODBURL: process.env.MONGODBURL,
  PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
  REGISTER_STRATEGY: process.env.REGISTER_STRATEGY,
  LOGIN_STRATEGY: process.env.LOGIN_STRATEGY,
  JWT_STRATEGY: process.env.JWT_STRATEGY,
  PORT : process.env.PORT,
  COOKIE_USER: process.env.COOKIE_USER
}