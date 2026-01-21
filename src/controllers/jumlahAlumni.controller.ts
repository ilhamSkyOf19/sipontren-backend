import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types/types";
import {
  ResponseJumlahAlumniType,
  UpdateJumlahAlumniType,
} from "../models/jumlahAlumni";
import { JumlahAlumniService } from "../services/jumlahAlumni.service";

export class JumlahAlumniController {
  // create
  static async create(
    req: Request<{}, {}, Omit<UpdateJumlahAlumniType, "id">>,
    res: Response<ResponseData<ResponseJumlahAlumniType | null>>,
    next: NextFunction,
  ) {
    try {
      // get body
      const body = req.body;

      // get service
      const response = await JumlahAlumniService.setData(body);

      // return
      return res.status(201).json({
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
