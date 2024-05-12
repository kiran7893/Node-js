const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://User1:S1234@cluster0.s1mnznz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);
const uri =
  // Connect to MongoDB Atlas
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: "majority" },
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas");

      // Find or create a user document
      User.findOne().then((user) => {
        if (!user) {
          const newUser = new User({
            name: "Kiran",
            email: "Kiran@test.com",
            cart: {
              items: [],
            },
          });
          newUser.save();
        }
      });

      // Start the server
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas:", err);
    });
