const {Router} = require('express')
const sessionController= require('../controller/session.controller')
const passport = require('passport')
const { REGISTER_STRATEGY, LOGIN_STRATEGY, JWT_STRATEGY} = require('../utils/constants')
const passportCustom = require('../utils/passportCall')
const router = Router()


router.post('/register', passport.authenticate(REGISTER_STRATEGY,{session:false}) , sessionController.loginRegister)
router.post('/login',passport.authenticate(LOGIN_STRATEGY,{session:false}), sessionController.sessionLogin)
router.get('/current',passportCustom(JWT_STRATEGY), sessionController.getCurrent)

module.exports = router;