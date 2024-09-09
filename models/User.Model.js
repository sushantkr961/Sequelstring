const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["Role_A", "Role_B"] },
});

// Hash password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare password
UserSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", UserSchema);
