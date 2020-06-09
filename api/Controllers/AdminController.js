'use strict'

const Scraper = require('../Services/Scraper')

class AdminController {

  async index (response) {
    try {
      const ibovespaData = await Scraper.getInfo()
      response.render('index', { ibovespaData: ibovespaData })
    } catch (error) {
      response.render('error', { message: 'Erro ao coletar dados', error: error })
    }
  }

  async createCompany (request, response) {
    try {
      const companyTitle = request.params.title
      const companyData = await Scraper.getCompanyInfo(companyTitle)
      response.render('company', { companyData: companyData })
    } catch (error) {
      response.render('error', { message: 'Erro ao coletar dados', error: error })
    }
  }

}

module.exports = AdminController