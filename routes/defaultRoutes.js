const express = require('express')
const defaultController = require('../controllers/defaultController')

const router = express.Router()

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default'
    next()
})

router.route('/').get(defaultController.index)

module.exports = router