const http = require("http");

const server = http.createServer((req, res) => {
  console.log("hi..1");
  return res.end();
});

server.listen("3000");
