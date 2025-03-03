const mongoose = require("mongoose");
const validator = require("validator");
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

//const userModel = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
