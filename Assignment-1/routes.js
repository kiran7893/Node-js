const reqhandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello </title></head>");

    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='user'> <button type='submit'>Click</button> </form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello </title></head>");
    res.write("<body><ul><li>User 1 </li></ul></body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
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

module.exports.handler = reqhandler;
