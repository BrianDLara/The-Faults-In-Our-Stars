const { User } = require('../models')
const middleware = require('../middleware')
const { Op } = require('sequelize')

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

const GetUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    throw error
  }
}

const CreateUser = async (req, res) => {
  try {
    let userBody = { ...req.body }
    const createdUser = await User.create(userBody)
    res.send(createdUser)
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  let userId = parseInt(req.params.id)
  await User.destroy({ where: { id: userId } })
  res.send()
}

module.exports = {
  GetUserById,
  GetUserById,
  CreateUser,
  DeleteUser
}
