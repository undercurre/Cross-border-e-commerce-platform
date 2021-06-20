import Mock from 'mockjs'

const random = Mock.Random

const userInfo = { userName: 'LISI', userId: '20170390441', job: '项目经理', cName: '李四', health: 0, age: 29, workYear: 5, performance: 100, workStatus: '会议中' }

const messages = []
for (let i = 0; i < 500; i++) {
  messages.push({
    message: random.csentence(),
    date: random.date(),
    id: random.natural()
  })
}

const tasks = []
for (let i = 0; i < 500; i++) {
  tasks.push({
    duty: random.csentence(),
    time: random.time(),
    id: random.natural()
  })
}

const warns = []
for (let i = 0; i < 500; i++) {
  warns.push({
    message: random.csentence(),
    datetime: random.datetime(),
    id: random.natural()
  })
}

const logs = []
for (let i = 0; i < 500; i++) {
  logs.push({
    message: random.csentence(),
    datatime: random.datetime(),
    name: random.cname()
  })
}

Mock.mock('/GetMessages', 'get', req => {
  return {
    code: 0,
    msg: '操作成功',
    data: {
      ...messages
    }
  }
})

Mock.mock('/GetUserInfo', 'get', req => {
  return {
    code: 0,
    msg: '操作成功',
    data: {
      ...userInfo
    }
  }
})

Mock.mock('/GetTasks', 'get', req => {
  return {
    code: 0,
    msg: '操作成功',
    data: {
      ...tasks
    }
  }
})

Mock.mock('/GetWarns', 'get', req => {
  return {
    code: 0,
    msg: '操作成功',
    data: {
      ...warns
    }
  }
})

Mock.mock('/GetLogs', 'get', req => {
  return {
    code: 0,
    msg: '操作成功',
    data: {
      ...logs
    }
  }
})
