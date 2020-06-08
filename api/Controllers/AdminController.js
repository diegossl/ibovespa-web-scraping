'use strict'

const Scraper = require('../Services/Scraper')

class AdminController {

  async index (response) {
    try {
      const ibovespaData = await Scraper.getInfo()
      response.render('index', { ibovespaData: ibovespaData })
    } catch (error) {
      throw new error
    }
  }

}

module.exports = AdminController