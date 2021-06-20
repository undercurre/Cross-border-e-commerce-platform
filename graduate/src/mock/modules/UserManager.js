import Mock from 'mockjs'

const random = Mock.Random

const users = []

for (let i = 0; i < 500; i++) {
  users.push({
    message: random.csentence(),
    date: random.datetime(),
    id: random.natural(),
    name: random.cname()
  })
}

Mock.mock('/GetTableData', 'get', req => {
  return {
    code: 0,
    msg: '操作成功',
    data: {
      data: [...users],
      size: 10,
      count: 500,
      currentPage: 1
    }
  }
})
