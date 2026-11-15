import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category?: string;
  dueDate?: Date;
}

const TodoSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    default: "medium",
  },
  category:{
    type:String,
    trim:true
  },
  dueDate:{
    type:Date
  }
},{timestamps:true})

const Todo = mongoose.model("Todo",TodoSchema)
export default Todo