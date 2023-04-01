const express = require('express') // 引用 Express 
const router = express.Router() //引用 Express 路由器

const Todo = require('../../models/todo') // 引用 Todo model

router.get('/', (req, res) => {  // 定義首頁路由
  Todo.find() //取出Todo model的所有資料
    .lean() //將mongoose的資料轉換成js資料
    .sort({ _id: 'asc' })  //利用mongoose的sort方法將資料作升冪 (ascending) 排序」，反之，如果要降冪 (descending) 排序，可以寫 'desc'。
    .then(todos => res.render('index', { todos })) //將收集到的資料放進todos變數裡由index樣板去渲染
    .catch(error => console.error(error))
})


module.exports = router // 匯出路由模組