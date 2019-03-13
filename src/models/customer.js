const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Customer extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'customer_id'
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      creditCard: {
        type: DataTypes.TEXT,
        field: 'credit_card'
      },
      address1: {
        type: DataTypes.STRING(100),
        field: 'address_1'
      },
      address2: {
        type: DataTypes.STRING(100),
        field: 'address_2'
      },
      city: {
        type: DataTypes.STRING(100)
      },
      region: {
        type: DataTypes.STRING(100)
      },
      postalCode: {
        type: DataTypes.STRING(100),
        field: 'postal_code'
      },
      country: {
        type: DataTypes.STRING(100)
      },
      dayPhone: {
        type: DataTypes.STRING(100),
        field: 'day_phone'
      },
      evePhone: {
        type: DataTypes.STRING(100),
        field: 'eve_phone'
      },
      mobPhone: {
        type: DataTypes.STRING(100),
        field: 'mob_phone'
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
      tableName: 'customer',
      modelName: 'Customer',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Customer'].belongsTo(models['ShippingRegion'], {
      as: 'shippingRegion',
      foreignKey: 'shipping_region_id'
    });
    models['Customer'].hasMany(models['Order'], {
      as: 'orders',
      foreignKey: 'customer_id'
    });
    models['Customer'].hasMany(models['Review'], {
      as: 'reviews',
      foreignKey: 'customer_id'
    });
  }

  static routineCustomerAdd (customer) {
    const sql = 'CALL customer_add(:name, :email, :password)';
    return sequelize.query(sql, { replacements: customer }, sequelize.QueryTypes.RAW);
  }

  static async routineGetCustomer(email) {
    const sql = 'CALL customer_get_customer(:id)';
    return await sequelize.query(sql, { replacements: { id } }, sequelize.QueryTypes.RAW);
  }

  static async routineGetByEmail(email) {
    const sql = 'CALL customer_get_login_info(:email)';
    return await sequelize.query(sql, { replacements: { email } }, sequelize.QueryTypes.RAW);
  }

}

module.exports = Customer;
