const router = require('express').Router()
const controller = require('../controllers/ZodiacSignController')
const middleware = require('../middleware')

router.get('/', controller.GetAllZodiacs)
router.get('/:id', controller.GetZodiacById)

module.exports = router
