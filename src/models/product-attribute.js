const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class ProductAttribute extends Sequelize.Model {

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
      attributeValueId: {
        type: DataTypes.INTEGER,
        field: 'attribute_value_id',
        references: {
          model: 'AttributeValue',
          key: 'attribute_value_id'
        }
      }
    }, {
      timestamps: false,
      tableName: 'product_attribute',
      modelName: 'ProductAttribute',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['ProductAttribute'].belongsTo(models['Product'], {
      as: 'product',
      foreignKey: 'product_id'
    });
    models['ProductAttribute'].belongsTo(models['AttributeValue'], {
      as: 'attributeValue',
      foreignKey: 'attribute_value_id'
    });
  }

}

module.exports = ProductAttribute;
