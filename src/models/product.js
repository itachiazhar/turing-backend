const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Product extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'product_id'
      },
      name: {
        type: DataTypes.STRING(100)
      },
      description: {
        type: DataTypes.STRING(1000)
      },
      price: {
        type: DataTypes.DECIMAL(10, 2)
      },
      image: {
        type: DataTypes.STRING(150)
      },
      image2: {
        type: DataTypes.STRING(150)
      },
      thumbnail: {
        type: DataTypes.STRING(150)
      },
      display: {
        type: DataTypes.TINYINT
      }
    }, {
      timestamps: false,
      tableName: 'product',
      modelName: 'Product',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Product'].hasMany(models['ProductAttribute'], {
      as: 'productAttributes',
      foreignKey: 'product_id'
    });
    models['Product'].hasMany(models['Category'], {
      as: 'productCategories',
      foreignKey: 'product_id'
    });
    models['Product'].belongsToMany(models['ShoppingCart'], {
      as: 'shoppingCarts',
      foreignKey: 'product_id'
    });
  }

}

module.exports = Product;
