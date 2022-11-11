const Router = require('express').Router()
const UserRouter = require('../routes/UserRouter')
const ZodiacRouter = require('../routes/ZodiacRouter')
const ReviewRouter = require('../routes/ReviewRouter')

Router.use('/user', UserRouter)
Router.use('/zodiac', ZodiacRouter)
Router.use('/review', ReviewRouter)
