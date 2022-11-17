'use strict'
const { User, Zodiac, sequelize } = require('../models')
const { Op } = require('sequelize')
const falso = require('@ngneat/falso')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userImages = [
      'https://i.imgur.com/6ETfboe.jpeg',
      'https://i.imgur.com/xsUQMTv.jpeg',
      'https://i.imgur.com/8NzOvCm.jpeg',
      'https://i.imgur.com/FdtVVNk.jpeg',
      'https://i.imgur.com/xsV0sDX.jpeg',
      'https://i.imgur.com/J65dL02.jpeg',
      'https://i.imgur.com/jYWNuYA.jpeg',
      'https://i.imgur.com/1QyvYbdb.jpg',
      'https://i.imgur.com/dXO886h.jpeg',
      'https://i.imgur.com/Tl1ieNZ.jpeg',
      'https://i.imgur.com/Fl4JkDf.jpeg',
      'https://i.imgur.com/AsQxXpl.jpeg',
      'https://i.imgur.com/aq6aFiv.jpeg',
      'https://i.imgur.com/CXmZzBF.png',
      'https://i.imgur.com/i3WmsKd.jpeg',
      'https://i.imgur.com/nxxrJ02.jpeg',
      'https://i.imgur.com/0n1n6YT.jpeg',
      'https://i.imgur.com/q2t3Vds.jpeg',
      'https://i.imgur.com/1k6iW79b.jpg',
      'https://i.imgur.com/PbFmHrob.jpg',
      'https://i.imgur.com/CBPG6Wt.jpeg',
      'https://i.imgur.com/nE3Tjn9b.jpg',
      'https://i.imgur.com/ZC27dqd.jpeg',
      'https://i.imgur.com/2DCExxN.jpeg',
      'https://i.imgur.com/DrPwUZx.jpeg',
      'https://i.imgur.com/56dMwBCb.jpg',
      'https://i.imgur.com/mNKcp3U.jpeg',
      'https://i.imgur.com/IIoqTOT.jpeg',
      'https://i.imgur.com/JP54dSfb.jpg',
      'https://i.imgur.com/BMX1DY4.jpeg',
      'https://i.imgur.com/AvLYnTN.jpeg',
      'https://i.imgur.com/a5vaGBw.jpeg',
      'https://i.imgur.com/3P5E9AN.jpeg',
      'https://i.imgur.com/rgSsqWq_d.webp?maxwidth=520&shape=thumb&fidelity=high',
      'https://i.imgur.com/mry5qHS.jpeg',
      'https://i.imgur.com/lzib1sWb.jpg',
      'https://i.imgur.com/8HgGhHab.jpg',
      'https://i.imgur.com/7t8FAqBb.jpg',
      'https://i.imgur.com/JQr9VeKb.jpg',
      'https://i.imgur.com/HJYAfB5b.jpg',
      'https://i.imgur.com/VyynLWYb.jpg',
      'https://i.imgur.com/wOGwPlIb.jpg',
      'https://i.imgur.com/Vmf020p.jpeg',
      'https://i.imgur.com/fcxBdOL.jpeg',
      'https://i.imgur.com/fcxBdOL.jpeg',
      'https://i.imgur.com/8KT5S3e.jpeg',
      'https://i.imgur.com/kgPRUP2.jpeg',
      'https://i.imgur.com/e963hnsb.jpg',
      'https://i.imgur.com/7HfdK7Bb.jpg',
      'https://i.imgur.com/wMBTA8d.jpeg',
      'https://i.imgur.com/dP2RpJ0.jpeg',
      'https://i.imgur.com/bHtcOPnb.jpg',
      'https://i.imgur.com/OljgYlHb.jpg',
      'https://i.imgur.com/TlSLPoGb.jpg'
    ]
    const users = await Promise.all(
      [...Array(100)].map(async (arr, idx) => {
        // const user = await User.findOne({
        //   order: sequelize.random(),
        //   where: { zodiacId: { [Op.not]: user.id } },
        //   raw: true
        // })

        const zodiac = await Zodiac.findOne({
          order: sequelize.random(),
          raw: true
        })

        return {
          username: falso.randUserName(),
          image: userImages[idx],
          firstName: falso.randFirstName(),
          lastName: falso.randLastName(),
          description: falso.randQuote(),
          email: falso.randEmail(),
          passwordDigest: falso.randPassword(),
          phoneNumber: falso.randPhoneNumber(),
          gender: falso.randGender(),
          zodiacId: zodiac.id,
          // zodiacId: zodiac[Math.floor(Math.random() * zodiac.length)].id
          // falso.randNumber({ min: 1, max: 12 }),
          // zodiacId: falso.randNumber({ min: 1, max: 12 }),
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
