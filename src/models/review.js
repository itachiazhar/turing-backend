const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Review extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'review_id'
      },
      customerId: {
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
          model: 'Customer',
          key: 'customer_id'
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
      review: {
        type: DataTypes.TEXT,
      },
      rating: {
        type: DataTypes.SMALLINT
      },
      createdOn: {
        type: DataTypes.DATE,
        field: 'created_on'
      }
    }, {
      timestamps: false,
      tableName: 'review',
      modelName: 'Review',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Review'].belongsTo(models['Product'], {
      as: 'product',
      foreignKey: 'product_id'
    });
    models['Review'].belongsTo(models['Customer'], {
      as: 'customer',
      foreignKey: 'customer_id'
    });
  }

}

module.exports = Review;
