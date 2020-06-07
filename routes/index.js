const express = require('express')
const router = express.Router()

var AdminController = require('../api/Controllers/AdminController')
AdminController = new AdminController()

router.get('/', AdminController.index)

module.exports = router
