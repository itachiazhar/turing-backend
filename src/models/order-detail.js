const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class OrderDetail extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'item_id'
      },
      orderId: {
        type: DataTypes.INTEGER,
        field: 'order_id',
        references: {
          model: 'Order',
          key: 'order_id'
        }
      },
      productId: {
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
          model: 'Product',
          key: 'product_id'
        }
      },
      attribs: {
        type: DataTypes.STRING(1000),
        field: 'attributes'
      },
      productName: {
        type: DataTypes.STRING(100),
        field: 'product_name'
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      unitCode: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'unit_cost'
      }
    }, {
      timestamps: false,
      tableName: 'order_detail',
      modelName: 'OrderDetail',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['OrderDetail'].belongsTo(models['Order'], {
      as: 'order',
      foreignKey: 'order_id'
    });
    models['OrderDetail'].belongsTo(models['Product'], {
      as: 'product',
      foreignKey: 'product_id'
    });
  }

}

module.exports = OrderDetail;
