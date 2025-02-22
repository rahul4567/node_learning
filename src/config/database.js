const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namstedev:8j74VfTBLJImEZLK@namshtenode.aaama.mongodb.net/devTinder"
  );
};

module.exports = {
  connectDB,
};
