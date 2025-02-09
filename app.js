const express = require("express");

const app = express();

/**
 * It gives the first routing match preference use or post/get
 */
// app.use("/user", (req, res) => {
//   res.send("Namshte Rahul");
// });

//multple route handler
app.get(
  "/user",
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

app.use("/", (req, res) => {
  res.send("Namshte Rahul");
});

app.listen(7777, () => {
  console.log("Server is succefully listening on port 7777....");
});
