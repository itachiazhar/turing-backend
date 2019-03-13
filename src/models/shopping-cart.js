const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class ShoppingCart extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'item_id'
      },
      cartId: {
        type: DataTypes.CHAR(32),
        allowNull: false,
        field: 'cart_id'
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
      quantity: {
        type: DataTypes.INTEGER
      },
      buyNow: {
        type: DataTypes.TINYINT,
        field: 'buy_now'
      },
      addedOn: {
        type: DataTypes.DATE,
        field: 'added_on'
      }
    }, {
      timestamps: false,
      tableName: 'shopping_cart',
      modelName: 'ShoppingCart',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['ShoppingCart'].belongsToMany(models['Product'], {
      as: 'products',
      foreignKey: 'product_id'
    });
  }

}

module.exports = ShoppingCart;
