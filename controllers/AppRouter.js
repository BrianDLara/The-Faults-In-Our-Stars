const Router = require('express').Router()
// const UserRouter = require('./')
// const ZodiacRouter = require('./StudentRouter')
// const ReviewsRouter = require('./StudentRouter')

Router.use('/user', StudentRouter)
Router.use('/zodiac', TeacherRouter)
Router.use('/review', HouseRouter)
