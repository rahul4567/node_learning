const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { validateSignUpdata } = require("../utils/validation");

const router = express.Router();

router.post("/signup", async (req, res) => {
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

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //check email id is
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credential");
    }
    const isPasswordValid = await user.validatePassword(password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("Invalid credential");
    } else {
    }
    //crete a jwt token
    const token = await user.getJWT();
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

router.get("/logout", async (req, res) => {
  try {
    // res.cookie("token", null, {
    //   expires: new Date(Date.now()),
    // });
    res.clearCookie("token", {
      expires: new Date(Date.now()),
    });
    res.send("Logout successfully");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
