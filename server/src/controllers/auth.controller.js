const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await authService.body(res.body);
    res.status(200).json({ token });
  } catch {
    res.status(401).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  getMe,
};
