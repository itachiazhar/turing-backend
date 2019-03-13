const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Department extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'department_id'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'department',
      modelName: 'Department',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Department'].hasMany(models['Category'], {
      as: 'categories',
      foreignKey: 'department_id'
    });
  }

}

module.exports = Department;
