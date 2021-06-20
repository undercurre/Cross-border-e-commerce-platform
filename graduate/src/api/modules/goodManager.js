// 查
import request from '@/plugin/axios'

export function GetTableData (query) {
  return request({
    url: '/goods/GetTableData',
    method: 'get',
    params: query
  })
}
// 增
export function SaveCustomer (data) {
  return request.post('/goods/Save', data)
}
// 改
export function UpdateCustomer (data) {
  return request.post('/goods/Update', data)
}
// 删
export function DeleteCustomer (data) {
  return request.post('/goods/Delete', data)
}

// 地图数据获取
export function GetMapData () {
  return request.get('/goods/Map')
}
