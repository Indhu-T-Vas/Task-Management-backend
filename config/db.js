const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.Mongo_URI
      //mongodb+srv://indhutharunkumar:UgFiv3V4sX5eAKKt@cluster0.72hzvdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
