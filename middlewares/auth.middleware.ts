import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const clientKey = req.header("x-api-key");
  if (!clientKey || clientKey !== process.env.PRIVATE_API_KEY) {
    return res.status(401).json({ message: "Unauthorized: Invalid API key" });
  }
  next();
};
