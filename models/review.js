'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user_reviews',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Review.belongsTo(models.Zodiac, {
        foreignKey: 'zodiac_id',
        as: 'zodiac_reviews',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Review.init(
    {
      rating: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      likes: DataTypes.INTEGER,
      dislikes: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      zodiacId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'zodiac_id',
        onDelete: 'CASCADE',
        references: {
          model: 'zodiacs',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews'
    }
  )
  return Review
}
