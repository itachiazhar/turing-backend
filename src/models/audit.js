const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Audit extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      auditId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'audit_id'
      },
      orderId: {
        type: DataTypes.INTEGER,
        field: 'order_id',
        references: {
          model: 'Order',
          key: 'order_id'
        }
      },
      createdOn: {
        type: DataTypes.DATE,
        field: 'created_on'
      },
      message: {
        type: DataTypes.TEXT,
      },
      code: {
        type: DataTypes.INTEGER
      }
    }, {
      timestamps: false,
      tableName: 'audit',
      modelName: 'Audit',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Audit'].belongsTo(models['Order'], {
      as: 'order',
      foreignKey: 'order_id'
    });
  }

}

module.exports = Audit;
