import request from '@/plugin/axios'

export default () => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    // 接口请求
    return request({
      url: '/login',
      method: 'post',
      data
    })
  }
})
