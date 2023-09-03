const Profile = require("../models/profile.model");

exports.createProfile = async (req, res) => {
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
};

exports.modifyProfile = async (req, res) => {
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
};

exports.getProfile = async (req, res) => {
  try {
    const user = await Profile.findById(req.params.id).populate("bdaylist");
    if (!user) {
      return res.status(404).json({ error: "Profile didn't found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting the Profile" });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await Profile.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Profile didn't found" });
    }
    res.status(200).json({ message: "Profile Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the profile" });
  }
};