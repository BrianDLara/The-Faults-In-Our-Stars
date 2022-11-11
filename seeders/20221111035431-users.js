'use strict'
const { User, Zodiac, sequelize } = require('../models')
const { Op } = require('sequelize')
const falso = require('@ngneat/falso')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await Promise.all(
      [...Array(100)].map(async () => {
        const user = await User.findOne({
          order: sequelize.random(),
          // where: { zodiacId: { [Op.not]: zodiac.id } },
          raw: true
        })

        const zodiacs = await Zodiac.findAll({ raw: true })
        console.log(zodiacs)

        return {
          username: falso.randUserName(),
          image: falso.randAvatar({ size: 600 }),
          firstName: falso.randFirstName(),
          lastName: falso.randLastName(),
          description: falso.randQuote(),
          email: falso.randEmail(),
          passwordDigest: falso.randPassword(),
          phoneNumber: falso.randPhoneNumber(),
          gender: falso.randGender(),
          zodiacId: zodiacs[Math.floor(Math.random() * zodiacs.length)].id,
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
