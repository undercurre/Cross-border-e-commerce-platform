// 汇率获取
import request from '@/plugin/axios'

export function GetRate (query) {
  return request({
    url: '/rate/getRate',
    method: 'get',
    params: query
  })
}
