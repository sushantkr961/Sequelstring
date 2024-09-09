const UserModel = require("../models/User.Model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  // console.log(req.body)
  try {
    const newUser = new UserModel({ username, password, role });
    await newUser.save();
    res.status(201).json({
      message: "User Created",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

/// login
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body)
  try {
    const user = await UserModel.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "sushant1234",
      { expiresIn: "1h" }
    );
    res.json({
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

// upload document
const uploadDocument = (req, res) => {
  res.json({ message: "Document Uploaded Successfully" });
};

// approve document
const approveDocument = (req, res) => {
  res.json({ message: "Document Approved Successfully" });
};

module.exports = { registerUser, loginUser, uploadDocument, approveDocument };
