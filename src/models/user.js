const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 4,
      maxLength: 255,
    },
    lastName: {
      type: String,
      require: true,
    },
    emailId: {
      lowercase: true,
      type: String,
      require: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      require: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password is not strong Enter a strong password: " + value
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/7790161?v=4",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default description of about",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, "DEV@Tinder$790", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.getDecodedToken = async function (token) {
  const user = this;
  const decoded = await jwt.verify(token, "DEV@Tinder$790");
  if (decoded._id !== user._id.toString()) {
    throw new Error("Invalid token");
  }
  return decoded;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

//const userModel = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
