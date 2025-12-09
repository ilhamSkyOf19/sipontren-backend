import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { ResponseMessage } from "../types/types";

export const zodValidation = <T>(schema: ZodType<T>) => {
  return async (
    req: Request<{}, {}, T>,
    res: Response<ResponseMessage>,
    next: NextFunction
  ) => {
    try {
      // cek body
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Input is required",
        });
      }

      // cek validasi
      const data = schema.parse(req.body);

      // set body
      req.body = data;

      // next
      return next();
    } catch (error) {
      // cek error
      if (error instanceof ZodError) {
        // cek
        console.log(error);

        const message = error.issues.map((error) => error.message)[0];
        return res.status(400).json({
          success: false,
          message: message,
        });
      }

      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  };
};
