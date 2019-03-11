const fs = require('fs');
const configs = require('./turing');

module.exports = {
  https: {
    key: fs.readFileSync(`${configs.baseDirectory}/crypto/server-key.pem`),
    cert: fs.readFileSync(`${configs.baseDirectory}/crypto/server-crt.pem`),
    honorCipherOrder: true,
    NPNProtocols: ['http/1.1', 'http/1.0'],
    secureProtocol: 'TLSv1_2_method',
    rejectUnauthorized: false
  },
  port: 8090,
  ssl: {
    enable301Redirects: true,
    trustXFPHeader: false,
    httpsPort: 8090,
    sslRequiredMessage: 'SSL Required.'
  }
};
