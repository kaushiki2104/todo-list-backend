const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection
    const host = db.host
    const port = db.port
    const name = db.name

    console.log(`Connected To MongoDB: ${host},${port}, database: ${name}`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB Error: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
