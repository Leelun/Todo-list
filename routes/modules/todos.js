const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => { //CREATE功能
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
router.get('/:id', (req, res) => { //READ功能
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
router.get('/:id/edit', (req, res) => { //UPDATE功能1
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => { //UPDATE功能2
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
router.delete('/:id', (req, res) => { //DELETE功能
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router