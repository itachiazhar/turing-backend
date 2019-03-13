const { Sequelize, sequelize } = require('./../utils/database');
const logger = require('./../utils/logger');
const _ = require('lodash');

class Category extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'category_id'
      },
      departmentId: {
        type: DataTypes.INTEGER,
        field: 'department_id',
        references: {
          model: 'Department',
          key: 'department_id'
        }
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'category',
      modelName: 'Category',
      sequelize
    });
  }

  static associate() {
    const { models } = sequelize;
    models['Category'].belongsTo(models['Department'], {
      as: 'department',
      foreignKey: 'department_id'
    });
  }

}

module.exports = Category;
