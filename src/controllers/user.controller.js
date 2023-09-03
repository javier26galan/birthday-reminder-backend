const bcrypt = require("bcrypt");
const Profile = require("../models/profile.model");
const saltRounds = 10;

exports.login = async (req, res) => {
  try {
    const user = await Profile.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "Profile didn't found" });
    }

    let comparePass = await bcrypt.compare(req.body.password, user.password);

    if (!comparePass) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting the Profile" });
  }
};
exports.signup = async (req, res) => {
  try {
    const { profilename, email, password } = req.body;
    const existingEmail = await Profile.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    let hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);

    const user = new Profile({
      profilename: profilename,
      email: email,
      password: hash,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating the user" });
  }
};
