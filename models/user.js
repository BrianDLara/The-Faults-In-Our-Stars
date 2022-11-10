'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        as: 'user_review',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      User.hasOne(models.ZodiacSign, {
        foreignKey: 'userId',
        as: 'user_sign',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUserName: true
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zodiacId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ZodiacSign',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
