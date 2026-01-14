import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import multer from "multer";
import { ResponseMessage } from "../types/types";
import { Prisma } from "../../generated/prisma/client";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response<ResponseMessage>,
  _next: NextFunction
) => {
  // log global (dev)
  console.error(err);

  // ===============================
  // PRISMA ERROR
  // ===============================
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(400).json({
          success: false,
          message: "data sudah ada",
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "data tidak ditemukan",
        });

      default:
        return res.status(500).json({
          success: false,
          message: "internal server error",
        });
    }
  }

  // ===============================
  // MULTER ERROR
  // ===============================
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          success: false,
          message: "file terlalu besar",
        });

      case "LIMIT_FILE_COUNT":
        return res.status(400).json({
          success: false,
          message: "file terlalu banyak",
        });

      case "MISSING_FIELD_NAME":
        return res.status(400).json({
          success: false,
          message: "field name tidak ditemukan",
        });
      case "LIMIT_UNEXPECTED_FILE":
        return res.status(400).json({
          success: false,
          message: "file terlalu banyak",
        });

      default:
        return res.status(500).json({
          success: false,
          message: "internal server error",
        });
    }
  }

  // ===============================
  // CUSTOM FILE TYPE ERROR
  // ===============================
  if (err instanceof Error && err.message === "Invalid file type") {
    return res.status(400).json({
      success: false,
      message: "Tipe file tidak sesuai, hanya PDF yang diizinkan",
    });
  }

  // ===============================
  // ZOD VALIDATION ERROR
  // ===============================
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.issues[0]?.message || "Validation error",
    });
  }

  // ===============================
  // GENERIC ERROR
  // ===============================
  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }

  // ===============================
  // UNKNOWN ERROR
  // ===============================
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
