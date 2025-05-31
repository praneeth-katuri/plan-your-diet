import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string({
      required_error: "Enter your name",
    })
    .min(1, "Name is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  height: z.coerce
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .min(50, "Height must be atleast 50 cm")
    .max(300, "Height must be atmost 300 cm"),
  weight: z.coerce
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .min(30, "Weight must be greater than 30")
    .max(300, "Enter a valid weight"),
  age: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .min(1, "Age must be greater than 0")
    .max(100, "Enter a valid age"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Select a gender" }),
  }),
  goal: z.enum(["fat-loss", "muscle-gain", "maintenance"], {
    errorMap: () => ({ message: "Choose a goal" }),
  }),
  dietType: z.enum(["veg", "non-veg", "keto", "paleo"], {
    errorMap: () => ({ message: "Choose a Diet type" }),
  }),
  allergies: z
    .string()
    .optional()
    .transform((val) =>
      val
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    ),
});

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "At least 8 characters"),
    verifyPassword: z.string(),
  })
  .refine((data) => data.password === data.verifyPassword, {
    path: ["verifyPassword"],
    message: "Passwords do not match",
  });

export { profileSchema, registerSchema };
