const express = require("express");
const authControllers = require("../controllers/auth.controller");
const passport = require("passport");

const router = express.Router();

router.get("/google", authControllers.googleLogin, (req, res) => {
  console.log("/google", req.user);
  res.json(req.user);
});

router.get("/google/callback", authControllers.googleCallback, (req, res) => {
  console.log("callback", req.user);
  res.json(req.user);
});

router.get("/logout", authControllers.logout);

module.exports = router;
