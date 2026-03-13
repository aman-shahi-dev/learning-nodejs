const express = require("express");

const app = express(); // app is basically a handler function, try doing console.log(app)

app.get("/", (req, res) => {
  return res.send("Welcome to Homepage again");
});

app.get("/dashboard", (req, res) => {
  return res.send(
    `Welcome to Dashboard, ${req.query.name}. Your username is ${req.query.username}`,
  );
});

app.listen(8000, () => {
  console.log("Server Started!");
});
