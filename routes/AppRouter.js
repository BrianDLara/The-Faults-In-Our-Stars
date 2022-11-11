const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const ReviewRouter = require('./ReviewRouter')
const ZodiacRouter = require('./ZodiacRouter')

Router.use('/users', UserRouter)
Router.use('/reviews', ReviewRouter)
Router.use('/zodiacs', ZodiacRouter)
