const mongoose = require('mongoose')

//schema


 const userSchema = new mongoose.Schema({
     username:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required: true,
     },
    },{timesTamps:true});
  const userModel = mongoose.model('users', userSchema)

  module.exports = userModel;