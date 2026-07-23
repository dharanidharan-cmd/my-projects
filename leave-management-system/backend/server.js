const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect("mongodb://localhost:27017/leave_management")
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log(err));


// ================= USER MODEL =================

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model("User", userSchema);


// ================= REGISTER API =================

app.post("/register", async (req, res) => {

  console.log(req.body);

  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.send("User Registered Successfully");
  } catch (error) {
    console.log(error);
    res.send("Error while saving user");
  }
});


// ================= LOGIN API =================

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.json({
      message: "Login Successful",
      role: user.role,
      name: user.name,
      email: user.email
    });
  } else {
    res.send("Invalid Email or Password");
  }

});


// ================= LEAVE MODEL =================

const leaveSchema = new mongoose.Schema({
  name: String,
  email: String,
  reason: String,
  fromDate: String,
  toDate: String,
  status: {
    type: String,
    default: "Pending"
  }
});

const Leave = mongoose.model("Leave", leaveSchema);


// ================= APPLY LEAVE API =================

app.post("/apply-leave", async (req, res) => {

  console.log(req.body);

  try {
    const newLeave = new Leave(req.body);
    await newLeave.save();

    res.send("Leave Applied Successfully");
  } catch (error) {
    console.log(error);
    res.send("Error applying leave");
  }

});


app.get("/all-leaves", async (req, res) => {
  const data = await Leave.find();
  res.json(data);
});


// ================= GET ALL LEAVES =================

app.get("/leaves/:email", async (req, res) => {

  const userEmail = req.params.email;

  const data = await Leave.find({ email: userEmail });

  res.json(data);
});


// ================= TEST API =================

app.get("/", (req, res) => {
  res.send("Server + Database Working");
});


// ================= START SERVER =================

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// APPROVE LEAVE
app.put("/approve/:id", async (req, res) => {
  await Leave.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.send("Leave Approved");
});

// REJECT LEAVE
app.put("/reject/:id", async (req, res) => {
  await Leave.findByIdAndUpdate(req.params.id, { status: "Rejected" });
  res.send("Leave Rejected");
});