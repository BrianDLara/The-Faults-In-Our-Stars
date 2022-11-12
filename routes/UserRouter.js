const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.get('/', controller.GetUsers)
router.get('/:id', controller.GetUserById)

//Add a new review
router.post('/zodiac_id/:zodiac_id/new_user', controller.CreateUser)

// update a review
router.put(
  '/:user_id',
  //   middleware.stripToken,
  //   middleware.verifyToken,
  controller.UpdateUser
)
router.delete(
  '/:id',
  //   middleware.stripToken,
  //   middleware.verifyToken,
  controller.DeleteUser
)

module.exports = router
