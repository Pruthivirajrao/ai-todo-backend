import { Request, Response } from "express";
import { createTodo, getAllTodos } from "../services/todo.services";

export const createTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    const todo = await createTodo(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Task created",
      data: todo,
    });
  } catch (err) {
    console.error("Create todo failed:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const todos = await getAllTodos(userId);
    return res.status(200).json({
      success: true,
      message: "All todos fetched successfully",
      data: todos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
