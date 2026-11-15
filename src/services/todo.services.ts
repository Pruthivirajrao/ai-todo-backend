import { Request, Response } from "express";
import Todo from "../models/Todo";

interface CreateTodo {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "hard";
  category?: string;
  dueDate?: Date;
}

export const createTodo = async (userId: string, inputs: CreateTodo) => {
  const { title, description, priority, category, dueDate } = inputs || {};

  const todo = await Todo.create({
    userId,
    title,
    description,
    priority,
    category,
    dueDate,
  });
  return todo;
};

export const getAllTodos = async(userId:string) =>{
    const todos = await Todo.find({userId})
    return todos
}