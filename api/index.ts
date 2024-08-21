import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./connectDB/connect";

interface CustomError extends Error {
  statusCode?: number;
}

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
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
