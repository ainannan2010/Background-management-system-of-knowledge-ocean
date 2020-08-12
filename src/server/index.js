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

// get请求
// app.get('/id', (req, res) => {
//   res.send({ id: 2345 })
// })

// post 传参
app.post('/login', (req, res) => {
  // const { demo_a } = req.query // query式传参接收方式
  // const { id } = req.params // restful式传参接收方式
  const { userName } = req.body // body式传参接收方式
  if (userName === 'yangwuc') {
    return res.send({ code: 1, success: true, message: 'ok', data: userName })
  }

  return res.send({ code: 0, success: false, message: '用户名&密码不匹配', data: {} })
})

// 开起服务
app.listen(9000, () => {
  console.log('service started successfully')
})
