const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      required: true,
      type: String,
      enum: {
        values: ["accepted", "rejected", "ignored", "interested"], // ingnored, intrested, accepted, rejected
        message: `{VALUE} is not a valid status`,
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // check if fromUserID is same as toUserId
  if (connectionRequest.fromUserId.equal(connectionRequest.toUserId)) {
    throw new Error("You cannot send request to yourself");
  }
  next();
});

const connectRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = connectRequestModel;
