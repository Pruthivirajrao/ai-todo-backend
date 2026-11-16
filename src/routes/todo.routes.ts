import express, { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todo.validations";
import validate from "../middleware/validate.middleware";
import {
  createTodoController,
  deleteTodoController,
  getTodoByIdController,
  getTodoController,
  updateTodoController,
} from "../controllers/todo.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createTodoSchema),
  createTodoController,
);
router.get("/", authMiddleware, getTodoController);
router.get("/:id", authMiddleware, getTodoByIdController);
router.patch(
  "/:id",
  authMiddleware,
  validate(updateTodoSchema),
  updateTodoController,
);
router.delete("/:id", authMiddleware, deleteTodoController);

export default router;
