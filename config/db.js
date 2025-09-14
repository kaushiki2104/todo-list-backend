const mongoose = require('mongoose');
const colors = require('colors');
let isConnected;
const connectDB = async () => {
 
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }


  // try {
  //     await mongoose.connect(process.env.MONGO_URL_LOCAL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   const db = mongoose.connection
  //   const host = db.host
  //   const port = db.port
  //   const name = db.name

  //   console.log(`Connected To MongoDB: ${host},${port}, database: ${name}`.bgGreen.white);
  // } catch (error) {
  //   console.log(`MongoDB Error: ${error.message}`.bgRed.white);
  //   process.exit(1);
  // }
};

module.exports = connectDB;
