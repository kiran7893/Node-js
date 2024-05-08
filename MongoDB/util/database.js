const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://myadaramsaikiran:DVo9F6PqA3SFEjNk@cluster0.b40qzdq.mongodb.net/"
  )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found...!!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
