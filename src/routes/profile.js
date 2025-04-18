const express = require("express");

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
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

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditProfileData(req.body);
    const loggedInUser = req.user;
    console.log(loggedInUser);
    if (!loggedInUser) {
      throw new Error("User not found: Login again");
    }
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.send({
      message: "Profile updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
