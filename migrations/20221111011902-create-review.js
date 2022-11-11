'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      likes: {
        type: Sequelize.INTEGER
      },
      dislikes: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
<<<<<<< HEAD
        onDelete: 'CASCADE'
        // references: {
        //   model: 'users',
        //   key: 'id'
        // }
=======
        field: 'user_id',
        onDelete: 'CASCADE'
>>>>>>> d3541867e3b75f9e0732186ac892aa5ab6ad42b5
      },
      zodiacId: {
        type: Sequelize.INTEGER,
        allowNull: false,
<<<<<<< HEAD
        onDelete: 'CASCADE'
        // references: {
        //   model: 'signs',
        //   key: 'id'
        // }
=======
        field: 'zodiac_id',
        onDelete: 'CASCADE'
>>>>>>> d3541867e3b75f9e0732186ac892aa5ab6ad42b5
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews')
  }
}
