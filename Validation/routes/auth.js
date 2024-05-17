const express = require("express");
const { check, body } = require("express-validator");
const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("please enter valid email..!!"),
    //   .custom((val, { req }) => {
    //    return User.findOne({ email: val }).then((userDoc) => {
    //       if (userDoc) {
    //         return Promise.reject(
    //           "E-Mail exists already, please pick a different one."
    //         );
    //       }
    //     });
    //   }),
    body(
      "password",
      "please enter password with atleast 6 charecter, make sure password does not contaion any symbol"
    )
      .isLength({ min: 6, max: 8 })
      .isAlphanumeric(),
    body("confirmPassword").custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("passwords have to match..!!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
