import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import { User } from "../models/user.model";
import { type UserType, type customRequest } from "../utils/verifyToken";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return next(errorHandler(400, "Please provide all field"));
  }
  if (confirmPassword !== password) {
    return next(errorHandler(400, "Password does not match"));
  }
  const emailAlreadytExist = await User.findOne({ email });
  if (emailAlreadytExist) {
    return next(errorHandler(400, "Email already exist"));
  }
  try {
    const user = await User.create({ username, email, password });
    const userWithoutPass = await User.findById(user).select("-password");

    return res.status(201).json({ message: "User Successfully created" });
  } catch (error) {
    return next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: { email: string; password: string } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "Please provide email and password"));
  }
  const user: any = await User.findOne({ email });

  if (!user) {
    return next(errorHandler(404, "User does not exist"));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(errorHandler(400, "Incorrect Password"));
  }
  try {
    const token = await user.createJWT();
    const userWithoutPassword = await User.findById(user).select("-password");

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to false in development (HTTP)
        sameSite: "none",
        path: "/",
      })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId }: UserType = req.user!;
  console.log(userId);

  if (req.params.id !== userId) {
    return next(errorHandler(401, "Unauthorize User "));
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User does not exist"));
    }
    const userWithoutPassword = await User.findById(user).select("-password");
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const signOutUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId }: UserType = req.user!;
  if (req.params.id !== userId) {
    return next(errorHandler(401, "Unauthorize User"));
  }
  const user = await User.findById(userId);

  try {
    if (!user) {
      return next(errorHandler(404, "User ID does not exist"));
    }
    res
      .clearCookie("access_token")
      .status(200)
      .json({ msg: "user successfully sign out" });
  } catch (error) {
    next(error);
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const updateUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, email }: { username: string | null; email: string | null } =
    req.body;
  const { userId } = req.user!;
  if (req.params.id !== userId) {
    return next(errorHandler(401, "You can only update your own profile"));
  }
  if (username?.trim() === "") {
    return next(errorHandler(400, "empty name is not allowed"));
  }
  if (email?.trim() === "") {
    return next(errorHandler(400, "empty email is not allowed"));
  }
  if (email && !emailRegex.test(email)) {
    return next(errorHandler(400, "Invalid email format"));
  }
  const user: any = await User.findById(req.params.id);
  if (!user) {
    return next(errorHandler(404, "User ID does not exist"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user,
      {
        $set: {
          username: username?.trim(),
          email: email?.trim(),
        },
      },
      { new: true }
    );
    const updatedUserWithoutPassword = await User.findById(updatedUser).select(
      "-password"
    );
    res.status(200).json(updatedUserWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// export const updatedUser = async (
//   req: customRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.send("Hello word");
// };
