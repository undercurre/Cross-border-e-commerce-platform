import Mock from 'mockjs'
import { parse } from '@/api/tools'

const userDB = [
  { userName: 'ZHANGSAN', password: '13680404262li', userId: '20170390440', job: '前端开发工程师', cName: '张三', health: 0, age: 24, workYear: 2, performance: 90, workStatus: '会议中', role: 0 },
  { userName: 'LISI', password: '13680404262li', userId: '20170390441', job: '项目经理', cName: '李四', health: 0, age: 29, workYear: 5, performance: 100, workStatus: '会议中', role: 1 }
]

Mock.mock('/login', 'post', req => {
  const user = userDB.find(u => u.userName === parse(req.body).username && u.password === parse(req.body).password)
  if (user) {
    return {
      code: 0,
      msg: '登录成功',
      data: {
        ...user,
        token: '8dfhassad0asdjwoeiruty'
      }
    }
  } else {
    return {
      code: 401,
      msg: '用户名或密码错误',
      data: {}
    }
  }
})
