import express, { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { createTodoSchema } from "../validations/todo.validations";
import validate from "../middleware/validate.middleware";
import { createTodoController, getTodoController } from "../controllers/todo.controller";

const router = Router();

router.post("/", authMiddleware, validate(createTodoSchema), createTodoController);
router.get("/",authMiddleware,getTodoController)
export default router;
