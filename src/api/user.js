import request from 'utils/request'
import qs from 'qs'

// 用户登录
export const userLogin = (data) => {
  return request({
    method: 'POST',
    url: '/login',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8',
    },
  })
}

// 用户退出
export const quitLogin = () => {
  return request({
    method: 'POST',
    url: '/user/logout',
  })
}

// 用户注册
export const userRegister = (data) => {
  return request({
    method: 'POST',
    url: '/register',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8',
    },
  })
}
