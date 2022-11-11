const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.get('/', controller.GetUsers)
router.get('/:id', controller.GetUserById)

//Add a new review
router.post('/new_user', controller.GetUserById)

// update a review
router.put(
  '/:user_id'
  //   middleware.stripToken,
  //   middleware.verifyToken,
  //   controller.UpdateUser
)
router.delete(
  '/:user_id'
  //   middleware.stripToken,
  //   middleware.verifyToken,
  //   controller.DeleteUser
)

module.exports = router
