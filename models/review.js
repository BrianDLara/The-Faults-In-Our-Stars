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
      description: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'User',
          key: 'id'
        }
      },
      likes: DataTypes.INTEGER,
      dislikes: DataTypes.INTEGER,
      zodiacId: {
        type: DataTypes.INTEGER,
        allowNull: false
        // references: {
        //   model: 'zodiacsigns',
        //   key: 'id'
        // }
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
