const http = require("http");
const routes = require("./routes");

const app = http.createServer(routes.handler);

app.listen(3000);
