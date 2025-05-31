import { useEffect, useState } from "react";
import api from "@/api/axios";
import Spinner from "@/components/Spinner";
import {
  Flame,
  Drumstick,
  Wheat,
  Egg,
  CalendarDays,
  Utensils,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const DietPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.age || !user?.gender || !user?.weight || !user?.height) {
      setShouldRedirect(true);
    }
  }, [user]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/profile/edit");
      return;
    }

    const fetchPlan = async () => {
      try {
        const res = await api.get("/diet/my-plans");
        setPlan(res.data.data);
      } catch (error) {
        console.error("Failed to fetch weekly plan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [navigate, shouldRedirect]);

  const generateNewPlan = async () => {
    try {
      setGenerating(true);
      const res = await api.post("/diet/generate", {}, { timeout: 30000 });
      setPlan(res.data.data);
    } catch (err) {
      alert("Failed to generate new plan");
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-[98%] md:max-w-[80%] min-h-[50vh] mx-auto mt-10 px-4">
      {loading ? (
        <Spinner />
      ) : !plan?.days?.length ? (
        <div className="max-w-xl mx-auto mt-20 text-center text-gray-600 px-4">
          <p className="text-xl mb-6 font-medium">No weekly diet plan found.</p>
          <button
            onClick={generateNewPlan}
            disabled={generating}
            className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 disabled:opacity-60"
          >
            {generating ? "Generating..." : "Generate New Plan"}
          </button>
        </div>
      ) : (
        <>
          <div className="flex-row text-xs md:text-2xl md:flex justify-between items-center mb-8">
            <h1 className="font-bold flex justify-center md:justify-between items-center gap-3">
              <CalendarDays className="w-12 h-12 text-green-600" />
              <span className="text-base md:text-2xl">
                Your Weekly Diet Plan
              </span>
            </h1>
            <button
              onClick={generateNewPlan}
              disabled={generating}
              className="bg-yellow-500 text-white px-4 py-2 mb-4 rounded hover:bg-yellow-600 disabled:opacity-60"
            >
              {generating ? "Generating..." : "Generate New Plan"}
            </button>
          </div>

          {plan.days.map((dayObj, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 mb-8 border"
            >
              <h2 className="text-2xl font-semibold mb-5 capitalize flex items-center gap-2 text-green-700">
                <CalendarDays className="w-5 h-5" />
                {dayObj.day}
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {dayObj.meals.map((meal, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border rounded-lg p-4 shadow-sm flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-semibold text-lg flex items-center gap-2 capitalize">
                        <Utensils className="w-5 h-5 text-gray-700" />
                        {meal.time} – {meal.name}
                      </div>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Flame className="w-4 h-4 text-red-500" />
                        {meal.calories} kcal
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-gray-700 flex gap-4 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Drumstick className="w-4 h-4 text-blue-500" />
                        {meal.macros.protein}g Protein
                      </span>
                      <span className="flex items-center gap-1">
                        <Wheat className="w-4 h-4 text-yellow-500" />
                        {meal.macros.carbs}g Carbs
                      </span>
                      <span className="flex items-center gap-1">
                        <Egg className="w-4 h-4 text-purple-500" />
                        {meal.macros.fat}g Fat
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DietPlan;
