const http = require("http");

const express = require("express");

const app = express();

app.use("/add-product", (req, res, next) => {
  console.log("in the  middleware");
  res.send("<h1>product page ..!!</h1>");
});

app.use("/", (req, res, next) => {
  console.log("in the another middleware");
  res.send("<h1>Hello from Express ..!!</h1>");
});

app.listen(3000);
