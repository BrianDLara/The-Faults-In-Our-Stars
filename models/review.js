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
        foreignKey: 'userId'
        // as: 'user_reviews',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
      })
      // Review.belongsTo(models.Zodiac, {
      //   foreignKey: 'zodiacId'
      //   // as: 'zodiac_reviews',
      //   // onDelete: 'CASCADE',
      //   // onUpdate: 'CASCADE'
      // })
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
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        zodiacId: {
          type: DataTypes.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'signs',
            key: 'id'
          }
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
