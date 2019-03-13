const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Tax extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      taxId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'tax_id'
      },
      taxType: {
        type: DataTypes.STRING(100),
        field: 'tax_type',
        allowNull: false
      },
      taxPercentage: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'tax_percentage',
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'tax',
      modelName: 'Tax',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Tax'].belongsToMany(models['Order'], {
      as: 'taxs',
      foreignKey: 'tax_id'
    });
  }

}

module.exports = Tax;
