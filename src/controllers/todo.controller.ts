import { Request, Response, NextFunction } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../services/todo.services";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandlers";

export const createTodoController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }
    const todo = await createTodo(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Task created",
      data: todo,
    });
  },
);

export const getTodoController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }
    const todos = await getAllTodos(userId);
    return res.status(200).json({
      success: true,
      message: "All todos fetched successfully",
      data: todos,
    });
  },
);

export const getTodoByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
      throw new ApiError(401, "Authentication Required"); //! here see we are writing many times same ApiError so we made AsyncHandlers for reusable purpose
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid Todo Id"); //! here see we are writing many times same ApiError so we made AsyncHandlers for reusable purpose
    }
    const todo = await getTodoById(id, userId);
    if (!todo) {
      throw new ApiError(401, "Todo Not found"); //! here see we are writing many times same ApiError so we made AsyncHandlers for reusable purpose
    }
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todo,
    });
  },
);

export const updateTodoController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
      throw new ApiError(401, "Authentication Required");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid Todo Id");
    }
    const todo = await updateTodo(id, userId, req.body);
    if (!todo) {
      throw new ApiError(404, "Todo Not found");
    }
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  },
);

export const deleteTodoController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!userId) {
      throw new ApiError(401, "Authentication Required");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid Todo Id");
    }
    const todo = await deleteTodo(id, userId);
    if (!todo) {
      throw new ApiError(404, "Todo Not found");
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  },
);
