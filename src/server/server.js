const express = require("express");
const routes = require("../routes/index.routes");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requestesd-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/bdays", routes.bdaysRoutes);
app.use("/profiles", routes.profilesRoutes);
app.use("/user", routes.userRoutes)

app.use("/", (req, res) => {
  res.json({ message: "Welcome to Birthday-app api" });
});

module.exports = app;
