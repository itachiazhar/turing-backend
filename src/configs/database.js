module.exports = {
  user: 'root',
  password: '',
  database: 'tshirtshop',
  options: {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  }
};
