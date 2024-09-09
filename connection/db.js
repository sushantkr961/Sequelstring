const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mernyoutube:mernyoutube@cluster0.nj5g05u.mongodb.net/testing"
    );
    console.log("Databse Connection Success");
  } catch (error) {
    console.error("Databse Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
