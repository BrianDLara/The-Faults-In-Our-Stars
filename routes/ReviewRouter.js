const router = require('express').Router()
const controller = require('../controllers/ReviewController')
const middleware = require('../middleware')

router.get('/', controller.GetAllReviews)
router.get('/:id', controller.GetUserById)

// //Add a new review
// router.post('/new_review', controller.G)

// // update a review
// router.put(
//   '/:review_id'
//   //   middleware.stripToken,
//   //   middleware.verifyToken,
//   //   controller.UpdateUser
// )
// router.delete(
//   '/:review_id'
//   //   middleware.stripToken,
//   //   middleware.verifyToken,
//   //   controller.DeleteUser
// )

module.exports = router
