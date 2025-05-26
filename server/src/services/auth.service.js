const bcrypt = require("bcryptjs");
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

  return jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

module.exports = {
  register,
  login,
};
