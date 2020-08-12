import axios from 'axios'

export const baseOptions = {
  baseURL: 'http://localhost:9000',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20 * 1000, // 超时,时长 ms
  cache: false // 禁用缓存
}

// create an axios instance
export const request = axios.create(baseOptions)

// request interceptor
request.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (config.method.toLocaleUpperCase() !== 'GET') {
      // config.headers['X-CSRF-Token'] = window.SD.__crumb__
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    console.log(`err${error}`) // for debug
    const { response } = error
    const errData = (response && response.data) || {}
    return Promise.reject(errData || error)
  }
)
