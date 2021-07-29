import request from 'utils/request'

// 健康分析
export const healthAnalysis = (data) => {
  return request({
    method: 'POST',
    url: '/health/analysis',
    data,
  })
}

// 健康分析列表
export const healthAnalysisList = (params) => {
  return request({
    method: 'GET',
    url: '/health/analysis/list',
    params,
  })
}
