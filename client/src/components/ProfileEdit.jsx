import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schema/profile.schema";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const ProfileEdit = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        allergies: user.allergies?.join(", ") || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      await api.put("/user/me", formData);
      setUser(formData);
      toast.success("Profile Updated Succesfully");
    } catch (err) {
      console.error("Form submit failed", err?.message);
      reset({
        ...user,
        allergies: user.allergies?.join(", ") || "",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-semibold mb-8 text-center text-green-700">
        Edit Profile
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {["name", "age", "height", "weight"].map((field) => {
          const isHeight = field === "height";
          const isWeight = field === "weight";
          return (
            <div key={field} className="flex flex-col gap-1">
              <label
                htmlFor={field}
                className="ml-2 text-sm font-semibold text-gray-600"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {isHeight ? " (in cm)" : isWeight ? " (in kg)" : ""}
              </label>
              <input
                id={field}
                type="text"
                placeholder={`Enter ${field}`}
                className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register(field)}
              />
              {errors[field] && (
                <p className="text-sm text-red-500 italic tracking-wide">
                  {errors[field].message}
                </p>
              )}
            </div>
          );
        })}

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="gender"
            className="ml-2 text-sm font-semibold text-gray-600"
          >
            Gender
          </label>
          <select
            id="gender"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-500 italic tracking-wide">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Goal */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="goal"
            className="ml-2 text-sm font-semibold text-gray-600"
          >
            Goal
          </label>
          <select
            id="goal"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("goal")}
          >
            <option value="">Select Goal</option>
            <option value="fat-loss">Fat Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
          {errors.goal && (
            <p className="text-sm text-red-500 italic tracking-wide">
              {errors.goal.message}
            </p>
          )}
        </div>

        {/* Diet Type */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="dietType"
            className="ml-2 text-sm font-semibold text-gray-600"
          >
            Diet Type
          </label>
          <select
            id="dietType"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("dietType")}
          >
            <option value="">Select Diet Type</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
          </select>
          {errors.dietType && (
            <p className="text-sm text-red-500 italic tracking-wide">
              {errors.dietType.message}
            </p>
          )}
        </div>

        {/* Allergies (full-width) */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label
            htmlFor="allergies"
            className="ml-2 text-sm font-semibold text-gray-600"
          >
            Allergies (comma-separated)
          </label>
          <input
            id="allergies"
            type="text"
            placeholder="e.g. milk, peanuts"
            className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("allergies")}
          />
          {errors.allergies && (
            <p className="text-sm text-red-500 italic tracking-wide">
              {errors.allergies.message}
            </p>
          )}
        </div>

        {/* Submit (full-width) */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
