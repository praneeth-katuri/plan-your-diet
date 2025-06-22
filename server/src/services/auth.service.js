const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../db/client");
const config = require("../config");

const register = async ({ email, password, name }) => {
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) throw new Error("Email already registered.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  return { id: user.id, email: user.email };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid Credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid Credentials");

  const accessToken = jwt.sign({ id: user.id }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });

  const refreshToken = jwt.sign({ id: user.id }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

  const { password: userPassword, id, ...safeUser } = user;

  return { accessToken, refreshToken, user: safeUser };
};

const getAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("No Token");
  try {
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);

    const { password, id, ...user } = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    const accessToken = jwt.sign({ id: decoded.id }, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn || "15m",
    });

    return { accessToken, user };
  } catch (error) {
    throw new Error("Invalid or Expired refresh token");
  }
};

module.exports = {
  register,
  login,
  getAccessToken,
};
