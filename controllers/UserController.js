const { User, Zodiac } = require('../models')
const middleware = require('../middleware')
const { Op } = require('sequelize')

const GetUsers = async (req, res) => {
  try {
    // const users = await User.findAll()

    const users = await User.findAll({
      include: [
        {
          model: Zodiac,
          as: 'user_sign',
          attributes: ['userId', 'name', 'image', 'description']
        }
      ]
    })

    res.send(users)
  } catch (error) {
    throw error
  }
}

// const GetUsers = async (req, res) => {
//   try {
//     // const users = await User.findAll()

//     const users = await User.findAll({
//       include: Zodiac,
//       raw: true,
//       nest: true
//     })

//     res.send(users)
//   } catch (error) {
//     throw error
//   }
// }

const GetUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Zodiac,
          as: 'user_sign',
          attributes: ['userId', 'name', 'image', 'description']
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
      gender
    } = req.body
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
      gender
    })
    res.send(user)
  } catch (error) {
    throw error
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
        email: user.email
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

// const DeleteUser = async (req, res) => {
//   try {
//     let userId = parseInt(req.params.user_id)
//     let deletedUser = await User.destroy(req.body, {
//       where: { id: userId },
//       returning: true
//     })
//     res.send(deletedUser)
//   } catch (error) {
//     throw error
//   }
// }

module.exports = {
  GetUsers,
  GetUserById,
  RegisterUser,
  LoginUser,
  CreateUser,
  UpdateUser,
  DeleteUser
}
