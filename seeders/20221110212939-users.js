'use strict'
const { User, sequelize } = require('../models')
const falso = require('@ngneat/falso')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await Promise.all(
      [...Array(100)].map(async () => {
        let user = await User.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          userName: falso.randUserName(),
          image: falso.randAvatar(),
          firstName: falso.randFirstName(),
          lastName: falso.randLastName(),
          description: falso.randQuote(),
          email: falso.randEmail(),
          password: falso.randPassword(),
          zodiacId: falso.randNumber({ min: 1, max: 12 }),
          phoneNumber: falso.randPhoneNumber(),
          gender: falso.randGender(),

          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    await queryInterface.bulkInsert('users', users)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
