import { NextFunction, Request, Response } from "express";
import { ResponseData, ResponseMessage, TokenRequest } from "../types/types";
import { LoginType, PayloadType } from "../models/auth-model";
import { AuthService } from "../services/auth.service";

export class AuthController {
  // cek auth
  static async cekAuth(
    req: TokenRequest,
    res: Response<ResponseData<PayloadType>>,
    next: NextFunction,
  ) {
    try {
      // cek data token
      const { id, name, email, role } = req.data as PayloadType;

      // return response
      return res.status(200).json({
        success: true,
        message: "success cek auth",
        data: { id, name, email, role },
      });
    } catch (error) {
      // error handler
      console.log(error);
      next(error);
    }
  }

  // login
  static async login(
    req: Request<{}, {}, LoginType>,
    res: Response<ResponseData<string>>,
    next: NextFunction,
  ) {
    try {
      // get body
      const body = req.body;

      // get service
      const response = await AuthService.login(body);

      // cek response
      if (!response.success) {
        return res.status(400).json(response);
      }

      const isProduction = process.env.NODE_ENV === "production";

      // Clear cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      });

      // Set cookie
      res.cookie("token", response.data, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 60 * 60 * 24 * 1000, // 1 day
      });

      // return response
      return res.status(200).json({
        success: true,
        message: "success login",
        data: "",
      });
    } catch (error) {
      // error handler
      console.log(error);
      next(error);
    }
  }

  // logout
  static async logout(
    _req: Request,
    res: Response<ResponseMessage>,
    next: NextFunction,
  ) {
    try {
      const isProduction = process.env.NODE_ENV === "production";

      // Clear cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      });

      // return response
      return res.status(200).json({
        success: true,
        message: "success logout",
      });
    } catch (error) {
      // error handler
      console.log(error);
      next(error);
    }
  }
}
