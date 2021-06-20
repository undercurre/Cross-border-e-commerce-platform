// 查
import request from '@/plugin/axios'

export function GetTableData (query) {
  return request({
    url: '/message/GetTableData',
    method: 'get',
    params: query
  })
}

export function GetDetail (query) {
  return request({
    url: '/message/GetDetail',
    method: 'get',
    params: query
  })
}

// 增
export function SaveCustomer (data) {
  return request.post('/message/Save', data)
}
// 改
export function UpdateCustomer (data) {
  return request.post('/message/Update', data)
}
// 删
export function DeleteCustomer (data) {
  return request.post('/message/Delete', data)
}
