const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node",
  password: "S7893421321",
});

module.exports = pool.promise();
