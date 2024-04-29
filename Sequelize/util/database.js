const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "be8dpwp7wf3kv3t24hzv",
  "udj1s3kvwf8wu2di",
  "4OsC1RtQJk4mjLNEwClx",
  {
    dialect: "mysql",
    host: "be8dpwp7wf3kv3t24hzv-mysql.services.clever-cloud.com",
  }
);

module.exports = sequelize;
