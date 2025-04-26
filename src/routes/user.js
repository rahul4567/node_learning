const express = require("express");

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const connectionRequest = require("../models/connectionRequest");

const router = express.Router();

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName"]);
    res.status(200).json({
      message: "Connection requests fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await connectionRequest
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);
    const data = connections.map((connection) => {
      const isSender =
        connection.fromUserId._id.toString() === loggedInUser._id.toString();
      return {
        _id: connection._id,
        userId: isSender ? connection.toUserId : connection.fromUserId,
        status: connection.status,
        isSender: isSender,
      };
    });
    res.status(200).json({
      message: "Connection requests fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
