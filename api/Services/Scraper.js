'use strict'

const Cheerio = require('cheerio')
const Axios = require('axios')
const fs = require("fs")

const URL = "https://www.infomoney.com.br/cotacoes/ibovespa/"

class Scraper {

  static async getInfo () {
    let res = await Axios.get(URL)
    let $ = Cheerio.load(res.data)

    let mainData = this._mainData($)
    var companiesLinks = []
    var ibovespa_high = []
    var ibovespa_low = []

    $('table#high > tbody > tr').map((i, el) => {
      let link = $(el).find($("td:nth-child(1) > a")).attr('href')
      companiesLinks.push({ link: link })

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

    $('table#low > tbody > tr').map((i, el) => {
      let link = $(el).find($("td:nth-child(1) > a")).attr('href')
      companiesLinks.push({ link: link })

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

    //fs.writeFile('database/companiesLinks.json', JSON.stringify(companiesLinks), function(){})

    let ibovespaInfo = {
      title: mainData.title,
      update_date: mainData.update_date,
      points: mainData.points,
      variation: mainData.variation,
      day_min: mainData.day_min,
      day_max: mainData.day_max,
      ibovespa_high: ibovespa_high,
      ibovespa_low: ibovespa_low
    }
    return ibovespaInfo
  }

  // static async getCompanyInfo () {
  //   const companiesLinks = JSON.parse(fs.readFileSync('database/companiesLinks.json', 'utf-8'))
  //   var companiesData = []
    
  //   companiesLinks.map(async (item) => {
  //     try {
  //       let res = await Axios.get(item.link)
  //       let $ = Cheerio.load(res.data)
  //       let mainData = this._mainData($)
  //       companiesData.push({ 
  //         title: mainData.title,
  //         update_date: mainData.update_date,
  //         points: mainData.points,
  //         variation: mainData.variation,
  //         day_min: mainData.day_min,
  //         day_max: mainData.day_max
  //        })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })
  //   return companiesLinks
  // }

  static _mainData ($) {
    return {
      title: $('.quotes-header-info > .center > h1').text(),
      update_date: $('.date-update > span').text(),
      points: $('.line-info > .value > p').text(),
      variation: $('.line-info > .percentage > p').text(),
      day_min: $('.line-info > .minimo > p').text(),
      day_max: $('.line-info > .maximo > p').text()
    }
  }
}

module.exports = Scraper