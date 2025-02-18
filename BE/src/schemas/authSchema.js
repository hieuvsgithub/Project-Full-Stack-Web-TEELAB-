import * as z from "zod";

const registerSchema = z.object({
  email: z.string().trim().email(),
  username: z
    .string()
    .trim()
    .min(2, { message: "Toi thieu 2 ki tu" })
    .max(50, { message: "Toi da 50 ki tu" }),
  phoneNumber: z.number(),
  password: z.string().trim().min(6, { message: "Toi thieu 6 ki tu" }),
  role: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6, { message: "Toi thieu 6 ki tu" }),
});

export { registerSchema, loginSchema };
