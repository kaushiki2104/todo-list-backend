const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    category: {
    type: String,
     enum: ["High", "Medium", "Low"],
   default: "Low",
    require:true
  },
   dueDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const todoModel = mongoose.model('Todo', todoSchema); 
module.exports = todoModel;
