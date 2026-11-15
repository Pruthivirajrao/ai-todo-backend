import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import authMiddleware from "./middleware/auth.middleware";
const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "Hello " });
});

app.get("/api/auth/profile",authMiddleware,(req,res)=>{
  res.status(200).json({
    success:true,
    message:"authenticated User",
    userId:req.userId
  })
})
app.use("/api/auth", authRoutes);
export default app;
