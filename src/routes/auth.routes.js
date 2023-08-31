const express = require('express');
const authControllers = require("../controllers/auth.controller");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google", authControllers.googleLogin
  )

router.get(
  "/google/callback", authControllers.googleCallback
);

router.get("/logout", authControllers.logout);

module.exports = router;
