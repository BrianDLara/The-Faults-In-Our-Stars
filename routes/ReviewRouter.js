const router = require('express').Router()
const controller = require('../controllers/ReviewController')
const middleware = require('../middleware')

router.get('/', controller.GetAllReviews)
router.get('/zodiac/:zodiac_id', controller.GetReviewByZodiacId)
// // Create a new review
router.post(
  '/new_review/user/:user_id/zodiac_id/:zodiac_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateReview
)

// // update a review
router.put(
  '/:review_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateReview
)

// delete a review
router.delete(
  '/:review_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteReview
)

router.get('/:id', controller.GetReviewById)
module.exports = router
