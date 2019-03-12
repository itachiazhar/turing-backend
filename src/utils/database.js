const dbConfig = require('./../configs/database');
const mysql = require('mysql');
const connectionPool  = mysql.createPool(dbConfig);

connectionPool.on('connection', function (connection) {
  connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };
});

class DB {

  static query (sql, values) {
    return new Promise((resolve, reject) => {
      connectionPool.query({
        sql,
        values
      }, (error, results, fields) => {
        if (error) return reject(error);
        else return resolve({ results, fields });
      });
    });
  }

}

module.exports = {
  mysql,
  connectionPool,
  DB
};
