const path = require('path');
const fs = require('fs');
const baseDirectory = path.join(__dirname, '..', '..');

module.exports = {
  baseDirectory,
  httpPort: 3000,
  env: process.env.NODE_ENV,
  cache: {
    ttl: 5 * 60
  },
  secret: 'turing',
  salt: '$2a$08$mmLx0CBbqcXo7YQ.F9WUUe'
};
