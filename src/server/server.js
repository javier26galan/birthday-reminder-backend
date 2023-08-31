const express = require("express");
const environment = require("../config/environment");
const passport = require("passport");
const session = require("express-session");
const auth = require("../auth/index");
const routes = require("../routes/index.routes")


const app = express();
app.use(express.json());

// Configura la estrategia de autenticación de Google
auth.setStrategies();

// Configura sesión y Passport
app.use(session({
  secret: environment.secret,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth",routes.authRoutes)

app.use("/", (req, res)=>{
    res.json({ message: "Welcome to Birthday-app api" });
})

module.exports = app;
