const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class ProductCategory extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      productId: {
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
          model: 'Product',
          key: 'product_id'
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        field: 'category_id',
        references: {
          model: 'Category',
          key: 'category_id'
        }
      }
    }, {
      timestamps: false,
      tableName: 'product_category',
      modelName: 'ProductCategory',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['ProductCategory'].belongsTo(models['Product'], {
      as: 'product',
      foreignKey: 'product_id'
    });
    models['ProductCategory'].belongsTo(models['Category'], {
      as: 'category',
      foreignKey: 'category_id'
    });
  }

}

module.exports = ProductCategory;
