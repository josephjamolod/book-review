import { NextFunction, Request, Response } from "express";
import { errorHandler } from "./errorHandler";
import jwt from "jsonwebtoken";

export interface UserType {
  userId: string;
  username?: string;
}

export interface customRequest extends Request {
  user?: UserType;
}

export const verifyToken = (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.access_token;
  // console.log("token in middleware:" + token);

  if (!token) {
    return next(errorHandler(401, "Invalid Token"));
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserType;

  try {
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    return next(error);
  }
};

export const checkToken = (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      return res.status(200).json({ msg: "No token" });
    } else {
      return res.status(200).json({ msg: "Token present" });
    }
  } catch (error) {
    return next(error);
  }
};
