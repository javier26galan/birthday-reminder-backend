const passport = require("passport");
const GoogleUser = require("../models/googleUser.model");
const strategy = require("./auth.strategy")

// Serialize user (guardar en la sesión)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (recuperar de la sesión)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await GoogleUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const setStrategies = () => {
  passport.use("google", strategy.googleStrategy);
};

module.exports = {setStrategies: setStrategies}