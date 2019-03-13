const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Orders extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'order_id'
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'total_amount'
      },
      createdOn: {
        type: DataTypes.DATE,
        field: 'created_on'
      },
      shippedOn: {
        type: DataTypes.DATE,
        field: 'shipped_on'
      },
      status: {
        type: DataTypes.INTEGER
      },
      comments: {
        type: DataTypes.STRING(255)
      },
      customerId: {
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
          model: 'Customer',
          key: 'customer_id'
        }
      },
      authCode: {
        type: DataTypes.STRING(50),
        field: 'auth_code'
      },
      reference: {
        type: DataTypes.STRING(50)
      },
      shippingId: {
        type: DataTypes.INTEGER,
        field: 'shipping_id',
        references: {
          model: 'Shipping',
          key: 'shipping_id'
        }
      }
    }, {
      timestamps: false,
      tableName: 'orders',
      modelName: 'Orders',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Order'].belongsTo(models['Customer'], {
      as: 'customer',
      foreignKey: 'customer_id'
    });
    models['Order'].hasOne(models['Tax'], {
      as: 'tax',
      foreignKey: 'tax_id'
    });
  }

}

module.exports = Orders;
