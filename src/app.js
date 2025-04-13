const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.get("/foo", (req, res) => {
  console.log(" I come here too");
  res.end("good");
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
