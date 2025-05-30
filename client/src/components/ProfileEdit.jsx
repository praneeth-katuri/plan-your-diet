import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import Spinner from "./Spinner";

const ProfileEdit = () => {
  const { user, setUser } = useAuth();
  const allergies = user.allergies?.join(", ");
  const [form, setForm] = useState({ ...user, allergies });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allergiesArray = form.allergies
      ?.split(",")
      .map((allergy) => allergy.trim())
      .filter(Boolean);

    try {
      setLoading(true);
      await api.put("/user/me", {
        ...form,
        age: parseInt(form.age),
        height: parseInt(form.height),
        weight: parseInt(form.weight),
        allergies: allergiesArray,
      });
      setUser({ ...form, allergies: allergiesArray });
      setLoading(false);
    } catch (error) {
      console.warn(error?.message);
      alert("Failed to save Profile, Please retry again.");
    }
  };
  if (loading) return <Spinner />;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
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
          <option value="maintenance">Maintenance</option>
        </select>

        <select
          name="dietType"
          value={form.dietType}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
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
          placeholder="Allergies (comma-separated)"
          value={form.allergies}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
