const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

/**
 * It gives the first routing match preference use or post/get
 */
// app.use("/user", (req, res) => {
//   res.send("Namshte Rahul");
// });

//error handler

app.get("/getUsersData", (req, res) => {
  ///login DB get user data
  //proper way to handle error
  //   try {
  //     throw new Error("newerror");
  //     res.send("send data");
  //   } catch (err) {
  //     res.status(500).send("something went wrong! contact support");
  //   }
  //other way wild card route way handling
  throw new Error("newerror");
  res.send("send data");
});

// Handle Auth Middleware
app.use("/admin", adminAuth);
app.get("/admin/getAllData", (req, res) => {
  //logic to checking if the request is authorize
  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  //logic to checking if the request is authorize
  res.send("Delete a data");
});

app.post("/user/login", (req, res) => {
  res.send("user logged in successfully");
});

//multple route handler
app.get(
  "/user",
  userAuth,
  (req, res, next) => {
    console.log(req.query);
    console.log(req.params);
    // res.send({
    //   firstName: "Rahul",
    //   lastName: "Kumar",
    // });
    console.log(
      "Will it got to next route handle, no it wont as unless next is used"
    );
    next();
  },
  (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.send({
      firstName: "Rahul_2nd handlre",
      lastName: "Kumar",
    });
  }
);
app.get(
  "/test2",
  (req, res, next) => {
    console.log(req.query);
    console.log(req.params);
    console.log("It will send first route response give error");
    res.send({
      firstName: "Rahul",
      lastName: "Kumar",
    });

    next();
  },
  (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.send({
      firstName: "Rahul_2nd handlre",
      lastName: "Kumar",
    });
  }
);
//Multiple route handler, we can write as many routes
app.get(
  "/test3",
  (req, res, next) => {
    console.log("First Route");
    next();
  },
  (req, res, next) => {
    console.log("2nd handler");
    next();
  },
  (req, res) => {
    res.send({
      firstName: "Rahul_3rd handlre",
      lastName: "Kumar",
    });
  }
);

//multiple handler with array syntax

app.get("/test4", [
  (req, res, next) => {
    console.log("It will send first route response give error");
    next();
  },
  (req, res, next) => {
    console.log("2nd handler");
    next();
  },
  (req, res) => {
    console.log(req.query);
    console.log(req.params);
    res.send({
      firstName: "Rahul_3rd handlre",
      lastName: "Kumar",
    });
  },
]);
app.get(
  "/test6",
  [
    (req, res, next) => {
      console.log("first route handler");
      next();
    },
    (req, res, next) => {
      console.log("2nd handler");
      next();
    },
  ],
  [
    (req, res) => {
      console.log(req.query);
      console.log(req.params);
      res.send({
        firstName: "Rahul_3rd handlre",
        lastName: "Kumar",
      });
    },
  ]
);

//multiple router handler
app.get("/multipleRoute", (req, res, next) => {
  console.log("First handler");
  next();
});
app.get("/multipleRoute1", (req, res, next) => {
  res.send("multipleRoute1");
});
app.get("/multipleRoute1", (req, res, next) => {
  console.log("multipleRoute1 2nd handler");
  next();
});

app.get("/multipleRoute", (req, res) => {
  console.log("second handler");
  res.send("2nd handler");
});

//advance routing
//work for ac abc
app.get("/ab?c", (req, res) => {
  res.send("b is optiopnal");
});
//we can also grouped fg is optional
app.get("/e(fg)?c", (req, res) => {
  res.send("fg is optiopnal");
});

//It will abc, abbbc, abbbbb...c
app.get("/ab+c", (req, res) => {
  res.send("matching the pattern");
});
//work for abcd, abahdkjahdkjcd, abqiouoiqueoiue0ue0ue0cd
app.get("/ab*cd", (req, res) => {
  res.send("matching the pattern");
});
//regex
app.get(/k/, (req, res) => {
  res.send("url haning k it will work");
});

app.get(/.*fly$/, (req, res) => {
  res.send("butterfly");
});
//dynamic routes
app.get("/user/:userId", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send({
    firstName: "Rahul",
    lastName: "Kumar",
  });
});

app.post("/user", (req, res) => {
  res.send("Data saved successfully");
});

app.get("/test/2", (req, res) => {});

app.use("/test", (req, res) => {
  res.send("Namshte Rahul");
});

//get user by email
app.get("/user", async (req, res) => {
  try {
    const existingUsers = await User.findOne({ emailId: req.body.emailId });
    if (!existingUsers) {
      return res.status(400).json({ error: "Email not found" });
    }
    res.status(200).json(existingUsers);
  } catch (err) {
    return res.status(400).json({ error: "Email not found" });
  }
});

// feed api - Get/feed get all user data
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(400).json({ error: "Email not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ error: "Email not found" });
  }
});

app.delete("/user", async (req, res) => {
  try {
    const _id = req.body.userId;
    const user = await User.findByIdAndDelete(_id);
    res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({ error: "Something went wrong" });
  }
});

//update the data
app.patch("/user/:userId", async (req, res) => {
  const ALLOWED_UPDATES = [
    "about",
    "gender",
    "photoUrl",
    "firstName",
    "lastName",
    "skills",
    "age",
    "userId",
  ];
  try {
    const _id = req.params?.userId;
    const isUpdatedAllowed = Object.keys(req.body).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed");
    }
    if (req.body.skills?.length > 10) {
      throw new Error("Only 10 skills are allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: _id }, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).json({
      message: "user updated successfully",
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//error handler
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
  res.send("Namshte Rahul");
});

app.listen(7777, () => {
  console.log("Server is succefully listening on port 7777....");
});
