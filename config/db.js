const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Mongodb Database`.bgMagenta.white);
  } catch (error) {
    console.log(`MONGO Connect Error`.bgRed.white);
  }
};


module.exports = connectDB;