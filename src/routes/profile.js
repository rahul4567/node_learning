const express = require("express");

const { userAuth } = require("../middlewares/auth");
const router = express.Router();

router.get("/profile", userAuth, async (req, res) => {
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

module.exports = router;
