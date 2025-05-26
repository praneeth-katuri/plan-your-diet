const prisma = require("../db/client");
const generateDietPlan = require("../utils/openai");

exports.generate = async (user) => {
  const data = await generateDietPlan(user);

  return await prisma.plan.create({
    data: {
      userId: user.id,
      data,
    },
  });
};

exports.getUserPlans = async (userId) => {
  return prisma.plan.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
