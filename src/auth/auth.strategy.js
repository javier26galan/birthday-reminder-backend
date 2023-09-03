const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleUser = require("../models/googleUser.model");
const environment = require("../config/environment");

const googleStrategy = new GoogleStrategy(
  {
    clientID: environment.google_client_id,
    clientSecret: environment.google_client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Verifica si el usuario ya existe en la base de datos
      let user = await GoogleUser.findOne({ googleId: profile.id });

      if (!user) {
        // Si el usuario no existe, crea uno nuevo
        user = new GoogleUser({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value, // URL de la foto de perfil de Google
        });

        // Guarda el nuevo usuario en la base de datos
        await user.save();
      }
      console.log("auth.strategy", user);
      console.log("auth.strategy", accessToken);

      // Devuelve el usuario autenticado
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
);

module.exports = { googleStrategy };
