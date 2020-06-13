'use strict'

module.exports = {
  get (name) {
    return process.env[`${name}`]
  }
}