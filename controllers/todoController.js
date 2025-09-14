const todoModel = require("../models/todoModel");

// CREATE TODO
const createTodoController = async (req, res) => {
  try {
    const { title, description } = req.body;

    // `createdBy` user ka id authMiddleware se lo
    const createdBy = req.user?.id;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and description",
      });
    }

    if (!createdBy) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID missing",
      });
    }

    // Create new todo
    const todo = new todoModel({ title, description, createdBy });
    const result = await todo.save();

    return res.status(201).json({
      success: true,
      message: "Your task has been created",
      data: result,
    });
  } catch (error) {
    console.error("Create Todo Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in create todo API",
      error: error.message,
    });
  }
};

// GET TODO
const getTodoController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    // find todos
    const todos = await todoModel
    .find({ createdBy: userId })
    .sort({ createdAt: -1 });
      // console.log('todolist data is ', todos)
    return res.status(200).json({
      success: true,
      message: "Your todos",
      data: todos, // always return array (even if empty)
    });
  } catch (error) {
    console.error("Get Todo Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in get todo API",
      error: error.message,
    });
  }
};

// delete api

const deleteTodoController = async(req,res)=>{
    try{
        //find id
        console.log('Delete', req.params);
        const {id} = req.params
        if(!id){
            return res.status(400).send({
                success:false,
                message:"No todo found with hits id"
            })
        }

        const todo = await todoModel.findByIdAndDelete({_id:id})
        if(!todo){
            return res.status(404).send({
                success:false,
                message:"No task found"
            })
        }

        res.status(200).send({
            success:true,
            message:"Your task has been deleted",
            id
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in delete todo api",
            error,
        })
    }
};

// Update todo
const updateTodoController = async(req, res)=>{
    try{
      const {id} = req.params
      if(!id){
        return res.status(400).send({
            success:false,
            message:"please provide todo id",
        })
      }
      const data = req.body
      // update
      const todo = await todoModel.findByIdAndUpdate(id,{$set:data}, {returnOriginal:false})
      res.status(200).send({
        success:true,
        message: "your task has been updated",
        todo
      })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update todo",
            error,
        })
    }
}

module.exports = { createTodoController, getTodoController,   deleteTodoController, updateTodoController };
