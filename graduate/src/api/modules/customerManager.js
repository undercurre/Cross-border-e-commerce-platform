// 查
import request from '@/plugin/axios'

export function GetTableData (query) {
  return request({
    url: '/customers/GetTableData',
    method: 'get',
    params: query
  })
}
// 增
export function SaveCustomer (data) {
  return request.post('/customers/Save', data)
}
// 改
export function UpdateCustomer (data) {
  return request.post('/customers/Update', data)
}
// 删
export function DeleteCustomer (data) {
  return request.post('/customers/Delete', data)
}

// 地图数据获取
export function GetMapData () {
  return request.get('/customers/Map')
}
