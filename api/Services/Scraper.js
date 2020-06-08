'use strict'

const Cheerio = require('cheerio')
const Axios = require('axios')

const URL = "https://www.infomoney.com.br/cotacoes/ibovespa/"

class Scraper {

  static async getInfo () {
    var res = await Axios.get(URL)
    var $ = Cheerio.load(res.data)
    var points = $('.line-info > .value > p').text()
    var variation = $('.line-info > .percentage > p').text()
    var day_min = $('.line-info > .minimo > p').text()
    var day_max = $('.line-info > .maximo > p').text()
    var description = $('div.description').text()

    var data = {
      description: description,
      points: points,
      variation: variation,
      day_min: day_min,
      day_max: day_max
    }

    return data
  }

}

module.exports = Scraper