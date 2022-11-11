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
        foreignKey: 'userId'
        // as: 'user_reviews',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
      })

      User.hasMany(models.Zodiac, {
        foreignKey: 'userId'
        // as: 'user_reviews',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
      })
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      image: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      description: DataTypes.TEXT,
      email: DataTypes.STRING,
      passwordDigest: DataTypes.STRING,
      phoneNumber: DataTypes.TEXT,
      gender: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
