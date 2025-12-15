import { NextFunction, Request, Response } from "express";
import { ResponseData, ResponseMessage } from "../types/types";
import {
  CreateFasilitasType,
  ResponseFasilitasType,
  UpdateFasilitasType,
} from "../models/fasilitas-model";
import { FasilitasService } from "../services/fasilitas.service";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";
import { FasilitasValidation } from "../validations/fasilitas-validation";

export class FasilitasController {
  // CREATE
  static async create(
    req: Request<{}, {}, CreateFasilitasType>,
    res: Response<ResponseData<ResponseFasilitasType>>,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const body = validation<CreateFasilitasType>(
        FasilitasValidation.CREATE,
        req.body
      );

      if (!body.success) {
        await FileService.deleteFile(req.file.path);
        return res.status(400).json({
          success: false,
          message: body.message,
        });
      }

      const response = await FasilitasService.create({
        ...body.data,
        images: req.file.filename,
      });

      return res.status(200).json({
        success: true,
        message: "Success created fasilitas",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // READ
  static async read(
    _req: Request,
    res: Response<ResponseData<ResponseFasilitasType[]>>,
    next: NextFunction
  ) {
    try {
      const response = await FasilitasService.read();

      return res.status(200).json({
        success: true,
        message: "Success read fasilitas",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // DETAIL
  static async detail(
    req: Request<{ id: string }>,
    res: Response<ResponseData<ResponseFasilitasType>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const response = await FasilitasService.detail(id);

      return res.status(200).json({
        success: true,
        message: "Success get detail fasilitas",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // UPDATE
  static async update(
    req: Request<{ id: string }, {}, UpdateFasilitasType>,
    res: Response<ResponseData<ResponseFasilitasType>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const body = validation<UpdateFasilitasType>(
        FasilitasValidation.UPDATE,
        req.body
      );

      if (!body.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json({
          success: false,
          message: body.message,
        });
      }

      const response = await FasilitasService.update(id, {
        ...body.data,
        images: req.file?.filename,
      });

      return res.status(200).json({
        success: true,
        message: "Success updated fasilitas",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // DELETE
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseData<ResponseFasilitasType | null>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const response = await FasilitasService.delete(id);

      return res.status(200).json({
        success: true,
        message: "Success deleted fasilitas",
        data: response,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
