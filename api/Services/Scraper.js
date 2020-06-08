'use strict'

const Cheerio = require('cheerio')
const Axios = require('axios')

const URL = "https://www.infomoney.com.br/cotacoes/ibovespa/"

class Scraper {

  static async getInfo () {
    const res = await Axios.get(URL)
    const $ = Cheerio.load(res.data)
    
    const points = $('.line-info > .value > p').text()
    const variation = $('.line-info > .percentage > p').text()
    const day_min = $('.line-info > .minimo > p').text()
    const day_max = $('.line-info > .maximo > p').text()
    const description = $('div.description').text()

    const data = {
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