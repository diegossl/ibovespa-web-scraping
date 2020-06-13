'use strict'

const ScraperService = require('./Services/ScraperService')

module.exports = {

  async index ({}, response) {
    try {
      const ibovespaData = await ScraperService.getInfo()
      response.render('index', { ibovespaData: ibovespaData })
    } catch (error) {
      console.log(error)
      response.render('error', { message: 'Erro ao coletar dados', error: error })
    }
  },

  async createCompany (request, response) {
    try {
      const companyTitle = request.params.title
      const companyData = await ScraperService.getCompanyInfo(companyTitle)
      response.render('company', { companyData: companyData })
    } catch (error) {
      response.render('error', { message: 'Erro ao coletar dados', error: error })
    }
  }

}