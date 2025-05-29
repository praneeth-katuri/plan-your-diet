const Together = require("together-ai");
const config = require("../config");

const together = new Together({ apiKey: config.openai.apiKey });

async function generateDietPlan(user) {
  const prompt = `
Create a 7-day vegetarian diet plan for:
- Age: ${user.age}
- Gender: ${user.gender}
- Height: ${user.height} cm
- Weight: ${user.weight} kg
- Goal: ${user.goal}
- Diet Type: ${user.dietType}
- Allergies: ${user.allergies.join(", ") || "none"}

Requirements:
- 3 meals + 1 snack per day
- Total around 2200 calories per day
- Include calories + macros for each meal (protein, carbs, fat)
- Ensure variety across the 7 days
- Use "day1", "day2", ..., "day7" instead of weekday names

Instructions:
- Do not include explanations or comments
- Do not add any formatting or markdown
- Output only valid minified JSON
- JSON structure should be:
{
  "days": [
    {
      "day": "day1",
      "meals": [
        { "name": "Meal name", "time": "breakfast", "calories": 450, "macros": {"protein": 25, "carbs": 40, "fat": 15} }
      ]
    }
  ]
}
Respond in this exact format with all 7 days included.
`;

  const response = await together.chat.completions.create({
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}

module.exports = generateDietPlan;
