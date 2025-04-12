const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpdata } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //check email id is
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credential");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("Invalid credential");
    } else {
    }
    //crete a jwt token
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      expiresIn: "7d",
    });
    console.log(token);
    // add the token to cookie
    // send the response
    res.cookie("token", token, {
      expires: new Date(Date.now() + 900000),
    });
    res.send("Login Successfully");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      throw new Error("User not found: Login again");
    }
    res.send(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.post("sendConnectionRequest", userAuth, async (req, res) => {
  console.log("sendConnectionRequest");
  res.send("Connection request sent!!");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const userObj = req.body;
    console.log(userObj);

    //first thing is validation of coming data
    validateSignUpdata(req);

    //encrypt password
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const existingUser = await User.findOne({ emailId: userObj.emailId });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exist" });
    }
    //creating a new instance of the user modal
    const { firstName, lastName, emailId } = userObj;
    const userData = {
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    };
    const user = new User(userData);
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

    res.status(500).json({ error: error.message });
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

app.delete("/user", async (req, res) => {
  try {
    const _id = req.body.userId;
    const user = await User.findByIdAndDelete(_id);
    res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong" });
  }
});

//update the data
app.patch("/user/:userId", async (req, res) => {
  const ALLOWED_UPDATES = [
    "about",
    "gender",
    "photoUrl",
    "firstName",
    "lastName",
    "skills",
    "age",
    "userId",
  ];
  try {
    const _id = req.params?.userId;
    const isUpdatedAllowed = Object.keys(req.body).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed");
    }
    if (req.body.skills?.length > 10) {
      throw new Error("Only 10 skills are allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: _id }, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).json({
      message: "user updated successfully",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
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
