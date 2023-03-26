const express = require('express')
const port = 3000
const mongoose = require('mongoose')  //載入Mongoose


const exphbs = require('express-handlebars') //載入樣板引擎
const Todo  = require('./models/todo') //載入Todo model

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


app.get('/', (req, res) => {
  Todo.find() //取出Todo model的所有資料
  .lean() //將mongoose的資料轉換成js資料
  .then(todos => res.render('index', { todos:todos })) //將收集到的資料放進todos變數裡由index樣板去渲染
  .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`express is running on localhost:${port}`)
})