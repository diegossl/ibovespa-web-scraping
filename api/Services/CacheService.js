'use strict'

const Env = require('../../config/Env')
const Memjs = require('memjs')

module.exports = {
  async set (key, value) {
    let cache = Memjs.Client.create(Env.get('MEMCACHIER_SERVER'))
    await cache.set(key, value, { expires: 0 })
    cache.close()
  },

  async get (key) {
    let cache = Memjs.Client.create(Env.get('MEMCACHIER_SERVER'))
    let data = await cache.get(key)
    cache.close()
    return data
  }

}