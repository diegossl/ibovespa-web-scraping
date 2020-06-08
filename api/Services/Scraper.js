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

    // var ibovespa_high = [];
    // $('table#high > tbody > tr').map((i, el) => {
    //   let data = $(el).text()
    //   ibovespa_high.push({ data })
    // }).get()
    // console.log(ibovespa_high)

    let ibovespaInfo = {
      update_date: update_date,
      points: points,
      variation: variation,
      day_min: day_min,
      day_max: day_max
    }
    return ibovespaInfo
  }
}

module.exports = Scraper