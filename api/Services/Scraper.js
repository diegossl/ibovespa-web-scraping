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

    var ibovespa_high = []
    $('table#high > tbody > tr').map((i, el) => {
      let active = $(el).find($("td:nth-child(1)")).text()
      let last = $(el).find($("td:nth-child(2)")).text()
      let day_variation = $(el).find($("td:nth-child(3)")).text()
      let min_value = $(el).find($("td:nth-child(4)")).text()
      let max_value = $(el).find($("td:nth-child(5)")).text()
      let date = $(el).find($("td:nth-child(6)")).text()
      ibovespa_high.push({ 
        active: active,
        last: last,
        day_variation: day_variation,
        min_value: min_value,
        max_value: max_value,
        date: date
       })
    }).get()  

    var ibovespa_low = []
    $('table#low > tbody > tr').map((i, el) => {
      let active = $(el).find($("td:nth-child(1)")).text()
      let last = $(el).find($("td:nth-child(2)")).text()
      let day_variation = $(el).find($("td:nth-child(3)")).text()
      let min_value = $(el).find($("td:nth-child(4)")).text()
      let max_value = $(el).find($("td:nth-child(5)")).text()
      let date = $(el).find($("td:nth-child(6)")).text()
      ibovespa_low.push({ 
        active: active,
        last: last,
        day_variation: day_variation,
        min_value: min_value,
        max_value: max_value,
        date: date
       })
    }).get()

    let ibovespaInfo = {
      update_date: update_date,
      points: points,
      variation: variation,
      day_min: day_min,
      day_max: day_max,
      ibovespa_high: ibovespa_high
    }
    return ibovespaInfo
  }
}

module.exports = Scraper