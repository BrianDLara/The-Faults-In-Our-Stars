const { Zodiac } = require('../models')

const GetAllZodiacs = async (req, res) => {
  try {
    const zodiac = await Zodiac.findAll()
    res.send(zodiac)
  } catch (error) {
    throw error
  }
}

const GetZodiacById = async (req, res) => {
  try {
    const zodiac = await zodiac.findByPk(req.params.id)
    res.send(zodiac)
  } catch (error) {
    throw error
  }
}
module.exports = {
  GetAllZodiacs,
  GetZodiacById
}
