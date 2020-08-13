const express = require('express')

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // 解析post的body式传参必写

// 解决跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const successData = { code: 1, success: true, message: 'ok', data: {} }
const failData = { code: 0, success: false, message: 'error', data: {} }

// 登陆
app.post('/login', (req, res) => {
  // const { demo_a } = req.query // query式传参接收方式
  // const { id } = req.params // restful式传参接收方式
  const { userName } = req.body // body式传参接收方式
  if (userName === 'yangwuc') {
    return res.send({ ...successData, data: userName })
  }

  return res.send({ ...failData, message: '用户名&密码不匹配' })
})

const sideList = [
  {
    name: '首页',
    url: '/',
    children: [],
  },
  {
    name: '数据统计',
    url: '/sts',
    children: [],
  },
  {
    name: '信息管理',
    url: '/mmt',
    children: [
      {
        name: '列表展示',
        url: '/index',
        children: [],
      },
      {
        name: '用户统计',
        url: '/user',
        children: [],
      },
    ],
  },
]
// 获取菜单权限
app.get('/menuList', (req, res) => res.send({ ...successData, data: sideList }))

// 开起服务
app.listen(9000, () => {
  console.log('service started successfully')
})
