'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Zodiac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Zodiac.hasMany(models.Review, {
        foreignKey: 'zodiac_id',
        as: 'zodiac_reviews',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Zodiac.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Zodiac',
      tableName: 'zodiacs'
    }
  )
  return Zodiac
}
