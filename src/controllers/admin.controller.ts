import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types/types";
import { ResponseAdminType } from "../models/admin-model";
import { AdminService } from "../services/admin.service";

export class AdminController {
  // create
  static async create(
    req: Request,
    res: Response<ResponseData<ResponseAdminType>>,
    next: NextFunction
  ) {
    try {
      // get body
      const body = req.body;

      // get service
      const response = await AdminService.create(body);

      // return
      return res.status(200).json({
        success: true,
        message: "success created",
        data: response,
      });
    } catch (error) {
      // error handler
      console.log(error);
      next(error);
    }
  }
}
