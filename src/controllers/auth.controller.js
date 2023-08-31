const passport = require("passport");
const GoogleUser = require("../models/googleUser.model");

exports.googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleCallback = 
  passport.authenticate("google", { failureRedirect: "/" })

exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logout" }); // Redirige al usuario a la página de inicio u otra página
  }); // Esta función es proporcionada por Passport para cerrar la sesión
};