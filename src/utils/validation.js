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

module.exports = {
  validateSignUpdata,
};
