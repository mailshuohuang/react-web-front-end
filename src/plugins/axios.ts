import axios, { AxiosResponse } from 'axios'
import { Modal } from 'antd'

import router from '../routers/router.tsx'
import ResponseCode from '../common/ResponseCode.ts'

const { confirm } = Modal

interface RequestItem {
  id: string
  cancel: () => void
}

export interface AxiosResType extends AxiosResponse {
  code?: number
  message?: string
}

const requestPending: RequestItem[] = []
const CancelToken = axios.CancelToken

export const Axios = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.REACT_APP_URL,
  timeout: 3 * 60 * 1000
})

const removeRepeatedRequest = function (config) {
  let i = 0

  for (const req of requestPending) {
    if (req.id === config.url + '&' + config.method) {
      req.cancel()
      requestPending.splice(i, 1)
    }
    i++
  }
}

const removeAllRequest = function () {
  for (const req of requestPending) {
    console.log(req)
    // req.cancel()
  }
}

const gotoLoginPage = function () {
  router.navigate(`/login`)
}

const setLogout = function () {
  console.log('reset data')
}

/**
 * POST传参序列化(添加请求拦截器)
 * 在发送请求之前做某件事
 */
Axios.interceptors.request.use(config => {
  if (window.sessionStorage.getItem('access_token') && !config.headers.Authorization) {
    config.headers.Authorization = window.sessionStorage.getItem('access_token')
  }
  config.cancelToken = new CancelToken((c) => {
    requestPending.push({ id: config.url + '&' + config.method, cancel: c })
  })

  return config
}, error => {
  return console.error(error)
})

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
  removeRepeatedRequest(res.config)
  // 对响应数据做些事，
  if (res.data && res.data.code === ResponseCode.tokenExpired) {
    setLogout()
    removeAllRequest()
    gotoLoginPage()
    confirm({
      title: '登录失效',
      content: 'Token过期，请重新登录'
    })
    return res.data || {}
  }
  return res.data || {}
}, error => {
  if (error.response) {
    if (error.response.status === ResponseCode.tokenExpired) {
      removeAllRequest()
      gotoLoginPage()
      confirm({
        title: '登录失效',
        content: 'Token过期，请重新登录'
      })
    } else {
      throw new Error('unknown response code')
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data)
  } else {
    // Cancel request
    return console.error(new Error('request canceled'))
  }
})

