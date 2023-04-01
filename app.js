const express = require('express')
const port = 3000
const mongoose = require('mongoose')  //載入Mongoose


const exphbs = require('express-handlebars') //載入樣板引擎

const bodyParser = require('body-parser') //載入body-parser為了使用req.body

const methodOverride = require('method-override')  // 載入 method-override

const Todo  = require('./models/todo') //載入Todo model

const routes = require('./routes')  // 引用路由器

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()

}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //連線到mongoDB的相關設定


const db = mongoose.connection // 取得資料庫連線狀態

db.on('error', () => {
  console.log('mongodb error!')  // 連線異常
})

db.once('open', () => {
  console.log('mongodb connected!')  // 連線成功
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))  // 設定每一筆請求都會透過 methodOverride 進行前置處理

app.use(routes)  // 將 request 導入路由器

app.listen(port, () => {
  console.log(`express is running on localhost:${port}`)
})