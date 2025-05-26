const prisma = require("../db/client");

exports.updateProfile = async (userId, updates) => {
  const allowed = [
    "name",
    "goal",
    "age",
    "gender",
    "height",
    "weight",
    "dietType",
    "allergies",
  ];

  const data = {};
  for (const key of allowed) {
    if (key in updates) data[key] = updates[key];
  }

  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      goal: true,
      age: true,
      gender: true,
      height: true,
      weight: true,
      dietType: true,
      allergies: true,
    },
  });
};
