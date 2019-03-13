const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const forceSsl = require('express-force-ssl');
const httpsConfig = require('./configs/https');
const config = require('./configs/turing');
const Ddos = require('ddos');
const dosConfig = require('./configs/dos');
const authentication = require('./middlewares/authentication')();
const fs = require('fs');
const path = require('path');
const app = express();
const { RouteNotFoundError } = require('./responses/index');
const { Sequelize, sequelize } = require('./utils/database');

const ddos = new Ddos(dosConfig);
const authenticationRoutes = authentication.unless({
  path: [
    '/auth/register',
    '/auth/login'
  ]
});

const authRoutes = require('./authentication/routes');

app.set('forceSSLOptions', httpsConfig.ssl);
app.use(ddos.express);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(forceSsl);
app.use(authenticationRoutes);

app.use('/auth', authRoutes);

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
  const msg = `Requested route ${req.url} does not exists`;
  const err = new RouteNotFoundError(msg);
  next(err);
});

/// unhandled error handlers
app.use((err, req, res, next) => {
  const { status, name, message, stack, data } = err;
  const response = { status, name, message, data };
  if (config.env === 'development') {
    response.stack = stack;
  }
  res.status(err.statusCode || 500).json(response);
});

// fs.readdirSync(path.join(config.baseDirectory, 'src', 'jobs'))
//   .filter(filename => /^[a-z].*\.js$/.test(filename))
//   .map(filename => path.join(config.baseDirectory, 'src', 'jobs', filename))
//   .forEach(require);

fs.readdirSync(path.join(config.baseDirectory, 'src', 'models'))
  .filter(filename => /^[a-z].*\.js$/.test(filename))
  .map(filename => path.join(config.baseDirectory, 'src', 'models', filename))
  .map(require)
  .map(model => model.init(sequelize, Sequelize))
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate());

process.on('uncaughtException', (err) => {
  connectionPool.end();
  logger.error(err);
});

module.exports = app;
