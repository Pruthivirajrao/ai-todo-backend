import Todo from "../models/Todo";

interface CreateTodo {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "hard";
  category?: string;
  dueDate?: Date;
}
interface UpdateTodo {
  title?: string;
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

export const getAllTodos = async (userId: string) => {
  const todos = await Todo.find({ userId });
  return todos;
};

export const getTodoById = async (todoId: string, userId: string) => {
  const todo = await Todo.findOne({
    _id: todoId,
    userId,
  });
  return todo;
};

export const updateTodo = async (
  todoId: string,
  userId: string,
  input: UpdateTodo,
) => {
  const todo = await Todo.findOneAndUpdate(
    {
      _id: todoId,
      userId,
    },
    {
      $set: input,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return todo;
};

export const deleteTodo = async (todoId: string, userId: string) => {
  const todo = await Todo.findOneAndDelete({
    _id: todoId,
    userId,
  });
  return todo;
};
