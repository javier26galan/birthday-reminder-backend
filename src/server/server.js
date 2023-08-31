const express = require("express");
const environment = require("../config/environment");
const passport = require("passport");
const session = require("express-session");
const auth = require("../auth/index")


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

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Autenticación exitosa, redirige a la página deseada
    res.redirect("/"); // Cambia esto a la ruta que quieras
  }
);

app.get("/logout", (req, res) => {
  req.logout(()=>{
      res.json({ message: "Logout" }); // Redirige al usuario a la página de inicio u otra página
  }); // Esta función es proporcionada por Passport para cerrar la sesión
});

app.use("/",(req, res)=>{
    res.json({ message: "Welcome to Birthday-app api" });
})

module.exports = app;
