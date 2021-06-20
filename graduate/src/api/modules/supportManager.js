// 查
import request from '@/plugin/axios'

export function GetTableData (query) {
  return request({
    url: '/supports/GetTableData',
    method: 'get',
    params: query
  })
}
// 增
export function SaveCustomer (data) {
  return request.post('/supports/Save', data)
}
// 改
export function UpdateCustomer (data) {
  return request.post('/supports/Update', data)
}
// 删
export function DeleteCustomer (data) {
  return request.post('/supports/Delete', data)
}

// 地图数据获取
export function GetMapData () {
  return request.get('/supports/Map')
}
