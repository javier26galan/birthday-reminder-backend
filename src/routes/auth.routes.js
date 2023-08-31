const authController = require("../controllers/authController");
const passport = require("passport");

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.get("/logout", authController.logout);

module.exports = router;
