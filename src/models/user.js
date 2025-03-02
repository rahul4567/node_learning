const mongoose = require("mongoose");
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
    },
    password: {
      type: String,
      require: true,
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
