const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("663bd33bf2e8fbe50f403165")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoose
//   .connect(
//     "mongodb+srv://User1:S1234@cluster0.s1mnznz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then((result) => {
//     User.findOne().then((user) => {
//       if (!user) {
//         const user = new User({
//           name: "Kiran",
//           email: "Kiran@test.com",
//           cart: {
//             items: [],
//           },
//         });
//         user.save();
//       }
//     });
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Connection URI with the recommended options
const uri =
  "mongodb+srv://User1:S1234@cluster0.s1mnznz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose
  .connect(uri, {
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
