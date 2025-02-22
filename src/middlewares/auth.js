const adminAuth = (req, res, next) => {
  console.log("Admin auth is called and checked!!!");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.send(401).send("Unauthorized Reques");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Admin auth is called and checked!!!");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    res.send(401).send("Unauthorized Reques");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
