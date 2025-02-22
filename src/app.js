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
