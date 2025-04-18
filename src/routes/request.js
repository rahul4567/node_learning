const express = require("express");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const router = express.Router();

const allowedStatus = ["ignored", "interested"];

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const { status, toUserId } = req.params;

    // status validation
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    //check toUserId is not same as logedin user
    // if (fromUserId === toUserId) {
    //   return res
    //     .status(400)
    //     .json({ error: "You cannot send request to yourself" });
    // }

    // check if toUserId is valid
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ error: "User not found!!" });
    }
    //check if existing connection request
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request already exists",
        data: existingRequest,
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const savedRequest = await connectionRequest.save();
    res.status(201).json({
      message: `${req.user.firstName} is ${status} in you`,
      data: savedRequest,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
