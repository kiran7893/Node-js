const http = require("http");
const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  res.send("<h1>User 1</h1>");
});

app.use("/", (req, res, next) => {
  res.send("Hello World from Express ..!!");
});

app.listen(3000);
