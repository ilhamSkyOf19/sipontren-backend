import { NextFunction, Request, Response } from "express";
import { ResponseData, ResponseMessage } from "../types/types";
import {
  CreateAlumniType,
  ResponseAlumniType,
  UpdateAlumniType,
} from "../models/alumni-model";
import { AlumniService } from "../services/alumni.service";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";
import { AlumniValidation } from "../validations/alumni-validation";

export class AlumniController {
  // CREATE
  static async create(
    req: Request<{}, {}, CreateAlumniType>,
    res: Response<ResponseData<ResponseAlumniType>>,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required",
        });
      }

      const body = validation<CreateAlumniType>(
        AlumniValidation.CREATE,
        req.body
      );

      if (!body.success) {
        await FileService.deleteFile(req.file.path);
        return res.status(400).json({ success: false, message: body.message });
      }

      const response = await AlumniService.create(body.data, req.file.filename);

      return res.status(200).json({
        success: true,
        message: "Success created alumni",
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
    res: Response<ResponseData<ResponseAlumniType[]>>,
    next: NextFunction
  ) {
    try {
      const response = await AlumniService.read();

      return res.status(200).json({
        success: true,
        message: "Success read alumni",
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
    res: Response<ResponseData<ResponseAlumniType>>,
    next: NextFunction
  ) {
    try {
      const _id = req.params.id;

      const response = await AlumniService.detail(_id);
      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // UPDATE
  static async update(
    req: Request<{ id: string }, {}, UpdateAlumniType>,
    res: Response<ResponseData<ResponseAlumniType>>,
    next: NextFunction
  ) {
    try {
      const _id = req.params.id;

      const alumni = await AlumniService.detail(_id);

      if (!alumni.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json(alumni);
      }

      const body = validation<UpdateAlumniType>(
        AlumniValidation.UPDATE,
        req.body
      );

      if (!body.success) {
        if (req.file) await FileService.deleteFile(req.file.path);
        return res.status(400).json({ success: false, message: body.message });
      }

      const response = await AlumniService.update(
        _id,
        req.file?.filename ?? "",
        body.data
      );

      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // DELETE
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseMessage>,
    next: NextFunction
  ) {
    try {
      const _id = req.params.id;

      const response = await AlumniService.delete(_id);

      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
