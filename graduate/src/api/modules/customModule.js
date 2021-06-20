import request from '@/plugin/axios'

// 查
export function GetParamsForQuery (query) {
  return request({
    url: '/api/ReportMst/GetParamsForQuery',
    method: 'get',
    params: query
  })
}
