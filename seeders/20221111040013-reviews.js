'use strict'
const { Review, User, Zodiac, sequelize } = require('../models')
const falso = require('@ngneat/falso')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = await Promise.all(
      [...Array(100)].map(async () => {
        // let review = await Review.findOne({
        //   order: sequelize.random(),
        //   raw: true
        // })
        let user = await User.findOne({ order: sequelize.random(), raw: true })
        let zodiac = await Zodiac.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          rating: falso.randNumber({ min: 1, max: 5 }),
          title: falso.randCatchPhrase(),
          description: falso.randQuote(),
          user_id: user.id,
          // falso.randNumber({ min: 1, max: 100 }),
          zodiac_id: zodiac.id,
          // falso.randNumber({ min: 1, max: 12 }),

          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    await queryInterface.bulkInsert('reviews', reviews)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('reviews', null, {})
  }
}
