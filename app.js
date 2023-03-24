const express = require('express')
const port = 3000
const mongoose = require('mongoose')  //載入Mongoose


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


app.get('/', (req, res) => {
  res.send('hello')
})


app.listen(port, () => {
  console.log(`express is running on localhost:${port}`)
})