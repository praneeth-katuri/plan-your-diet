const express = require("express");
const router = express.Router();
const dietController = require("../controllers/diet.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/generate", auth, dietController.generatePlan);
router.get("/my-plans", auth, dietController.getPlans);

module.exports = router;
