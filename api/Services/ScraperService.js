'use strict'

const CacheService = require('./CacheService')
const Cheerio = require('cheerio')
const Axios = require('axios')

const URL = "https://www.infomoney.com.br/cotacoes/ibovespa/"

class ScraperService {

  static async getInfo () {
    var res = await Axios.get(URL)
    var $ = Cheerio.load(res.data)
    var primaryData = this._primaryData($)
    var companiesLinks = []
    var ibovespa_high = []
    var ibovespa_low = []

    $('table#high > tbody > tr').map((i, el) => {
      let secondaryData = this._secondaryData($, el)
      companiesLinks.push({ companyTitle: secondaryData.active, link: secondaryData.link })
      ibovespa_high.push({ 
        active: secondaryData.active,
        last: secondaryData.last,
        day_variation: secondaryData.day_variation,
        min_value: secondaryData.min_value,
        max_value: secondaryData.max_value,
        date: secondaryData.date
       })
    }).get()  

    $('table#low > tbody > tr').map((i, el) => {
      let secondaryData = this._secondaryData($, el)
      companiesLinks.push({ companyTitle: secondaryData.active, link: secondaryData.link })
      ibovespa_low.push({ 
        active: secondaryData.active,
        last: secondaryData.last,
        day_variation: secondaryData.day_variation,
        min_value: secondaryData.min_value,
        max_value: secondaryData.max_value,
        date: secondaryData.date
       })
    }).get()

    await CacheService.set('links', JSON.stringify(companiesLinks))

    return {
      title: primaryData.title,
      update_date: primaryData.update_date,
      points: primaryData.points,
      variation: primaryData.variation,
      day_min: primaryData.day_min,
      day_max: primaryData.day_max,
      ibovespa_high: ibovespa_high,
      ibovespa_low: ibovespa_low
    }
  }

  static async getCompanyInfo (companyTitle) {
    let companiesLinks = JSON.parse((await CacheService.get('links')).value)
    let company = companiesLinks.filter((item) => {
      if (item.companyTitle == companyTitle) {
        return item
      }
    })
    
    let res = await Axios.get(company[0].link)
    let $ = Cheerio.load(res.data)
    let primaryData = this._primaryData($)

    return { 
      title: primaryData.title,
      update_date: primaryData.update_date,
      points: primaryData.points,
      variation: primaryData.variation,
      day_min: primaryData.day_min,
      day_max: primaryData.day_max
    }
  }

  static _primaryData ($) {
    return {
      title: $('.quotes-header-info > .center > h1').text(),
      update_date: $('.date-update > span').text(),
      points: $('.line-info > .value > p').text(),
      variation: $('.line-info > .percentage > p').text(),
      day_min: $('.line-info > .minimo > p').text(),
      day_max: $('.line-info > .maximo > p').text()
    }
  }

  static _secondaryData ($, el) {
    return {
      link: $(el).find($("td:nth-child(1) > a")).attr('href'),
      active: $(el).find($("td:nth-child(1)")).text(),
      last: $(el).find($("td:nth-child(2)")).text(),
      day_variation: $(el).find($("td:nth-child(3)")).text(),
      min_value: $(el).find($("td:nth-child(4)")).text(),
      max_value: $(el).find($("td:nth-child(5)")).text(),
      date: $(el).find($("td:nth-child(6)")).text()
    }
  }
}

module.exports = ScraperService