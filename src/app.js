const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const forceSsl = require('express-force-ssl');
const httpsConfig = require('./configs/https');
const config = require('./configs/turing');
const app = express();
const { RouteNotFoundError } = require('./exceptions/index');

app.set('forceSSLOptions', httpsConfig.ssl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(forceSsl);

app.get('/', (req, res) => {
  res.json({
    status: 'OK'
  })
});

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
  const msg = `Requested route ${req.url} does not exists`;
  const err = new RouteNotFoundError(msg);
  next(err);
});

/// unhandled error handlers
app.use((err, req, res, next) => {
  const { status, name, message, stack, data } = err;
  const response = { status, name, message };
  if (config.env === 'development') {
    response.stack = stack;
    response.data = data;
  }
  res.status(err.status || 500).json(response);
});

process.on('uncaughtException', (err) => {
  logger.error(err);
});

module.exports = app;
