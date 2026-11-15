import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be atleast of 2 characters"),
  email: z.string().trim().email("Please enter your email"),
  password: z.string().min(8, "Password must be atleast of 8characters"),
});

export const loginSchema = z.object({
  email:z.string().trim().email("Enter a valid email"),
  password:z.string().min(1,"Password is required")
})