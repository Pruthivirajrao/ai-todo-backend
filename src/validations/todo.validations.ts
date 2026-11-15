import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().trim().min(2, "Atleast 2 chars needed"),
  description: z.string().trim().optional(),
  category:z.string().trim().optional(),
  priority:z.enum(["low","medium","hard"]).optional(),
  dueDate:z.coerce.date().optional(),
});
