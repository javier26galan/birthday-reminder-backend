require("dotenv").config();

module.exports = {
  secret: process.env.SECRET,
  google_client_secret: process.env.CLIENT_SECRET,
  google_client_id: process.env.CLIENT_ID,
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI,
  db_test: process.env.TEST_MONGO,
};
