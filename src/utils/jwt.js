const jwtConfig = require('./../configs/jwt');
const jwt   = require('jsonwebtoken');
const _ = require('lodash');

class JWT {

  static sign (payload) {
    const signOptions = _.assign(jwtConfig.options, {
      algorithm: jwtConfig.signAlgorithm
    });
    return jwt.sign(payload, jwtConfig.privateKey, signOptions);
  }

  static verify (token) {
    const verifyOptions = _.assign(jwtConfig.options, {
      algorithm: jwtConfig.verifyAlgorithm
    });
    try {
      return jwt.verify(token, jwtConfig.publicKey, verifyOptions);
    } catch (err){
      return false;
    }
  }

  static decode (token) {
    return jwt.decode(token, {complete: true});
  }

}

module.exports = JWT;
