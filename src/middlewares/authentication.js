const unless = require('express-unless');
const JWT = require('./../utils/jwt');
const { JwtTokenNotFoundError, InvalidJwtTokenError } = require('../responses/index');

module.exports = function () {
  const authentication = function (req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      // error token not found
      const err = new JwtTokenNotFoundError();
      return next(err);
    } else {
      if (JWT.verify(authorization)) {
        req.userData = req.userData || {};
        req.userData.jwtDecode = JWT.decode(authorization);
        return next();
      } else {
        // error invalid token
        const err = new InvalidJwtTokenError();
        return next(err);
      }
    }
  };
  authentication.unless = unless;
  return authentication;
};
