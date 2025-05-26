const userService = require("../services/user.service");

const getProfile = async (req, res) => {
  res.json(req.user);
};

const updateProfile = async (req, res) => {
  try {
    const updated = userService.updateProfile(req.user.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
