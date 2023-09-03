const express = require("express");
const isAuthenticated = require("../middlewares/auth.middleware");
const Profile = require("../models/profile.model");
const BdayItem = require("../models/bday-item.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const existingEmail = await Profile.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = new Profile(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating the user" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Profile.findById(req.params.id).populate("bdaylist");
    if (!user) {
      return res.status(404).json({ error: "Profile didn't found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting the Profile" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "Profile didn't found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error Updating the profile" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await Profile.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Profile didn't found" });
    }
    res.status(200).json({ message: "Profile Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the profile" });
  }
});

module.exports = router;
