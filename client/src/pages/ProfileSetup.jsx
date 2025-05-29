import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    dietType: "",
    allergies: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await api.get("/user/me");
        const data = res.data;
        if (data.age && data.goal && data.height) {
          navigate("/diet");
        } else {
          setForm({
            age: data.age || "",
            gender: data.gender || "",
            height: data.height || "",
            weight: data.weight || "",
            goal: data.goal || "",
            dietType: data.dietType || "",
            allergies: data.allergies?.join(", ") || "",
          });
        }
        setLoading(false);
      } catch {
        navigate("/login");
      }
    }
    if (isAuthenticated) fetchProfile();
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allergiesArray = form.allergies
      ?.split(",")
      .map((allergy) => allergy.trim())
      .filter(Boolean);

    try {
      await api.put("/user/me", {
        ...form,
        age: parseInt(form.age),
        height: parseInt(form.height),
        weight: parseInt(form.weight),
        allergies: allergiesArray,
      });

      navigate("/diet");
    } catch (error) {
      console.warn(error?.message);
      alert("Failed to save Profile, Please retry again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Complete Your Profile
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {["age", "height", "weight"].map((field) => (
          <input
            key={field}
            name={field}
            type="number"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        ))}

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select
          name="goal"
          value={form.goal}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Goal</option>
          <option value="fat-loss">Fat Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="maintenance">Maintenace</option>
        </select>

        <select
          name="dietType"
          value={form.dietType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Diet Plan</option>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
          <option value="keto">Keto</option>
          <option value="paleo">Paleo</option>
        </select>

        <input
          type="text"
          name="allergies"
          placeholder="Allergies (comma-seperated)"
          value={form.allergies}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
