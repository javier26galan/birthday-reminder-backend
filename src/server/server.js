const express = require("express");
const environment = require("../config/environment");
const routes = require("../routes/index.routes");

const app = express();
app.use(express.json());

app.use("/bdays", routes.bdaysRoutes);
app.use("/profiles", routes.profilesRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Welcome to Birthday-app api" });
});

module.exports = app;
