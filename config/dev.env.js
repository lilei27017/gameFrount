// 'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.88.105:7011"',
  // BASE_API: '"http://47.104.148.24:8080"',
  // BASE_API: '"http://10.8.240.165:7011"',
  BASE_API: '"http://sevencolours24.f3322.net:1025/"',
  RUNRUN_ON: '"dev"',
})
