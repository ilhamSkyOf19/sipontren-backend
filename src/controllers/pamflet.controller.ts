import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types/types";
import { PamfletService } from "../services/pamflet.service";

export class PamfletController {
  // create
  static async create(
    req: Request,
    res: Response<ResponseData<{ _id: string; img: string }>>,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const response = await PamfletService.create(req.file.filename);

      return res.status(201).json({
        success: true,
        message: "Pamflet created successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // read all
  static async read(
    _req: Request,
    res: Response<ResponseData<{ _id: string; img: string }[]>>,
    next: NextFunction
  ) {
    try {
      const response = await PamfletService.read();

      return res.status(200).json({
        success: true,
        message: "List of pamflets",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // update
  static async update(
    req: Request<{ id: string }>,
    res: Response<ResponseData<{ _id: string; img: string }>>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const response = await PamfletService.update(id, req.file.filename);

      return res.status(200).json({
        success: true,
        message: "Pamflet updated successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // delete
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseData<{ _id: string; img: string }>>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const response = await PamfletService.delete(id);

      return res.status(200).json({
        success: true,
        message: "Pamflet deleted successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
