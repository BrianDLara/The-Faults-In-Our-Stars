const { Review } = require('../models')

const GetAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({})
    res.send(reviews)
  } catch (error) {
    throw error
  }
}

const CreateReview = async (req, res) => {
  try {
    let reviewBody = { ...req.body }
    const createdReview = await User.create(reviewBody)
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
  GetAllReviews,
  CreateReview,
  UpdateReview,
  DeleteReview
}
