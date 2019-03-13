const { sequelize, Sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const bcrypt = require('bcrypt-nodejs');
const config = require('./../configs/turing');
const JWT = require('./../utils/jwt');
const _ = require('lodash');
const {
  ResourceExistsError,
  ResourceCreatedSuccess,
  ResourceNotFoundError,
  BadRequestError,
  TuringSuccess
} = require('./../responses/index');

class AuthenticationHandler {

  static async register (req, res) {
    const { Customer } = sequelize.models;
    const { name, email, password } = req.body;
    const exists = await Customer.routineGetByEmail(email);
    if (exists.length > 0) {
      const err = new ResourceExistsError('customer with email exists');
      return res.status(err.statusCode).json(err);
    }
    await Customer.routineCustomerAdd({
      name,
      email,
      password: bcrypt.hashSync(password, config.salt)
    });
    const success = new ResourceCreatedSuccess('customer registered successfully.');
    return res.status(success.statusCode).json(success);
  }

  static async login (req, res) {
    const { email, password } = req.body;
    const exists = await Customer.routineGetByEmail(email);
    if (exists.length === 0) {
      const err = new ResourceNotFoundError('customer with email does not exists');
      return res.status(err.statusCode).json(err);
    }
    const customer = exists[0];
    customer.email = email;
    const encrypted = bcrypt.hashSync(password, config.salt);
    if (customer.password !== encrypted) {
      const err = new BadRequestError('customer invalid password');
      return res.status(err.statusCode).json(err);
    }
    const data = JWT.sign(_.pick(customer, ['id', 'email']));
    const success = new TuringSuccess('login successful.');
    success.data = data;
    res.status(success.statusCode).json(success);
  }

}

module.exports = AuthenticationHandler;
