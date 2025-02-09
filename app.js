const express = require("express");

const app = express();

/**
 * It gives the first routing match preference use or post/get
 */
// app.use("/user", (req, res) => {
//   res.send("Namshte Rahul");
// });

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
