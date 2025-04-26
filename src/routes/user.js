const express = require("express");

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const connectionRequest = require("../models/connectionRequest");

const router = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

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

router.get("/feed", userAuth, async (req, res) => {
  try {
    // user should see all the cards but
    // A. His own card/profile
    // B. His Connections
    // C. Already ignored poeple
    // D. Already send the connection request
    // Example Rahul = [Mark, Donald, MS Dhoni, Virat]
    // R -> Akshay -> Rejected R -> Elon Accepted
    // Elon = [Everyone except Rahul as he is already accepted]
    // Akshya = [Everyone accept Rahul as rejeced]
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit);
    limit = limit > 50 ? 50 : limit;
    const skip = Math.abs((page - 1) * limit);
    //find all the connection requests (Sent + Received)
    const data = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");
    const hideUsersFromFeed = new Set();
    data.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    console.log(hideUsersFromFeed);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: "feed fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
