const bcrypt = require("bcrypt");
const Profile = require("../models/profile.model");
const saltRounds = 10;

// exports.login = async (req, res) => {
//   try {
//     const user = await Profile.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(404).json({ error: "Profile didn't found" });
//     }

//     let comparePass = await bcrypt.compare(req.body.password, user.password);

//     if (!comparePass) {
//       return res.status(401).json({ message: "Wrong password" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Error getting the Profile" });
//   }
// };
// exports.login = async (req, res) => {
//   try {

//     const user = await Profile.findOne({ email: googleUser.email });
//     if (!user) {
//       return res.status(404).json({ error: "Profile didn't found" });
//     }

//     let comparePass = await bcrypt.compare(req.body.password, user.password);

//     if (!comparePass) {
//       return res.status(401).json({ message: "Wrong password" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Error getting the Profile" });
//   }
// };
exports.signup = async (req, res) => {
  try {
    function parseJwt(token) {
      return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    }
    const googleUser = parseJwt(req.body.token);
    const { name, email, picture } = googleUser;
    const existingUser = await Profile.findOne({ email: email }).populate("bdaylist");
    if (existingUser) {
      res.status(200).json(existingUser);
    } else {
      const user = new Profile({
        profilename: name,
        email: email,
        image: picture,
      });
      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating the user" });
  }
};
