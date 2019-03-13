const dbConfig = require('./../configs/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig.options);

module.exports = {
  sequelize,
  Sequelize
};
