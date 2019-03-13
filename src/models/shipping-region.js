const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class ShippingRegion extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      shippingRegionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'shipping_region_id'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'shipping_region',
      modelName: 'ShippingRegion',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['ShippingRegion'].hasMany(models['Shipping'], {
      as: 'shippings',
      foreignKey: 'shipping_region_id'
    });
  }

}

module.exports = ShippingRegion;
