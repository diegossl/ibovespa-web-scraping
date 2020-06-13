const express = require('express')
const router = express.Router()
const Gateway = require('../api/Gateway')

router.get('/', Gateway.index)
router.get('/empresa/:title', Gateway.createCompany)

module.exports = router
