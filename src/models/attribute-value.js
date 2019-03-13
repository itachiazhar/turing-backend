const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class AttributeValue extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      attributeValueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'attribute_value_id'
      },
      attributeId: {
        type: DataTypes.INTEGER,
        field: 'attribute_id',
        references: {
          model: 'Attribute',
          key: 'attribute_id'
        }
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'attribute_value',
      modelName: 'AttributeValue',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['AttributeValue'].belongsTo(models['Attribute'], {
      as: 'attribute',
      foreignKey: 'attribute_id'
    });
  }

}

module.exports = AttributeValue;
