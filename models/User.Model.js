const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Role_A", "Role_B"], default: "Role_A" },
});

// Hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare password
UserSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", UserSchema);
