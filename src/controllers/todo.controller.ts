import { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../services/todo.services";
import mongoose from "mongoose";

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

export const getTodoByIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo Id",
      });
    }
    const todo = await getTodoById(id, userId);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo Id",
      });
    }
    const todo = await updateTodo(id, userId, req.body);
    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Todo Not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication Required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo Id",
      });
    }
    const todo = await deleteTodo(id, userId);
    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Todo Not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
