const path = require('path');

module.exports = {
  baseDirectory: path.join(__dirname, '..', '..'),
  httpPort: 3000,
  env: process.env
};
