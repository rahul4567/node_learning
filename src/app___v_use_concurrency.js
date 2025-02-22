const mongoose = require("mongoose");

// Define Mongoose Schema (with versioning enabled by default)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

async function safeUpdate(userId, update) {
  let updated = false;
  let attempts = 0;
  const maxAttempts = 5; // Avoid infinite loop

  while (!updated && attempts < maxAttempts) {
    try {
      // Fetch latest version of the document
      const user = await User.findById(userId);
      if (!user) {
        console.log("User not found");
        return;
      }

      // Apply updates
      Object.assign(user, update);

      // Save with automatic version control
      await user.save();
      updated = true;
      console.log("Update successful!");
    } catch (error) {
      if (error.name === "VersionError") {
        console.log(`Version conflict detected. Retrying... (${attempts + 1})`);
        attempts++;
      } else {
        console.error("Update failed:", error.message);
        break;
      }
    }
  }

  if (!updated) {
    console.log("Failed to update after multiple attempts.");
  }
}

// Example Usage
async function main() {
  // Insert a test user (run once)
  // await User.create({ name: "John", email: "john@example.com", age: 25 });

  const userId = "65d123abc456def789012345"; // Replace with actual user ID
  await safeUpdate(userId, { age: 30 });
}

main();

/**
 * Simulate concurrency
 *
 *
 

async function simulateConcurrency() {
  // User 1 and User 2 fetch the same document
  const user1 = await User.findOne({ email: "test@example.com" });
  const user2 = await User.findOne({ email: "test@example.com" });

  console.log("User 1 version:", user1.__v); // e.g., 0
  console.log("User 2 version:", user2.__v); // e.g., 0

  // User 1 updates age
  user1.age = 30;
  await user1.save(); //  Successful, __v increments to 1

  // User 2 updates age
  user2.age = 35;
  try {
    await user2.save(); //  Fails because `__v` is outdated
  } catch (error) {
    console.error("Concurrency error:", error.message);
  }
}

simulateConcurrency();
Handling concurrency
user2.set("age", 35);
user2.increment(); // Increments `__v` manually
await user2.save();

 */
