const { User, Zodiac } = require('../models')
const middleware = require('../middleware')
const { Op } = require('sequelize')

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Zodiac,
          as: 'user_sign',
          attributes: ['name', 'image', 'description']
        }
      ]
    })

    res.send(users)
  } catch (error) {
    throw error
  }
}

const GetUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Zodiac,
          as: 'user_sign',
          attributes: ['name', 'image', 'description']
        }
      ]
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const RegisterUser = async (req, res) => {
  try {
    const {
      username,
      image,
      firstName,
      lastName,
      description,
      email,
      password,
      phoneNumber,
      gender,
      zodiacId
    } = req.body
    console.log(password)
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      username,
      image,
      firstName,
      lastName,
      description,
      email,
      passwordDigest,
      phoneNumber,
      gender,
      zodiacId
    })
    res.send(user)
  } catch (error) {
    res.status(500).send({ err: error })
  }
}

const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        username: user.username,
        firstName: user.firstName
        // email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const UpdateUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let updatedUser = await User.update(req.body, {
      where: { id: userId },
      returning: true
    })
    res.send(updatedUser)
  } catch (error) {
    throw error
  }
}

const CreateUser = async (req, res) => {
  try {
    let zodiacId = parseInt(req.params.zodiac_id)
    let userBody = {
      zodiacId,
      ...req.body
    }
    const createdUser = await User.create(userBody)
    res.send(createdUser)
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.id)
    await User.destroy({ where: { id: userId } })
    res.send({ message: `Deleted user with and id of ${userId}` })
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  console.log(res.locals)
  const { payload } = res.locals
  res.send(payload)
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findByPk(req.params.user_id)
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        oldPassword
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      await user.update({ passwordDigest })
      return res.send({ status: 'Ok', payload: user })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {}
}

module.exports = {
  GetUsers,
  GetUserById,
  RegisterUser,
  LoginUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  CheckSession,
  UpdatePassword
}
