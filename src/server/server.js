const express = require("express");
const environment = require("../config/environment");
const passport = require("passport");
const session = require("express-session");

const app = express();
app.use(express.json());

app.use("/",(req, res)=>{
    res.json({ message: "Welcome to Birthday-app api" });
})

module.exports = app;
