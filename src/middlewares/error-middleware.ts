import { NextFunction, Request, Response } from "express";
import { ResponseMessage } from "../types/types";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response<ResponseMessage>,
  _next: NextFunction
) => {
  // Log error global
  console.error(err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errorMessage =
      err.issues.map((issue) => issue.message)[0] || "Validation error";
    return res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }

  // Handle generic errors
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
