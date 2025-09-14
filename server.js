// const express = require('express')
// const morgan   = require('morgan')
// const dotenv = require('dotenv')
// const colors = require('colors')
// const cors = require('cors')
// const connectDB = require('./config/db');

// // env config
// dotenv.config()

// //DB CONNECT
// connectDB()


// const app = express()

// //middleware

// app.use(express.json())
// app.use(morgan('dev'))
// app.use(cors())
// app.use('/', ( req, res)=>{
//   res.status(200).json({
//       success: true,
//       message: "Server is working",
//     });
// })
// //routes
// app.use("/api/v1/todo", require("./routes/todoRoutes"))
// app.use("/api/v1/user", require("./routes/userRouters"));
// app.use("/api/v1/test", require("./routes/testRouters"));

//  // Port

//  const PORT = process.env.PORT || 8000;

//  // listen
//  app.listen(PORT,()=>{
//     console.log(`Node Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan);

//  })




const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoDBAutoIP = require("mongodbautoip");

dotenv.config();

const app = express();

// ===== Setup MongoDB Auto IP =====
const config = {
  projectId: process.env.ATLAS_PROJECT_ID,
  publicKey: process.env.ATLAS_API_PUBLIC,
  privateKey: process.env.ATLAS_API_PRIVATE,
  username: process.env.ATLAS_API_PUBLIC,
  password: process.env.ATLAS_API_PRIVATE,
};

const { checkAndUpdateIP } = mongoDBAutoIP.setup(config);

// ===== Middlewares =====
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// ===== Routes =====

app.use((req, res, next) => {
  console.log("👉 Incoming request:", req.method, req.originalUrl);
  next();
});
app.post("/api/v1/user/login", (req, res) => {
  console.log("🔥 Inline login hit!");
  res.json({ success: true, message: "Inline login works!" });
});

app.use("/api/v1/todo", require("./routes/todoRoutes"));
app.use("/api/v1/user", require("./routes/userRouters"));
app.use("/api/v1/test", require("./routes/testRouters"));
app.use("*", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working",
  });
});
const PORT = process.env.PORT || 8000;

// ===== Start Server AFTER Whitelist Update =====
checkAndUpdateIP()
  .then(async () => {
    await connectDB(); // connect to MongoDB only after IP is whitelisted
    app.listen(PORT, () => {
      console.log(
        `Node Server running on ${process.env.DEV_MODE} mode on port ${PORT}`
          .bgCyan
      );
    });
  })
  .catch((err) => {
    console.error("Failed to update MongoDB Atlas whitelist:", err);
      console.error(err.response ? err.response.data : err.message);
    // Still start server, but DB connection may fail
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}, DB may fail`.bgRed);
    });
  });



