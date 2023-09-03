const express = require("express");
const profileController = require("../controllers/profile.controller")

const router = express.Router();

router.post("/", profileController.createProfile);

router.get("/:id", profileController.getProfile);

router.put("/:id", profileController.modifyProfile);

router.delete("/:id", profileController.deleteProfile);

module.exports = router;
