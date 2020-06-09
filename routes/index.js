const express = require('express')
const router = express.Router()

var AdminController = require('../api/Controllers/AdminController')
AdminController = new AdminController()

router.get('/', function(request, response) {
  AdminController.index(response)
})

router.get('/empresa', function(request, response) {
  AdminController.createCompany(response)
})


module.exports = router
