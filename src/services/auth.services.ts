import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

const registerUser = async (input: RegisterUser) => {
  const { name, email, password } = input;

  // generate jwt
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  const normalisedEmail = email.trim().toLowerCase();

  //   Check Email is already exists or not
  const existingUser = await User.findOne({ email: normalisedEmail });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // CreateUser
  const user = await User.create({
    name,
    email: normalisedEmail,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, {
    expiresIn: "7d",
  });

  // return safe user data and token
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

export default registerUser;

export const loginUser = async (input: { email: string; password: string }) => {
  const { email, password } = input;

  // Normalise the email
  const normalisedEmail = email.trim().toLowerCase();

  // FInd User
  const user = await User.findOne({ email: normalisedEmail });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  //   Compare entered password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Check jwt secret
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  // Generate JWT
  const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, {
    expiresIn: "7d",
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token
  };
};
