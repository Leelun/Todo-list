const express = require('express')
const PORT = process.env.PORT || 3000

const exphbs = require('express-handlebars') //載入樣板引擎

const bodyParser = require('body-parser') //載入body-parser為了使用req.body

const methodOverride = require('method-override')  // 載入 method-override

const Todo  = require('./models/todo') //載入Todo model

const routes = require('./routes')  // 引用路由器
require('./config/mongoose')

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))  // 設定每一筆請求都會透過 methodOverride 進行前置處理

app.use(routes)  // 將 request 導入路由器

app.listen(PORT, () => {
  console.log(`express is running on localhost:${PORT}`)
})