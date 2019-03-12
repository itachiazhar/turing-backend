const { DB, mysql } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Customer {

  static add (customer) {
    const sql = 'CALL customer_add(:name, :email, :password)';
    return DB.query(sql, customer);
  }

  static async get (id) {
    const sql = 'CALL customer_get_customer(:id)';
    const { results, fields } = await DB.query(sql, { id });
    return results[0];
  }

  static async getByEmail (email) {
    const sql = 'CALL customer_get_login_info(:email)';
    const { results, fields } = await DB.query(sql, { email });
    return results[0];
  }
}

module.exports = Customer;
