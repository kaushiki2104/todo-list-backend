const express = require('express')
const { createTodoController, getTodoController,deleteTodoController, updateTodoController } = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router()
// Create todo

router.post('/create',authMiddleware, createTodoController)

//GET TODO
router.get('/getAll/:userId',authMiddleware,getTodoController)

//Delete Todo

router.post('/delete/:id',authMiddleware, deleteTodoController)

//Updated todo
router.patch('/update/:id', authMiddleware, updateTodoController)

module.exports = router;