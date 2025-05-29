const prisma = require("../db/client");
const generateDietPlan = require("../utils/openai");

exports.generate = async (user) => {
  const data = await generateDietPlan(user);

  // deleting previous generate plans before generating new plan
  await prisma.plan.deleteMany({
    where: { userId: user.id },
  });

  return await prisma.plan.create({
    data: {
      userId: user.id,
      data,
    },
  });
};

exports.getUserPlans = async (userId) => {
  return prisma.plan.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
