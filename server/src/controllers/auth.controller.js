const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAccessToken = async (req, res) => {
  console.log("🎯 Hit refresh-token route");
  console.log("🍪 Cookie:", req.cookies.refreshToken);
  const token = req.cookies.refreshToken;

  try {
    const accessToken = await authService.getAccessToken(token);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401);
  }
};

const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  getAccessToken,
  getMe,
};
