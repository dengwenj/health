import request from 'utils/request'

// 查看用户信息
export const getUserInfo = (params) => {
  return request({
    method: 'GET',
    url: '/admin/getUserInfo',
    params,
  })
}

// 获取用户列表
export const getUserList = (params) => {
  return request({
    method: 'GET',
    url: '/admin/listOfUser',
    params,
  })
}

// 获取健康分析列表全部的
export const getHealthAnalysis = (params) => {
  return request({
    method: 'GET',
    url: '/admin/listOfAnalysis',
    params,
  })
}
