const express = require("express");
const bdayControllers = require("../controllers/bday.controller")

const router = express.Router();

router.post("/new/:profileId", bdayControllers.createbdayItem);

router.delete("/:profileId/:bdayItemId", bdayControllers.deletebdayItem);

router.put("/:profileId/:bdayItemId", bdayControllers.modifybdayItem);

module.exports = router;
