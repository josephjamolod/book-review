import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./connectDB/connect";

export interface CustomError extends Error {
  statusCode?: number;
}

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["https://book-review-platform.vercel.app/"], // Replace with your client deployment URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

import userBook from "./routes/books";
import authUser from "./routes/auth";

app.use("/api/books", userBook);
app.use("/api/auth", authUser);

// app.get("/api/test", async (req: Request, res: Response) => {
//   res.json({ message: "Hello world" });
// });
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test route working!" });
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err instanceof Error ? err.message : " Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    console.log(`Server is listening to port ${PORT}...`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
});
