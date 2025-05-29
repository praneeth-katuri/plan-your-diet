const jwt = require("jsonwebtoken");
const config = require("../config");
const prisma = require("../db/client");

const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, config.jwt.accessSecret);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
        gender: true,
        height: true,
        weight: true,
        goal: true,
        dietType: true,
        allergies: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verify;
