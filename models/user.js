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
        as: 'user_reviews',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      User.hasOne(models.Zodiac, {
        foreignKey: 'id',
        as: 'signs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUserName: true
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
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
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false
      },

      zodiacId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'signs',
          key: 'id'
        }
      },

      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
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
