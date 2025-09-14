const express = require('express')
const morgan   = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db');

// env config
dotenv.config()

//DB CONNECT
connectDB()


const app = express()

//middleware

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routes
app.use("/api/v1/todo", require("./routes/todoRoutes"))
app.use("/api/v1/user", require("./routes/userRouters"));
app.use("/api/v1/test", require("./routes/testRouters"));

 // Port

 const PORT = process.env.PORT || 8000;

 // listen
 app.listen(PORT,()=>{
    console.log(`Node Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan);
 })