import request from '@/plugin/axios'

// 用户信息
export function getUserInfo (query) {
  return request({
    url: '/user/GetUserInfo',
    method: 'get',
    params: query
  })
}

// 通知公告
export function getMessage () {
  return request({
    url: '/message/GetMessages',
    method: 'get'
  })
}

// 日程
export function getTask () {
  return request({
    url: 'GetTasks',
    method: 'get'
  })
}

// 警告
export function getWarn () {
  return request({
    url: 'GetWarns',
    method: 'get'
  })
}

// 日志
export function getLog () {
  return request({
    url: 'GetLogs',
    method: 'get'
  })
}
