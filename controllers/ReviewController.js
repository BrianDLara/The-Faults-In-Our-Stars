const { Review, User } = require('../models')

const GetAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({})
    res.send(reviews)
  } catch (error) {
    throw error
  }
}

const GetReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id)
    res.send(review)
  } catch (error) {
    throw error
  }
}

const GetReviewByZodiacId = async (req, res) => {
  try {
    const { zodiac_id } = req.params
    const reviews = await Review.findAll({ where: { zodiacId: zodiac_id } })
    if (reviews) {
      return res.status(200).json({ reviews })
    }
    return res.status(404).send('Reviews with the specified ID does not exist')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const CreateReview = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let zodiacId = parseInt(req.params.zodiac_id)
    let reviewBody = {
      userId,
      zodiacId,
      ...req.body
    }
    const createdReview = await Review.create(reviewBody)
    res.send(createdReview)
  } catch (error) {
    throw error
  }
}

const UpdateReview = async (req, res) => {
  try {
    let reviewId = parseInt(req.params.review_id)

    let updatedReview = await Review.update(req.body, {
      where: { id: reviewId },
      returning: true
    })
    res.send(updatedReview)
  } catch (error) {
    throw error
  }
}

const DeleteReview = async (req, res) => {
  try {
    let reviewId = parseInt(req.params.review_id)
    await Review.destroy({ where: { id: reviewId } })
    res.send({ message: `Deleted review with an id of ${reviewId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetReviewByZodiacId,
  GetAllReviews,
  GetReviewById,
  CreateReview,
  UpdateReview,
  DeleteReview
}
