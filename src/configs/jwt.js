const fs = require('fs');
const config = require('./turing');

module.exports = {
  privateKey: fs.readFileSync(`${config.baseDirectory}/crypto/jwt.key`, 'utf8'),
  publicKey: fs.readFileSync(`${config.baseDirectory}/crypto/jwt.key`, 'utf8'),
  options: {
    issuer: 'Turing Corp',
    subject: 'azhar@turing.com',
    audience: 'turing.com',
    expiresIn: '1h',
  },
  signAlgorithm: 'RS256',
  verifyAlgorithm: ['RS256']
};
