const express = require('express')
const cors = require('cors')
const cookie=require('cookie-parser'); 
const app = express()

/**
 * 接口跨域处理方式
 * 1. webpack-dev-server    前端处理
 * 2. http-proxy-middleware + express   前端处理
 * 3. nginx   中间层处理
 * 4. 后台cors    后台处理
 * 5. jsonp   前后台处理
 */

// 后台处理跨域
app.use(cors({
  origin: true, // 设置了credentials: true，origin就不能设置为true
  credentials: true, // 如果需要浏览器携带cookie信息时，需要设置为true,
  methods: ['GET', 'PUT', 'POST'],
}))

// 设置cookie
app.use(cookie());

app.post('/api/post', (req, res) => res.send('post Hello World!'))

app.get('/api/login', (req, res) => {
  if(req.cookies.user){
      res.send('欢迎在次登录')
  }
  else{
      res.cookie('user',1,{ expires: new Date(Date.now() + 5000), httpOnly: true });
      res.send('欢迎新用户登录')
  }
})


app.listen(3001, () => console.log('Example app listening on port 3001!'))