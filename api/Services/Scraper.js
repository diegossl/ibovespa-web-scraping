'use strict'

const Cheerio = require('cheerio')
const Axios = require('axios')

const URL = "https://www.infomoney.com.br/cotacoes/ibovespa/"

class Scraper {

  static async getInfo () {
    var res = await Axios.get(URL)
    var $ = Cheerio.load(res.data)
    var points = $('.line-info > .value > p').text()
    return points
  }

}

module.exports = Scraper