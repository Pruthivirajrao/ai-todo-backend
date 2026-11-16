import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().trim().min(2, "Atleast 2 chars needed"),
  description: z.string().trim().optional(),
  category: z.string().trim().optional(),
  priority: z.enum(["low", "medium", "hard"]).optional(),
  dueDate: z.coerce.date().optional(),
});
export const updateTodoSchema = z
  .object({
    title: z.string().trim().min(2, "Atleast 2 chars needed").optional(),
    description: z.string().trim().optional(),
    category: z.string().trim().optional(),
    priority: z.enum(["low", "medium", "hard"]).optional(),
    dueDate: z.coerce.date().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
