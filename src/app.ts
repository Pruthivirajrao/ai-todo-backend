import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import authMiddleware from "./middleware/auth.middleware";
import errorMiddleware from "./middleware/error.middleware";
import helmet from "helmet";
const app = express();
app.use(helmet());
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "Hello " });
});

app.get("/api/auth/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "authenticated User",
    userId: req.userId,
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use(errorMiddleware);
export default app;
