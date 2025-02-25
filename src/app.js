const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const userObj = req.body;
    //check if email already exist
    const existingUser = await User.findOne({ emailId: userObj.emailId });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exist" });
    }
    //creating a new instance of the user modal
    const user = new User(userObj);
    await user.save();
    res.status(201).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    // Handle MongoDB validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    // Handle duplicate key error (unique constraint)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Duplicate email. Try a different one." });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get user by email
app.get("/user", async (req, res) => {
  try {
    const existingUsers = await User.findOne({ emailId: req.body.emailId });
    if (!existingUsers) {
      return res.status(400).json({ error: "Email not found" });
    }
    res.status(200).json(existingUsers);
  } catch (err) {
    return res.status(400).json({ error: "Email not found" });
  }
});

// feed api - Get/feed get all user data
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(400).json({ error: "Email not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ error: "Email not found" });
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established....");
    app.listen(7777, () => {
      console.log("Server is succefully listening on port 7777....");
    });
  })
  .catch((err) => {
    console.error("");
  });
