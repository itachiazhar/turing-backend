const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Attribute extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      attributeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'attribute_id'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'attribute',
      modelName: 'Attribute',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Attribute'].hasOne(models['AttributeValue'], {
      as: 'attributeValue',
      foreignKey: 'attribute_id'
    });
  }

}

module.exports = Attribute;
