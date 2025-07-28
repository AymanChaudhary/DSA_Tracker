const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authController = require("../controllers/auth");

// @route   POST /api/auth/signup
// @desc    Register a user
router.post(
  "/signup",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  authController.signup
);

// @route   POST /api/auth/signin
// @desc    Authenticate user & get token
router.post(
  "/signin",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.signin
);

module.exports = router;
