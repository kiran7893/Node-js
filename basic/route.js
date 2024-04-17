const fs = require("fs");

const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello </title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'> <button type='submit'>Click</button> </form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Hello </title></head>");
  res.write("<body><h1>My first page.</h1></body>");
  res.write("</html>");
  res.end();
};

//module.exports=reqHandler

// module.exports = {
//   handler: reqHandler,
//   someText: "some text",
// };

// module.exports.handler = reqHandler;
// module.exports.someText = "random text";

exports.handler = reqHandler;
exports.someText = "random text";
