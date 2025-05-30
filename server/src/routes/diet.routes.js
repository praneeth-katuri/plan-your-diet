const express = require("express");
const router = express.Router();
const dietController = require("../controllers/diet.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/generate", authMiddleware, dietController.generatePlan);
router.get("/my-plans", authMiddleware, dietController.getPlans);

module.exports = router;
