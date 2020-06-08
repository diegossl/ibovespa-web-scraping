'use strict'

const Scraper = require('../Services/Scraper')

class AdminController {

  async index (response) {
    try {
      const ibovespaData = await Scraper.getInfo()
      response.render('index', { ibovespaData: ibovespaData })
    } catch (error) {
      response.render('error', { message: 'Erro ao coletar dados' })
    }
  }

}

module.exports = AdminController