const validator = require("validator");

const validateSignUpdata = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter name!");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Name length should be 4-50!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid email!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "stills",
  ];
  const keys = Object.keys(req.body);
  keys.forEach((key) => {
    if (!allowedEditFields.includes(key)) {
      throw new Error(`Invalid field: ${key}`);
    }
  });
};

module.exports = {
  validateSignUpdata,
  validateEditProfileData,
};
