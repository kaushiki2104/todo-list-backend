const mongoose = require('mongoose');
const colors = require('colors');
// let isConnected;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
const connectDB = async () => {
  // third 

 if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URL_LOCAL, {
        // no need for deprecated options
      })
      .then((conn) =>{
        console.log('connected database')
        return  conn});
  }

  cached.conn = await cached.promise;
  return cached.conn;


  // second 
  // if (isConnected) {
  //   console.log("MongoDB already connected");
  //   return;
  // }
  // try {
  //   const conn = await mongoose.connect(process.env.MONGO_URL_LOCAL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   isConnected = conn.connections[0].readyState;
  //   console.log(`MongoDB Connected: ${conn.connection.host}`);
  // } catch (error) {
  //   console.error("MongoDB Error:", error.message);
  //   process.exit(1);
  // }

// first 
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
