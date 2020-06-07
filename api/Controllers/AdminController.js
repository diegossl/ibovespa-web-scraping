'use strict'

const Scraper = require('../Services/Scraper')

class AdminController {

  async index (request, response) {
    try {
      const points = await Scraper.getInfo()
      response.render('index', { title: points })
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = AdminController