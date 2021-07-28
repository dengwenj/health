// 网络请求
// 引入 axios
import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://139.196.94.15:8085/',
  baseURL: '/api',
})

export default request
