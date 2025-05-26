const dietService = require("../services/diet.service");

exports.generatePlan = async (req, res) => {
  try {
    const plan = await dietService.generate(req.user);
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPlans = async (req, res) => {
  const plans = await dietService.getUserPlans(req.user.id);
  res.json(plans);
};
