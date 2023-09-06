const BdayItem = require("../models/bday-item.model");
const Profile = require("../models/profile.model");

exports.createbdayItem = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const bdayItemData = req.body;
    const bdayItem = new BdayItem(bdayItemData);
    await bdayItem.save();

    const profile = await Profile.findByIdAndUpdate(
      profileId,
      { $push: { bdaylist: bdayItem._id } },
      { new: true }
    ).populate("bdaylist");

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error adding item to bdaylist" });
  }
};

exports.deletebdayItem = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const bdayItemId = req.params.bdayItemId;

    const deletedBdayItem = await BdayItem.findByIdAndRemove(bdayItemId);

    if (!deletedBdayItem) {
      return res.status(404).json({ error: "BdayItem not found" });
    }

    const profile = await Profile.findByIdAndUpdate(
      profileId,
      { $pull: { bdaylist: bdayItemId } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const updatedProfile = await Profile.findById(profileId).populate(
      "bdaylist"
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: "Error removing item from bdaylist" });
  }
};

exports.modifybdayItem = async (req, res) => {
  try {
    const bdayItem = await BdayItem.findByIdAndUpdate(
      req.params.bdayItemId,
      req.body,
      {
        new: true,
      }
    );
    const profile = await Profile.findById(req.params.profileId).populate(
      "bdaylist"
    );

    if (!bdayItem || !profile) {
      return res.status(404).json({ error: "Profile or BdayItem not found" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating item in bdaylist" });
  }
};
