const express = require("express");
const connectDB = require("./connection/db");
const path = require("path");
const {
  registerUser,
  loginUser,
  uploadDocument,
  approveDocument,
} = require("./controllers/userController");
const { tokenAuth, authorizedRoles } = require("./middleware/middleware");
const PORT = 6969;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connection with DB
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/upload", tokenAuth, authorizedRoles(["Role_A"]), uploadDocument);
app.post("/approve", tokenAuth, authorizedRoles(["Role_B"]), approveDocument);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port :${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
