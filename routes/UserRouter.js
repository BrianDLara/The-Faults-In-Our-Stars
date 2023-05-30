const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.get('/', controller.GetUsers)

router.post('/login', controller.LoginUser)
router.post('/register', controller.RegisterUser)

router.post(
  '/update',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)
//Add a new review
router.post('/zodiac_id/:zodiac_id/new_user', controller.CreateUser)

// update a review
router.put(
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateUser
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUser
)

router.get('/:id', controller.GetUserById)
module.exports = router
