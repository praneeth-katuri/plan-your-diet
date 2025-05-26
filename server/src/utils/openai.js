const Together = require("together-ai");
const config = require("../config");

const together = new Together({ apiKey: config.openai.apiKey });

async function generateDietPlan(user) {
  const prompt = `
Create a 1-day vegetarian diet plan for:
- Age: ${user.age}
- Gender: ${user.gender}
- Height: ${user.height} cm
- Weight: ${user.weight} kg
- Goal: ${user.goal}
- Diet Type: ${user.dietType}
- Allergies: ${user.allergies.join(", ") || "none"}

Requirements:
- 3 meals + 1 snack
- Total around 2200 calories
- Include calories + macros for each (protein, carbs, fat)


Instructions:
- Do not include explanations or comments
- Do not add any formatting or markdown
- Output only valid minified JSON
- JSON should look like this:
Respond in this format only:
{
  "meals": [
    { "name": "Meal name", "time": "breakfast", "calories": 450, "macros": {"protein": 25, "carbs": 40, "fat": 15} }
  ]
}
`;

  const response = await together.chat.completions.create({
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}

module.exports = generateDietPlan;
