const router = require('express').Router()
const UserRouter = require('./UserRouter')
const ReviewRouter = require('./ReviewRouter')
const ZodiacRouter = require('./ZodiacRouter')

router.use('/users', UserRouter)
router.use('/reviews', ReviewRouter)
router.use('/zodiacs', ZodiacRouter)

module.exports = router
