const jwt = require("jsonwebtoken");
const config = require("../config");
const prisma = require("../db/client");

const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    const decoded = jwt.verify(accessToken, config.jwt.accessSecret);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Error Occurred" });
  }
};

module.exports = verify;
