'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ZodiacSign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ZodiacSign.hasMany(models.Review, {
        // foreignKey: 'user_id',
        // as: 'zodiac_review',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
      })
      ZodiacSign.hasMany(models.User, {
        // foreignKey: 'user_id',
        // as: 'user_sign',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
      })
    }
  }
  ZodiacSign.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ZodiacSign',
      tableName: 'zodiacsigns'
    }
  )
  return ZodiacSign
}
