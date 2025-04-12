const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  console.log("Admin auth is called and checked!!!");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.send(401).send("Unauthorized Reques");
  } else {
    next();
  }
};

const userAuth = async (req, res, next) => {
  try {
    console.log("Admin auth is called and checked!!!");
    const cookie = req.cookies;
    const { token } = cookie;
    //check if token is present in cookie
    if (!token) {
      throw new Error("Token is not valid!!!!!!!");
    }
    const decodeObj = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodeObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Unauthorized Request");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.send(401).send({ message: err });
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
