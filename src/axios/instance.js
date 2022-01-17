import axios from 'axios'
// import { Message, MessageBox } from 'element-ui';
import Config from '@/config'
import Utils from '@/utils'
import {
  Message,
  Loading
} from 'element-ui'
import router from '@/router'
// loading 标记
let needLoadingRequestCount = 0

function showFullScreenLoading (message) { // 启用loading
  if (needLoadingRequestCount === 0) {
    startLoading(message)
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

let loading

function startLoading (message = '加载中...') {
  loading = Loading.service({
    lock: true,
    text: message,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.2)'
  })
}

function endLoading () {
  loading.close()
}

const instance = axios.create({
  baseURL: Config.baseUrl,
  timeout: Config.defaultTimeout
})

// request 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    // 请求前进行拦截, 验证是否已经登录等
    const token = Utils.getCookies('__token__')
    if (token) {
      if (token && config.url.indexOf('/login') === -1) {
        config.headers.common.Authorization = 'Bearer ' + token
      }
    }
    if (config.method === 'get') { // get请求加时间戳，解决 ie11 下不刷新的bug
      const flag = config.url.indexOf('?') !== -1 ? '&' : '?'
      const url = `${config.url}${flag}timestamp=${new Date().getTime()}`
      config.url = encodeURI(url)
    }
    if (config.showLoading) {
      showFullScreenLoading(config.loadingMessage)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应结果统一处理
    if (response.config.showLoading) {
      tryHideFullScreenLoading()
    }
    return {
      status: response.status,
      result: response.data
    }
  },
  error => {
    switch (error.response && error.response.status) {
      case 500:
        Message({
          type: 'error',
          message: '网络错误, 请稍候再试',
          duration: 3000
        })
        break
      case 504:
        Message({
          type: 'error',
          message: error.response ? `请求失败:${error.response.statusText}` : '请求失败',
          duration: 3000
        })
        break
      case 404:
        Message({
          type: 'error',
          message: '请求错误，未找到该请求',
          duration: 3000
        })
        break
      case 401:
        Utils.removeCookies('__token__')
        Message({
          type: 'warning',
          message: '登录已失效, 请重新登录',
          duration: 3000
        })
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break
      default:
        Message({
          type: 'error',
          message: error.response ? `请求失败:${error.response.message}` : '请求失败',
          duration: 3000
        })
    }
    if (error.config.showLoading) {
      tryHideFullScreenLoading()
    }

    return Promise.reject(error)
  }
)

export default instance
