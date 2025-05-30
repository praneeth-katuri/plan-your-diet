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
    const { accessToken, refreshToken, user } = await authService.login(
      req.body
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  try {
    const { accessToken, user } = await authService.getAccessToken(token);
    res.status(200).json({ accessToken, user });
  } catch (error) {
    res.status(401);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error: ", err);
    res.status(500).json({ message: "login failed!" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getAccessToken,
};
