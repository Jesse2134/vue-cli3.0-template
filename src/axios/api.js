/**
 * 统一的请求services
 * @params arg [Object] 调用地方传参数进来
 */
import instance from './instance'
import Config from '@/config'

// post
export const _post = arg => {
  return instance.post(`${arg.url}`, arg.params, {
    timeout: arg.timeout || Config.defaultTimeout,
    showLoading: !arg.noShowLoading,
    loadingMessage: arg.loadingMessage,
    responseType: arg.responseType || Config.responseType
  })
}

// delete
export const _delete = arg => {
  return instance.delete(`${arg.url}`, { data: arg.params })
}
// put
export const _put = arg => {
  return instance.put(`${arg.url}`, arg.params)
}

// get
export const _get = arg => {
  return instance.get(`${arg.url}`, { timeout: arg.timeout || Config.defaultTimeout, showLoading: !arg.noShowLoading })
}

// patch
export const _patch = arg => {
  return instance.patch(`${arg.url}`)
}
