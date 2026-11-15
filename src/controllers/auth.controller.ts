import { Request, Response } from "express";
import registerUser, { loginUser } from "../services/auth.services";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.user,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something Went wrong";

    const statusCode = message === "Email already registered" ? 409 : 500;
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
  
export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result.user,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    console.log("Error Message", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
