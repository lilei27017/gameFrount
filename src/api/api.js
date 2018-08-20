import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'

import auth from '../utils/auth.js'
import router from  '../router/index.js'
var config = require('../../config')
let apiHost = config.env.BASE_API

var instance = axios.create({
  baseURL: apiHost,
  timeout: 8000
})

// 添加token头
instance.interceptors.request.use(function (config) {
  config.headers['Token'] = auth.getToken()
  return config
}, function (error) {
  return Promise.reject(error)
})
// 出错提示与未登录跳转
instance.interceptors.response.use(function (response) {
  return response;
}),function (error) {
  if (!error.response) {
    Vue.prototype.$message({
      type: 'error',
      message: ''
    })
    return
  }
  let errInfo = error.response.error
  Vue.prototype.$message({
    type: 'error',
    message: errInfo
  })
  console.log("http err: ", error.response)
  if (error.response.status == 401) {
    router.push({path: '/login'})
    return Promise.reject(error)
  }
}
Vue.use(VueAxios, instance)
