const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Incoming data:", req.body);

    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields"
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists"
      });
    }
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    // Save user
    const newUser = new userModel({ username, email, password :hashedPassword});
    const savedUser = await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: savedUser
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).send({
      success: false,
      message: "Register API Error",
      error: error.message
    });
  }
};

// Login

const loginController = async(req, res)=>{
    try{
        const {email, password} = req.body
        //fin user
        console.log("Login data:", req.body);
        
        const user = await userModel.findOne({email})

        // validation

        if(!user){
            return res.status(404).send({
                success:false,
                message: 'invalid Email or Password'
            })
        }
       

        //Match
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'invalid Email or Password'
            })
        }

         //token
         const token = await JWT.sign(
            { id: user._id }, 
            process.env.JWT_SECRET,   
            { expiresIn: "1d" }       
          );
          
    res.status(200).send({
        success:true,
        message:'login successfully',
        token,
        user:{
            id: user._id,
            email: user.email,
           username: user.username
        },
       

    })


    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:'login api'
        })
       
    }

}

module.exports = { registerController, loginController };
