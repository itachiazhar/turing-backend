const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Shipping extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      shippingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'shipping_id'
      },
      shippingType: {
        type: DataTypes.STRING(100),
        field: 'shipping_type',
        allowNull: false
      },
      shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'shipping_cost',
        allowNull: false
      },
      shippingRegionId: {
        type: DataTypes.INTEGER,
        field: 'shipping_region_id',
        references: {
          model: 'ShippingRegion',
          key: 'shipping_region_id'
        }
      }
    }, {
      timestamps: false,
      tableName: 'shipping',
      modelName: 'Shipping',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Shipping'].belongsTo(models['ShippingRegion'], {
      as: 'shippingRegion',
      foreignKey: 'shipping_region_id'
    });
  }

}

module.exports = Shipping;
