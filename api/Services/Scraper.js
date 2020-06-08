'use strict'

const Cheerio = require('cheerio')
const Axios = require('axios')

const URL = "https://www.infomoney.com.br/cotacoes/ibovespa/"

class Scraper {

  static async getInfo () {
    let res = await Axios.get(URL)
    let $ = Cheerio.load(res.data)
    
    let update_date = $('.date-update > span').text()
    let points = $('.line-info > .value > p').text()
    let variation = $('.line-info > .percentage > p').text()
    let day_min = $('.line-info > .minimo > p').text()
    let day_max = $('.line-info > .maximo > p').text()

    let data = {
      update_date: update_date,
      points: points,
      variation: variation,
      day_min: day_min,
      day_max: day_max
    }

    return data
  }

}

module.exports = Scraper