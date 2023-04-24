const passport = require('passport');

const passportCustom = (strategy) => {
  return (req, res, next) => {
    
      passport.authenticate(strategy, { session: false }, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return res.status(401).send({
          status: 'error',
          msg: info.message ? info.message : info.toString(),
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
 };


module.exports = passportCustom;