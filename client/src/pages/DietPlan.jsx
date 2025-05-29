import { useEffect, useState } from "react";
import api from "@/api/axios";
import Spinner from "@/components/Spinner";

const DietPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const res = await api.get("/diet/my-plans");
      setPlan(res.data.data); // plan stored in .data
    } catch (error) {
      console.error("Failed to fetch weekly plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewPlan = async () => {
    try {
      setGenerating(true);
      const res = await api.post("/diet/generate");
      setPlan(res.data.data); // use same format
    } catch (err) {
      alert("Failed to generate new plan");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  if (loading) return <Spinner />;
  if (!plan?.days?.length)
    return <p className="text-center mt-10">No weekly plan found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Weekly Diet Plan</h1>
        <button
          onClick={generateNewPlan}
          disabled={generating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {generating ? "Generating..." : "Generate New Plan"}
        </button>
      </div>

      {plan.days.map((dayObj, index) => (
        <div key={index} className="bg-white rounded shadow p-5">
          <h2 className="text-2xl font-semibold mb-4 capitalize">
            {dayObj.day}
          </h2>

          <div className="space-y-3">
            {dayObj.meals.map((meal, idx) => (
              <div key={idx} className="p-3 border rounded bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg capitalize">
                    {meal.time} – {meal.name}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {meal.calories} kcal
                  </span>
                </div>

                <p className="text-sm mt-1 text-gray-700">
                  <strong>Protein:</strong> {meal.macros.protein}g &nbsp;|&nbsp;
                  <strong>Carbs:</strong> {meal.macros.carbs}g &nbsp;|&nbsp;
                  <strong>Fat:</strong> {meal.macros.fat}g
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DietPlan;
