const express = require('express')
const port = 3000
const mongoose = require('mongoose')  //載入Mongoose


const exphbs = require('express-handlebars') //載入樣板引擎

const bodyParser = require('body-parser') //載入body-parser為了使用req.body

const methodOverride = require('method-override')  // 載入 method-override

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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))  // 設定每一筆請求都會透過 methodOverride 進行前置處理



app.get('/', (req, res) => {
  Todo.find() //取出Todo model的所有資料
  .lean() //將mongoose的資料轉換成js資料
  .sort({ _id: 'asc' }) //利用mongoose的sort方法將資料作升冪 (ascending) 排序」，反之，如果要降冪 (descending) 排序，可以寫 'desc'。
  .then(todos => res.render('index', { todos:todos })) //將收集到的資料放進todos變數裡由index樣板去渲染
  .catch(error => console.log(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {  //CREATE功能,當我收到method為post  路由為/todos的請求 就執行函式
  const name = req.body.name
  return Todo.create({ name })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => { //READ功能
  const id = req.params.id
   Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})


app.get('/todos/:id/edit', (req, res) => { //UPDATE功能1
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
app.put('/todos/:id', (req, res) => {//UPDATE功能2
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
    
})


app.delete('/todos/:id', (req, res) => { //DELETE功能
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})




app.listen(port, () => {
  console.log(`express is running on localhost:${port}`)
})